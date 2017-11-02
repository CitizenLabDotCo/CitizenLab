class Api::V1::GroupsProjectsController < ApplicationController

  before_action :set_groups_project, only: [:show, :destroy]

  def index
    @groups_projects = policy_scope(GroupsProject)
      .where(project_id: params[:project_id])
      .includes(:group)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    @groups_projects = case params[:sort]
      when "new"
        @groups_projects.order_new
      when "-new"
        @groups_projects.order_new(:asc)
      when nil
        @groups_projects
      else
        raise "Unsupported sort method"
    end

  	render json: @groups_projects, include: ['group']
  end

  def show
    render json: @groups_project, include: ['group'], serializer: Api::V1::GroupsProjectSerializer
  end

  # insert
  def create
    @groups_project = GroupsProject.new(groups_project_params)
    @groups_project.project_id = params[:project_id]
    authorize @groups_project
    if @groups_project.save
      render json: @groups_project.reload, include: ['group'], status: :created
    else
      render json: { errors: @groups_project.errors.details }, status: :unprocessable_entity
    end
  end

  # delete
  def destroy
    groups_project = @groups_project.destroy
    if groups_project.destroyed?
      head :ok
    else
      head 500
    end
  end

  def set_groups_project
    @groups_project = GroupsProject.find params[:id]
    authorize @groups_project
  end

  def groups_project_params
    params.require(:groups_project).permit(
      :group_id
    )
  end

end
