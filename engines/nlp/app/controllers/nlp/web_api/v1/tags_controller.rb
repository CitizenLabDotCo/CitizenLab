module NLP
  module WebApi
    module V1
      class TagsController < ApplicationController

        skip_after_action :verify_authorized, only: [:generate_tags]


        def generate_tags
          locale = params['locale']
          @tags = []
          TagSuggestionService.new.suggest(policy_scope(Idea).where(id: params['idea_ids']), locale).each { |e|
            tag_data = {
              title_multiloc: {}
            }
            tag_data[:title_multiloc][locale] = e[:text]
            tag = Tag.create(tag_data)
            @tags.push(tag) if tag #TODO error handle
          }

          render json: ::WebApi::V1::TagSerializer.new(@tags, params: fastjson_params).serialized_json, status: :ok
        end
      end

      private

      def secure_controller?
        false
      end
    end
  end
end
