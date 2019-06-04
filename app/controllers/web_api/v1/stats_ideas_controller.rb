class WebApi::V1::StatsIdeasController < WebApi::V1::StatsController

  before_action :render_no_data, only: [
    :ideas_by_time,
    :ideas_by_time_cumulative,
  ]

  def ideas_count
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve
      .where(published_at: @start_at..@end_at)
    ideas = PostsFilteringService.new.apply_common_idea_index_filters ideas, params

    render json: { count: ideas.count }
  end

  def ideas_by_topic
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve

    ideas = apply_project_filter(ideas)
    ideas = apply_group_filter(ideas)
    ideas = apply_feedback_needed_filter(ideas)

    serie = ideas
      .where(published_at: @start_at..@end_at)
      .joins(:ideas_topics)
      .group("ideas_topics.topic_id")
      .order("ideas_topics.topic_id")
      .count

    topics = Topic.where(id: serie.keys).select(:id, :title_multiloc)
    render json: {series: {ideas: serie}, topics: topics.map{|t| [t.id, t.attributes.except('id')]}.to_h}
  end

  def ideas_by_project
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve

    ideas = apply_topic_filter(ideas)
    ideas = apply_group_filter(ideas)
    ideas = apply_feedback_needed_filter(ideas)

    serie = ideas
      .where(published_at: @start_at..@end_at)
      .group(:project_id)
      .order(:project_id)
      .count

    projects = Project.where(id: serie.keys).select(:id, :title_multiloc)
    render json: {series: {ideas: serie}, projects: projects.map{|t| [t.id, t.attributes.except('id')]}.to_h}
  end

  def ideas_by_area
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve

    ideas = apply_project_filter(ideas)
    ideas = apply_group_filter(ideas)
    ideas = apply_topic_filter(ideas)
    ideas = apply_feedback_needed_filter(ideas)

    serie = ideas
      .where(published_at: @start_at..@end_at)
      .joins(:areas_ideas)
      .group("areas_ideas.area_id")
      .order("areas_ideas.area_id")
      .count
    areas = Area.where(id: serie.keys).select(:id, :title_multiloc)
    render json: {series: {ideas: serie}, areas: areas.map{|a| [a.id, a.attributes.except('id')]}.to_h}
  end

  def ideas_by_time
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve

    ideas = apply_project_filter(ideas)
    ideas = apply_group_filter(ideas)
    ideas = apply_topic_filter(ideas)
    ideas = apply_feedback_needed_filter(ideas)

    serie = @@stats_service.group_by_time(
      ideas,
      'published_at',
      @start_at,
      @end_at,
      params[:interval]
    )
    render json: {series: {ideas: serie}}
  end

  def ideas_by_time_cumulative
    ideas = StatIdeaPolicy::Scope.new(current_user, Idea.published).resolve

    ideas = apply_project_filter(ideas)
    ideas = apply_group_filter(ideas)
    ideas = apply_topic_filter(ideas)
    ideas = apply_feedback_needed_filter(ideas)

    serie = @@stats_service.group_by_time_cumulative(
      ideas,
      'published_at',
      @start_at,
      @end_at,
      params[:interval]
    )
    render json: {series: {ideas: serie}}
  end


  private

  def apply_group_filter ideas
    if params[:group]
      group = Group.find(params[:group])
      ideas.joins(:author).where(author: group.members)
    else
      ideas
    end
  end

  def apply_topic_filter ideas
    if params[:topic]
      ideas.with_some_topics([params[:topic]])
    else
      ideas
    end
  end

  def apply_project_filter ideas
    if params[:project]
      ideas.where(project_id: params[:project])
    else
      ideas
    end
  end

  def apply_feedback_needed_filter ideas
    if params[:feedback_needed].present?
      ideas.feedback_needed
    else
      ideas
    end
  end

  def render_no_data
    if @no_data
      render json: {series: {ideas: {}}}
    end
  end

  def do_authorize
    authorize :stat_idea
  end
end