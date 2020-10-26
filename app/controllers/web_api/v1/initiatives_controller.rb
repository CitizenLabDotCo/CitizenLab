class WebApi::V1::InitiativesController < ApplicationController
  before_action :set_initiative, only: [:show, :update, :destroy, :allowed_transitions]
  skip_after_action :verify_authorized, only: [:index_xlsx, :index_initiative_markers, :filter_counts]

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  def index
    @result = InitiativesFinder.find(params, authorize_with: current_user, includes: %i[author assignee topics areas])
    @initiatives = @result.records
    render json: linked_json(@initiatives, WebApi::V1::InitiativeSerializer, serialization_options)
  end

  def index_initiative_markers
    @result = InitiativesFinder.find(params, authorize_with: current_user)
    @initiatives = @result.records
    render json: linked_json(@initiatives, WebApi::V1::PostMarkerSerializer, params: fastjson_params)
  end

  def index_xlsx
    authorize :initiative, :index_xlsx?
    finder_params = params.merge(publication_status: 'published')
    included_associations = %i[author initiative_status topics areas]
    @result = InitiativesFinder.find(finder_params, authorize_with: current_user, includes: included_associations)
    @initiatives = @result.records

    I18n.with_locale(current_user&.locale) do
      xlsx = XlsxService.new.generate_initiatives_xlsx @initiatives, view_private_attributes: Pundit.policy!(current_user, User).view_private_attributes?
      send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'initiatives.xlsx'
    end
  end

  def filter_counts
    @result = InitiativesFinder.find(params, authorize_with: current_user)
    @initiatives = @result.records
    @counts = InitiativesCountCalculator.calculate(@initiatives, counts: %i[initiative_status_id area_id topic_id]).counts
    render json: @counts
  end

  def show
    render json: WebApi::V1::InitiativeSerializer.new(
      @initiative,
      params: fastjson_params,
      include: [:author, :topics, :areas, :user_vote, :initiative_images]
      ).serialized_json
  end

  def by_slug
    @initiative = Initiative.find_by!(slug: params[:slug])
    authorize @initiative
    show
  end

  def create
    service = SideFxInitiativeService.new

    @initiative = Initiative.new(permitted_attributes(Initiative))
    @initiative.author ||= current_user

    service.before_create(@initiative, current_user)

    authorize @initiative
    ActiveRecord::Base.transaction do
      if @initiative.save
        service.after_create(@initiative, current_user)
        render json: WebApi::V1::InitiativeSerializer.new(
          @initiative.reload,
          params: fastjson_params,
          include: [:author, :topics, :areas, :user_vote, :initiative_images]
          ).serialized_json, status: :created
      else
        render json: { errors: @initiative.errors.details }, status: :unprocessable_entity
      end

    end
  end

  def update
    service = SideFxInitiativeService.new

    initiative_params = permitted_attributes(@initiative)
    @initiative.assign_attributes(initiative_params)
    if initiative_params.keys.include?('header_bg') && initiative_params['header_bg'] == nil
      # setting the header image attribute to nil will not remove the header image
      @initiative.remove_header_bg!
    end
    authorize @initiative

    service.before_update(@initiative, current_user)

    saved = nil
    ActiveRecord::Base.transaction do
      saved = @initiative.save
      if saved
        authorize @initiative
        service.after_update(@initiative, current_user)
      end
    end

    # Keeping `render` outside of the transaction is better anyway.
    # Additionally, if we wouldn't do it here, we're running into an issue
    # where carrierwave is not storing the actual header_bg file on the
    # filesystem. The root cause it not exactly clear.
    if saved
      render json: WebApi::V1::InitiativeSerializer.new(
        @initiative.reload,
        params: fastjson_params,
        include: [:author, :topics, :areas, :user_vote, :initiative_images]
        ).serialized_json, status: :ok
    else
      render json: { errors: @initiative.errors.details }, status: :unprocessable_entity
    end
  end

  def destroy
    service = SideFxInitiativeService.new

    service.before_destroy(@initiative, current_user)
    initiative = @initiative.destroy
    if initiative.destroyed?
      service.after_destroy(initiative, current_user)
      head :ok
    else
      head 500
    end
  end

  def allowed_transitions
    authorize @initiative
    render json: InitiativeStatusService.new.allowed_transitions(@initiative)
  end

  private

  def secure_controller?
    false
  end

  def set_initiative
    @initiative = Initiative.find params[:id]
    authorize @initiative
  end

  def serialization_options
    votes = current_user.votes.where(votable_id: @initiatives.pluck(:id), votable_type: 'Initiative')
                        .map { |vote| [vote.votable_id, vote] }.to_h
    default_params = fastjson_params(pcs: ParticipationContextService.new)

    if current_user
      { params: default_params.merge(vbii: votes), include: %i[author user_vote initiative_images assignee] }
    else
      { params: default_params, include: %i[author initiative_images] }
    end
  end

  def display_names_restricted?
    UserDisplayNameService.new(Tenant.current, current_user).restricted?
  end
end
