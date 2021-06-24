module ProjectFolders
  module Patches
    module UserRoleService
      def moderators_for_project project, scope=::User
        super.or(scope.project_folder_moderator(project.folder_id))
      end

      def moderators_for object, scope=::User
        case object.class.name
        when 'ProjectFolders::Folder'
          scope.project_folder_moderator(object.id, scope)
        else
          super
        end
      end
    end
  end
end
