class WebApi::V1::AdminPublicationsController < ::ApplicationController
  before_action :set_admin_publication, only: [:reorder, :show]

  def index
    @publications = policy_scope(AdminPublication).includes(:publication, :children)

    @publications = @publications.where(publication_type: ProjectFolders::Folder.name)
      .or(@publications.where(publication: ProjectsFilteringService.new.apply_common_index_filters(
        Pundit.policy_scope(current_user, Project),
        params.except(:folder, :publication_statuses))))

    @publications = @publications.where(publication_status: params[:publication_statuses]) if params[:publication_statuses].present?

    if params.key? :folder
      parent_scope = if params[:folder].present?
        AdminPublication.where(publication_id: params[:folder], publication_type: ProjectFolders::Folder.name)
      else # top-level projects and folders
        nil
      end
      @publications = @publications.where(parent_id: parent_scope)
    end

    # Array of publication IDs for folders that
    # still have children left.
    parent_ids_for_visible_children = ProjectsFilteringService.new.apply_common_index_filters(
        Pundit.policy_scope(current_user, Project),
        params.except(:folder)
      ).includes(:admin_publication).pluck('admin_publications.parent_id').compact

    # Leave out folders which would have no
    # children left if the same filters were
    # applied to its projects.
    if params[:filter_empty_folders].present?    
      # Only keep folders that have children
      # left.
      @publications = @publications.where(publication_type: ProjectFolders::Folder.name, id: parent_ids_for_visible_children.uniq)
        .or(@publications.where(publication_type: Project.name))
    end

    @publications = @publications
      .order(:ordering)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
    
    # Caches the counts of visible children for
    # the current user.
    visible_children_count_by_parent_id = Hash.new(0).tap { |h| parent_ids_for_visible_children.each { |id| h[id] += 1 } }

    render json: linked_json(
      @publications,
      WebApi::V1::AdminPublicationSerializer,
      params: fastjson_params(visible_children_count_by_parent_id: visible_children_count_by_parent_id)
      )
  end

  def reorder
    if @publication.insert_at(permitted_attributes(@publication)[:ordering])
      SideFxAdminPublicationService.new.after_update(@publication, current_user)
      render json: WebApi::V1::AdminPublicationSerializer.new(
        @publication,
        params: fastjson_params,
        ).serialized_json, status: :ok
    else
      render json: {errors: @publication.errors.details}, status: :unprocessable_entity
    end
  end

  def show
    render json: WebApi::V1::AdminPublicationSerializer.new(
      @publication,
      params: fastjson_params,
      ).serialized_json, status: :ok
  end


  private

  def secure_controller?
    false
  end

  def set_admin_publication
    @publication = AdminPublication.find params[:id]
    authorize @publication
  end

end
