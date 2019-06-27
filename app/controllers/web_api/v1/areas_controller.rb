class WebApi::V1::AreasController < ApplicationController
  before_action :set_area, only: [:show, :update, :destroy]

  def index
    @areas = policy_scope(Area)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
    @areas = @areas.order(created_at: :desc)
    render json: linked_json(@areas, WebApi::V1::Fast::AreaSerializer, params: fastjson_params)
  end

  def show
    render json: WebApi::V1::Fast::AreaSerializer.new(@area, params: fastjson_params).serialized_json
  end

  def create
    @area = Area.new(area_params)
    authorize @area

    SideFxAreaService.new.before_create(@area, current_user)
    if @area.save
      SideFxAreaService.new.after_create(@area, current_user)
      render json: WebApi::V1::Fast::AreaSerializer.new(
        @area, 
        params: fastjson_params
        ).serialized_json, status: :created
    else
      render json: { errors: @area.errors.details }, status: :unprocessable_entity
    end
  end

  def update
    @area.assign_attributes area_params
    authorize @area
    SideFxAreaService.new.before_update(@area, current_user)
    if @area.save
      SideFxAreaService.new.after_update(@area, current_user)
      render json: WebApi::V1::Fast::AreaSerializer.new(
        @area, 
        params: fastjson_params
        ).serialized_json, status: :ok
    else
      render json: { errors: @area.errors.details }, status: :unprocessable_entity
    end
  end

  def destroy
    SideFxAreaService.new.before_destroy(@area, current_user)
    area = @area.destroy
    if area.destroyed?
      SideFxAreaService.new.after_destroy(area, current_user)
      head :ok
    else
      head 500
    end
  end


  private

  def set_area
    @area = Area.find(params[:id])
    authorize @area
  end

  def area_params
    params.require(:area).permit(
      title_multiloc: CL2_SUPPORTED_LOCALES,
      description_multiloc: CL2_SUPPORTED_LOCALES
    )
  end

  def secure_controller?
    false
  end
end
