module IdeaAssignment
  module Extensions
    module WebApi
      module V1
        module IdeaSerializer
          def self.included(base)
            base.class_eval do
              belongs_to :assignee,
                         if: proc { |object, params| can_moderate?(object, params) },
                         record_type: :user,
                         serializer: ::WebApi::V1::UserSerializer
            end
          end
        end
      end
    end
  end
end

::WebApi::V1::IdeaSerializer.include_if_ee('IdeaAssignment::Extensions::WebApi::V1::IdeaSerializer')
