module CustomMaps
  module WebApi
    module V1
      class MapConfigsController < ::Maps::WebApi::V1::MapConfigsController
        before_action :set_map_config, only: %i[update destroy]

        def create
          @map_config = @project.build_map_config(map_config_params)

          if @map_config.save
            render json: serialized_map_config, status: :ok
          else
            render json: { errors: @map_config.errors.details }, status: :unprocessable_entity
          end
        end

        def update
          if @map_config.update(map_config_params)
            render json: serialized_map_config
          else
            render json: { errors: @map_config.errors.details }, status: :unprocessable_entity
          end
        end

        def destroy
          if @map_config.destroy
            head :no_content
          else
            render json: { errors: @map_config.errors.details }, status: :unprocessable_entity
          end
        end

        private

        def set_map_config
          @map_config = ::Maps::MapConfig.find_by!(project_id: params[:project_id])
        end

        def map_config_params
          params.require(:map_config).permit(:zoom_level, :tile_provider, center_geojson: {})
        end
      end
    end
  end
end
