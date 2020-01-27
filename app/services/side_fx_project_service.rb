class SideFxProjectService

  include SideFxHelper

  def initialize sfx_pc=SideFxParticipationContextService.new
    @sfx_pc = sfx_pc
  end

  def before_create project, user
    project.description_multiloc = TextImageService.new.swap_data_images(project, :description_multiloc)
    @sfx_pc.before_create project, user if project.is_participation_context?
    set_default_assignee project, user
  end

  def after_create project, user
    LogActivityJob.perform_later(project, 'created', user, project.created_at.to_i)
    @sfx_pc.after_create project, user if project.is_participation_context?
  end

  def before_update project, user
    project.description_multiloc = TextImageService.new.swap_data_images(project, :description_multiloc)
    @sfx_pc.before_update project, user if project.is_participation_context?
  end

  def after_update project, user
    LogActivityJob.perform_later(project, 'changed', user, project.updated_at.to_i)
    @sfx_pc.after_update project, user if project.is_participation_context?
  end

  def before_destroy project, user
    @sfx_pc.before_destroy project, user if project.is_participation_context?
    SmartGroupsService.new.filter_by_rule_value(Group.all, project.id).destroy_all
  end

  def after_destroy frozen_project, user
    remove_moderators frozen_project.id
    serialized_project = clean_time_attributes(frozen_project.attributes)
    LogActivityJob.perform_later(
      encode_frozen_resource(frozen_project), 'deleted',
      user, Time.now.to_i, 
      payload: {project: serialized_project}
    )
    @sfx_pc.after_destroy frozen_project, user if frozen_project.is_participation_context?
  end


  private

  def remove_moderators project_id
    User.project_moderator(project_id).all.each do |moderator|
      moderator.delete_role 'project_moderator', project_id: project_id
      moderator.save!
    end
  end

  def set_default_assignee project, current_user
    project.default_assignee ||= if current_user&.super_admin?
      User.active.admin.order(:created_at).reject(&:super_admin?).first
    else
      current_user
    end
  end

end
