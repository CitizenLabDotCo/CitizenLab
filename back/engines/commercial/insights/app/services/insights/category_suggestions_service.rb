# frozen_string_literal: true

module Insights
  class CategorySuggestionsService
    class << self
      # @param [NLP::ZeroshotClassificationMessage] zsc_message
      # @return [Array<Insights::CategoryAssignment>]
      def save_suggestion(zsc_message)
        return unless zsc_message.success?

        Tenant.find(zsc_message.tenant_id).switch do
          zsc_task = ZeroshotClassificationTask.find_by(task_id: zsc_message.task_id)
          return [] unless zsc_task

          zsc_task.destroy!
          save_predictions(zsc_message.predictions)
        end
      end

      private

      # @param[Array<NLP::ZeroshotClassificationMessage::Prediction>] predictions
      # @return [Array<Insights::CategoryAssignment>]
      def save_predictions(predictions)
        assignment_service = CategoryAssignmentsService.new

        new_assignments = predictions.group_by(&:document_id).flat_map do |document_id, predictions|
          input = ::Idea.find(document_id)
          categories = Category.where(id: predictions.map(&:label_id))
          assignment_service.add_suggestions(input, categories)
        rescue ActiveRecord::RecordNotFound
          # Ignore: don't save anything if the input cannot be found.
        end

        new_assignments.to_a # to return an empty array instead of nil
      end
    end

    attr_reader :nlp_client

    def initialize(nlp_client = nil)
      @nlp_client = nlp_client || NLP::API.new
    end

    # @return[Array<Insights::ZeroshotClassificationTask>]
    def classify(inputs, categories)
      documents = documents(inputs)
      return [] unless documents.any?

      response = nlp_client.zeroshot_classification(
        candidate_labels: candidate_labels(categories),
        documents: documents,
        tenant_id: AppConfiguration.instance.id,
        locale: nil # TODO: the nlp service requires it but do not use it.
      )

      tasks_infos = response['batches'] # It should look like [{'task_id':..., 'doc_ids':..., 'tags_ids':...}, ...]
      create_tasks(tasks_infos)
    end

    # @return [Array<Hash>]
    def documents(inputs)
      inputs.map { |i| { text: input_to_text(i), doc_id: i.id } }
            .select { |document| document['text'] }
    end

    # @param [Idea] input
    # @return [String,NilClass]
    def input_to_text(input)
      # [TODO] We currently assume that the multiloc contains only one body.
      # It seems to be true in most cases. (The UI does not allow a user to provide translations.)
      # Might not be true in seed data or similar settings.
      text = input.body_multiloc.compact.values.first
      ActionView::Base.full_sanitizer.sanitize(text).presence
    end

    # @param [Enumerable<Insights::Category>] categories
    # @return [Array]
    def candidate_labels(categories)
      categories.map { |c| { text: c.name, label_id: c.id } }
    end

    # @param [Array<Hash>] tasks_infos
    # @return [Array<Insights::ZeroshotClassificationTask>]
    def create_tasks(tasks_infos)
      task_service = ZeroshotClassificationTasksService.new
      tasks_infos.map do |task_infos|
        # TODO: optimize the nb of DB queries
        task_service.create_task(
          task_infos['task_id'],
          Idea.where(id: task_infos['doc_ids']),
          Category.where(id: task_infos['tags_ids'])
        )
      end
    end
  end
end
