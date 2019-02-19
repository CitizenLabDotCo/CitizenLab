class WebApi::V1::OfficialFeedbackController < ApplicationController

  before_action :set_feedback, only: [:show, :update, :destroy]

  def index
    @feedbacks = policy_scope(OfficialFeedback)
      .where(idea_id: params[:idea_id])
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
      .order(updated_at: :desc)

    render json: @feedbacks
  end

  def show
    render json: @feedback
  end

  def create
    @feedback = OfficialFeedback.new official_feedback_params
    @feedback.idea_id = params[:idea_id]
    @feedback.user ||= current_user
    authorize @feedback
    SideFxOfficialFeedbackService.new.before_create @feedback, current_user
    if @feedback.save
      SideFxOfficialFeedbackService.new.after_create @feedback, current_user
      render json: @feedback, status: :created
    else
      render json: { errors: @feedback.errors.details }, status: :unprocessable_entity
    end
  end

  def update
    authorize @feedback
    @feedback.assign_attributes admin_feedback_params
    authorize @feedback
    SideFxOfficialFeedbackService.new.before_update @feedback, current_user
    if @feedback.save
      SideFxOfficialFeedbackService.new.after_update @feedback, current_user
      render json: @feedback, status: :ok
    else
      render json: { errors: @feedback.errors.details }, status: :unprocessable_entity
    end
  end

  def destroy
    SideFxOfficialFeedbackService.new.before_destroy(@feedback, current_user)
    feedback = @feedback.destroy
    if feedback.destroyed?
      SideFxOfficialFeedbackService.new.after_destroy(feedback, current_user)
      head :ok
    else
      head 500
    end
  end

  private

  def set_feedback
    @feedback = OfficialFeedback.find_by(id: params[:id])
    authorize @feedback
  end

  def official_feedback_params
    params.require(:official_feedback).permit(
      body_multiloc: CL2_SUPPORTED_LOCALES,
      author_multiloc: CL2_SUPPORTED_LOCALES
    )
  end

  def secure_controller?
    false
  end

end
