module MonkeyPatches
  module WebApi
    module V1
      module IdeasSerializer
        def self.included(base)
          base.class_eval do
            belongs_to :assignee,
                       if: proc { |object, params| config.can_moderate?(object, params) },
                       record_type: :user,
                       serializer: WebApi::V1::UserSerializer
          end
        end
      end
    end
  end
end

::WebApi::V1::IdeasSerializer.prepend(MonkeyPatches::WebApi::V1::IdeasSerializer)
