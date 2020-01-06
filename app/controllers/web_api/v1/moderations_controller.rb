class WebApi::V1::ModerationsController < ApplicationController

  def index
    @moderations = policy_scope(Moderation)
    @moderations = @moderations.where(id: Idea.published)
      .or(@moderations.where(id: Initiative.published))
      .or(@moderations.where(id: Comment.published))
      .order(created_at: :desc)
    
    if params[:moderation_status].present?
      @moderations = @moderations.joins("LEFT JOIN moderation_statuses \
        ON moderation_statuses.moderatable_id = moderations.id AND \
           moderation_statuses.moderatable_type = moderations.moderatable_type"
      )
      @moderations = case params[:moderation_status]
      when 'read'
        @moderations.where(moderation_statuses: {status: 'read'})
      when 'unread'
        @moderations.where(moderation_statuses: {status: ['unread', nil]})
      end
    end

    @moderations = @moderations
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
    render json: linked_json(@moderations, WebApi::V1::ModerationSerializer, params: fastjson_params)
  end

  def update
    @moderation = Moderation.find_by(
      moderatable_type: params[:moderatable_type],
      id: params[:moderatable_id]
    )
    authorize @moderation


    if moderation_params[:moderation_status]
      @moderation_status = @moderation.moderation_status
      if !@moderation_status
        @moderation_status = ModerationStatus.create!(
          moderatable: @moderation.source_record,
          status: moderation_params[:moderation_status]
        )
        SideFxModerationStatusService.new.after_create(@moderation_status, current_user)
      else
        @moderation_status.update!(status: moderation_params[:moderation_status])
        SideFxModerationStatusService.new.after_update(@moderation_status, current_user)
      end
    end

    render json: WebApi::V1::ModerationSerializer.new(
      @moderation.reload, 
      params: fastjson_params
      ).serialized_json, status: :ok
  end

  def moderation_params
    params.require(:moderation).permit(
      :moderation_status
    )
  end
end