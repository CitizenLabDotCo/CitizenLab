module Polls
	module WebApi
		module V1
			class QuestionsController < PollsController
				before_action :set_participation_context, only: [:index]
				before_action :set_question, only: [:show, :update, :destroy, :reorder]

				def index
					@questions = policy_scope(Question)
						.where(participation_context: @participation_context)
						.includes(:options)
						.page(params.dig(:page, :number))
						.per(params.dig(:page, :size))
						.order(:ordering)

					render json: linked_json(
						@questions,
						Polls::WebApi::V1::QuestionSerializer,
						params: fastjson_params,
						include: [:options]
						)
				end

				def show
					render json: WebApi::V1::QuestionSerializer.new(
						@question,
						params: fastjson_params
						).serialized_json
				end

				def create
					@question = Question.new(question_params)
					authorize @question

					SideFxQuestionService.new.before_create(@question, current_user)
					if @question.save
						SideFxQuestionService.new.after_create(@question, current_user)
						render json: WebApi::V1::QuestionSerializer.new(
							@question,
							params: fastjson_params,
							include: [:options]
							).serialized_json, status: :created
					else
						render json: { errors: @question.errors.details }, status: :unprocessable_entity
					end
				end

				def update
					@question.assign_attributes question_params
					authorize @question
					SideFxQuestionService.new.before_update(@question, current_user)
					if @question.save
						SideFxQuestionService.new.after_update(@question, current_user)
						render json: WebApi::V1::QuestionSerializer.new(
							@question,
							params: fastjson_params,
							include: [:options]
							).serialized_json, status: :ok
					else
						render json: { errors: @question.errors.details }, status: :unprocessable_entity
					end						
				end

				def reorder
			    if @question.insert_at(reorder_params[:ordering])
			      SideFxQuestionService.new.after_update(@question, current_user)
						render json: WebApi::V1::QuestionSerializer.new(
							@question,
							params: fastjson_params,
							include: [:options]
							).serialized_json, status: :ok
			    else
			      render json: {errors: @question.errors.details}, status: :unprocessable_entity
			    end
				end

				def destroy
			    SideFxQuestionService.new.before_destroy(@question, current_user)
			    question = @question.destroy
			    if question.destroyed?
			      SideFxQuestionService.new.after_destroy(question, current_user)
			      head :ok
			    else
			      head 500
			    end
				end

				private

				def set_participation_context
					if params[:project_id]
						@participation_context = Project.find(params[:project_id])
					elsif params[:phase_id]
						@participation_context = Phase.find(params[:phase_id])
					else
						head 404
					end
				end

				def set_question
					@question = Question.find(params[:id])
					authorize @question
				end

				def reorder_params
					params.require(:question).permit(
						:ordering
					)
				end

				def question_params
					params.require(:question).permit(
						:participation_context_type,
						:participation_context_id,
						title_multiloc: CL2_SUPPORTED_LOCALES,
					)
				end

			  def secure_controller?
			    false
			  end
			end
		end
	end
end