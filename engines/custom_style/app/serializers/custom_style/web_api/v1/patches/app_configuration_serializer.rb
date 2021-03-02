module CustomStyle
  module WebApi::V1
    module Patches
      module AppConfigurationSerializer
        def self.included(base)
          base.class_eval do
            attributes :style
          end
        end
      end
    end
  end
end
