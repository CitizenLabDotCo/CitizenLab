module EmailCampaigns
  class UserPlatformDigestJob < ApplicationJob
    queue_as :default
  
    CAMPAIGN = 'user_platform_digest'
    N_TOP_IDEAS = ENV.fetch("N_USER_PLATFORM_DIGEST_IDEAS", 3).to_i
    N_DISCOVER_PROJECTS = ENV.fetch("N_DISCOVER_PROJECTS", 3).to_i

  
    def perform last_scheduled_at=(Time.now - 7.days).to_i
      last_scheduled_at = Time.at(last_scheduled_at)
      ti_service = TrendingIdeaService.new
      if ti_service.filter_trending(IdeaPolicy::Scope.new(nil, Idea).resolve.where(publication_status: 'published')).count < N_TOP_IDEAS
        # don't send any emails if there are less than N_TOP_IDEAS truly trending ideas
        return
      end
      User.all.each do |user|
        
        top_ideas = IdeaPolicy::Scope.new(user, Idea).resolve
        top_ideas = top_ideas.where(publication_status: 'published').left_outer_joins(:idea_status)
        top_ideas = ti_service.sort_trending(ti_service.filter_trending(top_ideas))
        top_ideas = top_ideas.take N_TOP_IDEAS
        serialized_top_ideas = top_ideas.map do |idea|
          LogToSegmentService.new.serialize "EmailCampaigns::UserPlatformDigestIdeaSerializer", idea
        end

        discover_projects = ProjectPolicy::Scope.new(user, Project).resolve
        discover_projects = discover_projects.where(publication_status: 'published').sort_by(&:created_at).reverse
        discover_projects = discover_projects.take N_DISCOVER_PROJECTS
        serialized_discover_projects = discover_projects.map do |project|
          LogToSegmentService.new.serialize "EmailCampaigns::DiscoverProjectSerializer", project
        end

        event = EmailCampaigns::PeriodicEventsService.new.periodic_event CAMPAIGN, user.id,
          {
            top_ideas: serialized_top_ideas,
            discover_projects: serialized_discover_projects
          }
        
        Analytics.track event
        create_campaign_email_commands user, top_ideas, discover_projects
      end
    end

    def create_campaign_email_commands user, top_ideas, discover_projects
      tracked_content = {'idea_ids': top_ideas.map(&:id), 'project_ids': discover_projects.map(&:id)}
      EmailCampaigns::CampaignEmailCommand.create! campaign: CAMPAIGN, recipient: user, tracked_content: tracked_content
    end
  end
end
