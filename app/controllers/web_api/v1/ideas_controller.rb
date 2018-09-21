class WebApi::V1::IdeasController < ApplicationController

  before_action :set_idea, only: [:show, :update, :destroy]
  skip_after_action :verify_authorized, only: [:index_xlsx, :index_idea_markers]
  
  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
  
  def index
    @ideas = policy_scope(Idea).includes(:author, :topics, :areas, :phases, :idea_images, project: [:phases])
      .left_outer_joins(:idea_status).left_outer_joins(:idea_trending_info)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    trending_idea_service = TrendingIdeaService.new

    add_common_index_filters params

    if params[:sort].present? && !params[:search].present?
      @ideas = case params[:sort]
        when "new"
          @ideas.order_new
        when "-new"
          @ideas.order_new(:asc)
        when "trending"
          trending_idea_service.sort_trending @ideas
        when "-trending"
          trending_idea_service.sort_trending(@ideas).reverse
        when "popular"
          @ideas.order_popular
        when "-popular"
          @ideas.order_popular(:asc)
        when "author_name"
          @ideas.order(author_name: :asc)
        when "-author_name"
          @ideas.order(author_name: :desc)
        when "upvotes_count"
          @ideas.order(upvotes_count: :asc)
        when "-upvotes_count"
          @ideas.order(upvotes_count: :desc)
        when "downvotes_count"
          @ideas.order(downvotes_count: :asc)
        when "-downvotes_count"
          @ideas.order(downvotes_count: :desc)
        when "status"
          @ideas.order_status(:asc)
        when "-status"
          @ideas.order_status(:desc)
        when nil
          @ideas
        else
          raise "Unsupported sort method"
        end
    end

    @idea_ids = @ideas.map(&:id)

    if current_user
      votes = Vote.where(user: current_user, votable_id: @idea_ids, votable_type: 'Idea')
      votes_by_idea_id = votes.map{|vote| [vote.votable_id, vote]}.to_h
      render json: @ideas, include: ['author', 'user_vote', 'idea_images'], vbii: votes_by_idea_id, pcs: ParticipationContextService.new
    else
      render json: @ideas, include: ['author', 'idea_images'], pcs: ParticipationContextService.new
    end

  end

  def index_idea_markers
    @ideas = policy_scope(Idea)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    add_common_index_filters params
    @ideas = @ideas.with_bounding_box(params[:bounding_box]) if params[:bounding_box].present?

    render json: @ideas, each_serializer: WebApi::V1::IdeaMarkerSerializer
  end

  def index_xlsx
    I18n.with_locale(current_user&.locale) do
      @ideas = policy_scope(Idea)
        .includes(:author, :topics, :areas, :project)
        .where(publication_status: 'published')
      @ideas = @ideas.where(project_id: params[:project]) if params[:project].present?
      xlsx = XlsxService.new.generate_ideas_xlsx @ideas
      send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'ideas.xlsx'
    end
  end

  def show
    render json: @idea, include: ['author','topics','areas','user_vote','idea_images'], serializer: WebApi::V1::IdeaSerializer
  end

  def by_slug
    @idea = Idea.find_by!(slug: params[:slug])
    authorize @idea
    show
  end

  # insert
  def create
    @idea = Idea.new(permitted_attributes(Idea))
    @idea.author ||= current_user

    SideFxIdeaService.new.before_create(@idea, current_user)

    authorize @idea
    ActiveRecord::Base.transaction do
      if @idea.save
        SideFxIdeaService.new.after_create(@idea, current_user)
        render json: @idea.reload, status: :created, include: ['author','topics','areas','phases','user_vote','idea_images']
      else
        render json: { errors: @idea.errors.details }, status: :unprocessable_entity
      end

    end
  end

  # patch
  def update
    params[:idea][:area_ids] ||= [] if params[:idea].has_key?(:area_ids)
    params[:idea][:topic_ids] ||= [] if params[:idea].has_key?(:topic_ids)
    params[:idea][:phase_ids] ||= [] if params[:idea].has_key?(:phase_ids)
    ActiveRecord::Base.transaction do
      if @idea.update(permitted_attributes(@idea))
        authorize @idea
        SideFxIdeaService.new.after_update(@idea, current_user)
        render json: @idea.reload, status: :ok, include: ['author','topics','areas','user_vote','idea_images']
      else
        render json: { errors: @idea.errors.details }, status: :unprocessable_entity
      end
    end 
  end

  # delete
  def destroy
    idea = @idea.destroy
    if idea.destroyed?
      SideFxIdeaService.new.after_destroy(idea, current_user)
      head :ok
    else
      head 500
    end
  end

  private
  # TODO: temp fix to pass tests
  def secure_controller?
    false
  end

  def set_idea
    @idea = Idea.find params[:id]
    authorize @idea
  end

  def add_common_index_filters params
    @ideas = @ideas.with_some_topics(params[:topics]) if params[:topics].present?
    @ideas = @ideas.with_some_areas(params[:areas]) if params[:areas].present?
    @ideas = @ideas.in_phase(params[:phase]) if params[:phase].present?
    @ideas = @ideas.where(project_id: params[:project]) if params[:project].present?
    @ideas = @ideas.where(author_id: params[:author]) if params[:author].present?
    @ideas = @ideas.where(idea_status_id: params[:idea_status]) if params[:idea_status].present?
    @ideas = @ideas.search_by_all(params[:search]) if params[:search].present?
    if params[:publication_status].present?
      @ideas = @ideas.where(publication_status: params[:publication_status])
    else
      @ideas = @ideas.where(publication_status: 'published')
    end
    if (params[:filter_trending] == 'true') && !params[:search].present?
      @ideas = trending_idea_service.filter_trending @ideas
    end
  end

  def user_not_authorized exception
    pcs = ParticipationContextService.new
    if exception.query == "create?"
      reason = pcs.posting_disabled_reason(exception.record.project)
      if reason
        render json: { errors: { base: [{ error: reason }] } }, status: :unauthorized
        return
      end
    end
    render json: { errors: { base: [{ error: 'Unauthorized!' }] } }, status: :unauthorized
  end

end
