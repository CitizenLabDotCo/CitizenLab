class WebApi::V1::ActivitiesController < ApplicationController
  before_action :set_post_type_and_id
  skip_after_action :verify_policy_scoped

  def index
    @activities = policy_scope(Activity).where(
      item_id: @post_id,
      item_type: @post_type,
      action: ['published', 'changed_status', 'changed_title', 'changed_body']
    )
      .includes(:user)
      .order(acted_at: :desc)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    render json: linked_json(
      @activities, 
      WebApi::V1::ActivitySerializer, 
      params: fastjson_params,
      include: [:user]
      )
  end


  private

  def set_post_type_and_id
    @post_type = params[:post]
    @post_id = params[:"#{@post_type.underscore}_id"]
  end

  def secure_controller?
    false
  end
end
