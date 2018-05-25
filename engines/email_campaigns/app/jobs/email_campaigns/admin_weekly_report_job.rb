module EmailCampaigns
  class AdminWeeklyReportJob < ApplicationJob
    queue_as :default

    CAMPAIGN = 'admin_weekly_report'
    N_TOP_IDEAS = ENV.fetch("N_ADMIN_WEEKLY_REPORT_IDEAS", 12).to_i

  
    def perform last_scheduled_at=(Time.now - 7.days).to_i
      last_scheduled_at = Time.at(last_scheduled_at)
      User.admin.each do |admin|
        days_interval = ((Time.now - last_scheduled_at) / 1.day).days

        statistics = admin_report_statistics days_interval
        if no_increase_in_stats statistics
          return
        end

        top_project_ideas = admin_report_top_project_ideas days_interval
        has_new_ideas = (top_project_ideas.size > 0)

        event = LogToSegmentService.new.tracking_message(
          "Periodic email for #{CAMPAIGN.gsub '_', ' '}", 
          user_id: admin.id,
          payload: {
              statistics: statistics,
              has_new_ideas: has_new_ideas,
              top_project_ideas: top_project_ideas
            }
          )
        
        Analytics.track(event)
        create_campaign_email_commands admin, top_project_ideas
      end
    end

    def admin_report_top_project_ideas days_interval
      since = Time.now - days_interval

      top_ideas = Idea.where(publication_status: 'published').all
      top_ideas = top_ideas.select{|idea| (activity_count(idea, since=since) > 0) || (idea.published_at > since)}
      top_ideas = top_ideas.sort_by{|idea| activity_score(idea, since=since)}.reverse.take N_TOP_IDEAS
      top_ideas = top_ideas.sort_by{|idea| activity_count(idea, since=since)}.reverse

      top_project_ideas = {}
      top_ideas.each do |idea|
        top_project_ideas[idea.project_id] ||= []
        top_project_ideas[idea.project_id] += [idea]
      end

      project_order = top_project_ideas.keys.sort_by do |project_id|
        top_project_ideas[project_id].map{|idea| activity_count(idea, since=since)}.inject(0){|x,y| x+y}
      end.reverse

      # normally, the projects will be ordered by recentness of their most recent idea
      serialized_top_project_ideas = project_order.map do |project_id|
        ideas = top_project_ideas[project_id]
        project_serializer = "EmailCampaigns::DiscoverProjectSerializer".constantize
        serialized_project = ActiveModelSerializers::SerializableResource.new(Project.find(project_id), {
          serializer: project_serializer,
          adapter: :json
         }).serializable_hash

        {
          project: serialized_project,
          top_ideas: ideas.map{ |idea|
            to_weekly_report_idea_hash(idea, since=since)
          } 
        }
      end

      serialized_top_project_ideas
    end

    def admin_report_statistics days_interval
      {
        activities: {
          new_ideas: increase_hash(Idea.all.map(&:published_at).compact, days_interval),
          new_comments: increase_hash(Comment.all.map(&:created_at).compact, days_interval),
          new_votes: increase_hash(Vote.all.map(&:created_at).compact, days_interval),
          total_ideas: Idea.count,
          total_users: User.count
        },
        users: {
          new_visitors: increase_hash([], days_interval),
          new_users: increase_hash(User.all.map(&:registration_completed_at).compact, days_interval),
          active_users: increase_hash([], days_interval)
        } 
      }
    end

    def create_campaign_email_commands user, top_project_ideas
      # Also store projects?
      idea_ids = []
      top_project_ideas.each do |tpi|
        idea_ids += tpi[:top_ideas].map{|idea_h| idea_h[:id]}
      end
      idea_ids.uniq!
      EmailCampaigns::CampaignEmailCommand.create! campaign: CAMPAIGN, recipient: user, tracked_content: {'idea_ids': idea_ids}
    end

    def activity_score idea, since
      recent_activity = 1 + activity_count(idea, since=since)
      if idea.published_at
        (recent_activity**2) / (Time.now.to_i - idea.published_at.to_i)
      else
        0.0
      end
    end

    def activity_count idea, since
      idea_recent_votes(idea, since=since).select{|v| v.mode == 'up'}.select{|v| v.user_id != idea.author_id}.size + idea_recent_comments(idea, since=since).size
    end

    def idea_recent_votes idea, since
    	idea.votes.select{|v| v.created_at > since}
    end

    def idea_recent_comments idea, since
    	idea.comments.select{|c| c.created_at > since}
    end

    def to_weekly_report_idea_hash idea, since
    	{
    		id: idea.id,
    		title_multiloc: idea.title_multiloc,
    		url: FrontendService.new.model_to_url(idea),
    		published_at: idea.published_at,
    		author_name: idea.author_name,
    		upvotes_count: idea.upvotes_count,
    		upvotes_increment: idea_recent_votes(idea, since).select{|v| v.mode == 'up'}.count,
    		downvotes_count: idea.downvotes_count,
    		downvotes_increment: idea_recent_votes(idea, since).select{|v| v.mode == 'down'}.count,
    		comments_count: idea.comments_count,
    		comments_increment: idea_recent_comments(idea, since).count
    	}
    end

    def increase_hash timestamps, days_interval
    	last_2n_ago = timestamps.select{|ts| ts > (Time.now - (days_interval * 2))}
    	last_n_ago = last_2n_ago.select{|ts| ts > (Time.now - days_interval)}
    	{
    		increase: last_n_ago.size,
    		past_increase: (last_2n_ago.size - last_n_ago.size)
    	}
    end

    def no_increase_in_stats stats
      ((stats.dig(:activities,:new_ideas,:increase) == 0) && 
        (stats.dig(:activities,:new_ideas,:increase) == 0) && 
        (stats.dig(:activities,:new_comments,:increase) == 0) && 
        (stats.dig(:users,:new_visitors,:increase) == 0) && 
        (stats.dig(:users,:new_users,:increase) == 0) && 
        (stats.dig(:users,:active_users,:increase) == 0))
    end
  end
end
