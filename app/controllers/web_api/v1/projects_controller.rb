class WebApi::V1::ProjectsController < ::ApplicationController

  before_action :set_project, only: [:show, :update, :reorder, :destroy]
  skip_after_action :verify_policy_scoped, only: [:index]


  def index
    @projects = if params[:filter_can_moderate]
      ProjectPolicy::Scope.new(current_user, Project).moderatable 
    else 
      policy_scope(Project)
    end
      
    if params[:publication_statuses].present?
      @projects = @projects.where(publication_status: params[:publication_statuses])
    else
      @projects = @projects.where(publication_status: 'published')
    end

    @projects = @projects.with_all_areas(params[:areas]) if params[:areas].present?
    @projects = @projects.with_all_topics(params[:topics]) if params[:topics].present?

    @projects = ProjectSortingService.new.sort(@projects)
      .includes(:project_images, :phases)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    render json: @projects, include: ['project_images', 'current_phase', 'avatars']
  end

  def show
    render json: @project, include: ['project_images', 'current_phase', 'avatars']
  end

  def by_slug
    @project = Project.find_by!(slug: params[:slug])
    authorize @project
    show
  end

  def create
    @project = Project.new(permitted_attributes(Project))

    SideFxProjectService.new.before_create(@project, current_user)
    
    authorize @project
    if @project.save
      SideFxProjectService.new.after_create(@project, current_user)
      render json: @project, status: :created
    else
      render json: {errors: @project.errors.details}, status: :unprocessable_entity, include: ['project_images', 'current_phase', 'avatars']
    end
  end

  def update
    params[:project][:area_ids] ||= [] if params[:project].has_key?(:area_ids)
    params[:project][:topic_ids] ||= [] if params[:project].has_key?(:topic_ids)
    params[:project][:default_assignee_id] ||= nil if params[:project].has_key?(:default_assignee_id)

    project_params = permitted_attributes(Project)
    
    @project.assign_attributes project_params
    if project_params.keys.include?('header_bg') && project_params['header_bg'] == nil
      # setting the header image attribute to nil will not remove the header image
      @project.remove_header_bg!
    end
    authorize @project
    SideFxProjectService.new.before_update(@project, current_user)
    if @project.save
      SideFxProjectService.new.after_update(@project, current_user)
      render json: @project, status: :ok
    else
      render json: {errors: @project.errors.details}, status: :unprocessable_entity, include: ['project_images']
    end
  end

  def reorder
    if @project.insert_at(permitted_attributes(@project)[:ordering])
      SideFxProjectService.new.after_update(@project, current_user)
      render json: @project, status: :ok
    else
      render json: {errors: @project.errors.details}, status: :unprocessable_entity, include: ['project_images']
    end
  end

  def destroy
    SideFxProjectService.new.before_destroy(@project, current_user)
    project = @project.destroy
    if project.destroyed?
      SideFxProjectService.new.after_destroy(project, current_user)
      head :ok
    else
      head 500
    end
  end

  private

  def secure_controller?
    false
  end

  def set_project
    @project = Project.find params[:id]
    authorize @project
  end
end
