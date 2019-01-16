module Onboarding
  class Engine < ::Rails::Engine
    isolate_namespace Onboarding

    config.to_prepare do
      Dir.glob(Engine.root + "app/models/**/*_decorator*.rb").each do |c|
        require_dependency(c)
      end
    end
  end
end
