class WebApi::V1::CommentsController < ApplicationController

  before_action :set_comment, only: [:show, :update, :mark_as_deleted, :destroy]
  skip_after_action :verify_authorized, only: [:index_xlsx]

  FULLY_EXPAND_THRESHOLD = 5
  ALWAYS_EXPAND = 2

  def index

    root_comments = policy_scope(Comment)
      .where(idea: params[:idea_id])
      .where(parent: nil)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
      .order(:lft)

    fully_expanded_root_comments = Comment.where(id: root_comments)
      .where("children_count <= ?", FULLY_EXPAND_THRESHOLD)

    partially_expanded_root_comments = Comment.where(id: root_comments)
      .where("children_count > ?", FULLY_EXPAND_THRESHOLD)

    partially_expanded_child_comments = Comment
      .where(parent_id: partially_expanded_root_comments)
      .joins(:parent)
      .where("comments.lft >= parents_comments.rgt - ?", ALWAYS_EXPAND * 2)

    @comments = Comment
      .where(id: root_comments)
      .or(Comment.where(parent: fully_expanded_root_comments))
      .or(Comment.where(id: partially_expanded_child_comments))
      .order(:lft)
      .includes(:author)

    root_comments_count = policy_scope(Comment)
      .where(idea: params[:idea_id])
      .where(parent: nil)
      .count

    if current_user
      votes = Vote.where(user: current_user, votable: @comments.all)
      votes_by_comment_id = votes.map{|vote| [vote.votable_id, vote]}.to_h
      render json: @comments, include: ['author', 'user_vote'], vbci: votes_by_comment_id, meta: { total: root_comments_count }
    else
      render json: @comments, include: ['author'], meta: { total: root_comments_count }
    end
  end

  def index_xlsx
    I18n.with_locale(current_user&.locale) do
      @comments = policy_scope(Comment)
        .includes(:author, :idea)
        .order(:lft)
      @comments = @comments.where(ideas: {project_id: params[:project]}) if params[:project].present?
      @comments = @comments.where(idea_id: params[:ideas]) if params[:ideas].present?
      xlsx = XlsxService.new.generate_comments_xlsx @comments
      send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'comments.xlsx'
    end
  end

  def show
    render json: @comment, include: ['author']
  end

  def create
    @comment = Comment.new comment_params
    @comment.idea_id = params[:idea_id]
    @comment.author ||= current_user
    authorize @comment
    SideFxCommentService.new.before_create @comment, current_user
    if @comment.save
      SideFxCommentService.new.after_create @comment, current_user
      render json: @comment, status: :created, include: ['author']
    else
      render json: { errors: @comment.errors.details }, status: :unprocessable_entity
    end
  end

  def update
    @comment.attributes = permitted_attributes @comment
    authorize @comment
    SideFxCommentService.new.before_update @comment, current_user
    if @comment.save
      SideFxCommentService.new.after_update @comment, current_user
      render json: @comment, status: :ok, include: ['author']
    else
      render json: { errors: @comment.errors.details }, status: :unprocessable_entity
    end
  end

  def mark_as_deleted
    reason_code = params.dig(:comment, :reason_code)
    other_reason = params.dig(:comment, :other_reason)
    if (@comment.author_id == current_user&.id) || 
      ((Notifications::CommentDeletedByAdmin::REASON_CODES.include? reason_code) &&
       (reason_code != 'other' || other_reason.present?))
      @comment.publication_status = 'deleted'
      if @comment.save
        SideFxCommentService.new.after_mark_as_deleted(@comment, current_user, reason_code, other_reason)
        head :ok
      else
        render json: { errors: @comment.errors.details }, status: :unprocessable_entity
      end
    else
      raise ClErrors::TransactionError.new(error_key: :invalid_reason)
    end
  end

  def destroy
    SideFxCommentService.new.before_destroy(@comment, current_user)
    comment = @comment.destroy
    if comment.destroyed?
      SideFxCommentService.new.after_destroy(comment, current_user)
      head :ok
    else
      head 500
    end
  end

  private

  def set_comment
    @comment = Comment.find_by(id: params[:id])
    authorize @comment
  end

  def comment_params
    # no one is allowed to modify someone else's comment, 
    # so no one is allowed to write a comment in someone
    # else's name
    params.require(:comment).permit(
      :parent_id,
      # :author_id
      body_multiloc: CL2_SUPPORTED_LOCALES
    )
  end

  def secure_controller?
    false
  end

end
