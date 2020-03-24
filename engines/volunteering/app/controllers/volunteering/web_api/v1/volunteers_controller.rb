module Volunteering
  module WebApi
    module V1
      class VolunteersController < VolunteeringController
        before_action :set_cause, only: [:index, :create, :destroy]
        before_action :set_participation_context, only: [:index_xlsx]
        def index
          @volunteers = policy_scope(Volunteer)
            .where(cause: @cause)
            .includes(:user)
            .page(params.dig(:page, :number))
            .per(params.dig(:page, :size))

          render json: linked_json(
            @volunteers,
            Volunteering::WebApi::V1::VolunteerSerializer,
            params: fastjson_params,
            include: [:user]
          )
        end

        # GET projects/:project_id/volunteers/as_xlsx
        # GET phases/:phase_id/volunteers/as_xlsx
        def index_xlsx
          authorize [:volunteering, :volunteer], :index_xlsx?

          @volunteers = policy_scope(Volunteer)
            .joins(:cause)
            .where(volunteering_causes: {participation_context_id: @participation_context})
            .includes(:user, :cause)

          xlsx = Volunteering::XlsxService.new.generate_xlsx(@participation_context, @volunteers)

          send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'volunteers.xlsx'
        end

        def create
          @volunteer = Volunteer.new(cause: @cause, user: current_user)
          authorize @volunteer

          SideFxVolunteerService.new.before_create(@volunteer, current_user)
          if @volunteer.save
            SideFxVolunteerService.new.after_create(@volunteer, current_user)
            render json: WebApi::V1::VolunteerSerializer.new(
              @volunteer,
              params: fastjson_params,
              ).serialized_json, status: :created
          else
            render json: { errors: @volunteer.errors.details }, status: :unprocessable_entity
          end
        end

        def destroy
          @volunteer = Volunteer.find_by!(user: current_user, cause: @cause)
          authorize(@volunteer)

          SideFxVolunteerService.new.before_destroy(@volunteer, current_user)
          volunteer = @volunteer.destroy
          if volunteer.destroyed?
            SideFxVolunteerService.new.after_destroy(volunteer, current_user)
            head :ok
          else
            head 500
          end
        end

        private

        def set_cause
          @cause = Cause.find(params[:cause_id])
        end

        def set_participation_context
          if params[:project_id]
            @participation_context = Project.find(params[:project_id])
          elsif params[:phase_id]
            @participation_context = Phase.find(params[:phase_id])
          else
            head 404
          end
        end

        def secure_controller?
          true
        end
      end
    end
  end
end