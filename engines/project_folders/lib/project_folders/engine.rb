require 'project_folders/monkey_patches'
<<<<<<< HEAD
=======
require 'project_folders/monkey_patches/admin_publication_policy'
>>>>>>> f30d5eb3002ab526b690a9f25cf6634955e00d1a
require 'project_folders/monkey_patches/project_policy'
require 'project_folders/monkey_patches/project_serializer'

begin
  require 'factory_bot_rails'
rescue LoadError
end


module ProjectFolders
  class Engine < ::Rails::Engine
    isolate_namespace ProjectFolders
    config.generators.api_only = true

    # Sharing the factories to make them accessible from to the main app / other engines.
    factories_path = File.expand_path('../../../spec/factories', __FILE__)
    config.factory_bot.definition_file_paths += [factories_path] if defined?(FactoryBotRails)

    def self.activate
      # ::File otherwise it picks up ProjectFolders::File
      Dir.glob(::File.join(::File.dirname(__FILE__), '../../app/**/*_decorator*.rb')) do |c|
        Rails.configuration.cache_classes ? require(c) : load(c)
      end
    end

    config.to_prepare(&method(:activate).to_proc)

    config.after_initialize do
      ::User.prepend(ProjectFolders::ModeratorDecorator)
    end

    ActiveSupport.on_load(:action_controller) do
      ::ProjectPolicy.prepend ProjectFolders::MonkeyPatches::ProjectPolicy
<<<<<<< HEAD
=======
      ::AdminPublicationPolicy.prepend ProjectFolders::MonkeyPatches::AdminPublicationPolicy
>>>>>>> f30d5eb3002ab526b690a9f25cf6634955e00d1a
      ::ProjectPolicy::Scope.prepend ProjectFolders::MonkeyPatches::ProjectPolicy::Scope
      ::WebApi::V1::ProjectSerializer.prepend ProjectFolders::MonkeyPatches::ProjectSerializer
    end
  end
end
