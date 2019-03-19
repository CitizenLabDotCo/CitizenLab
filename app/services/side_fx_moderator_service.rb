class SideFxModeratorService

  include SideFxHelper

  def after_create moderator, project, current_user
    LogActivityJob.set(wait: 5.seconds).perform_later(
      moderator, 'project_moderation_rights_given', 
      current_user, Time.now.to_i,
      payload: {project_id: project.id}
      )
  end

  def after_destroy moderator, project, current_user
    remove_idea_assignments(moderator, project)
    LogActivityJob.perform_later(
      moderator, 'project_moderation_rights_removed', 
      current_user, Time.now.to_i
      )
  end

  private

  def remove_idea_assignments moderator, project
    moderator.assigned_ideas
      .where(project: project)
      .update_all(assignee_id: nil, updated_at: DateTime.now)
  end

end