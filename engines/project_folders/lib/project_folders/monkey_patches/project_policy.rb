module ProjectFolders
  module MonkeyPatches
    module ProjectPolicy
      module Scope
        def resolve
          if user&.project_folder_moderator? && !user&.admin?
            folder_publication_ids = user.moderated_project_folders
                                         .includes(:admin_publication)
                                         .pluck('admin_publications.id')

            scope.includes(:admin_publication)
                 .where(admin_publications: { parent_id: folder_publication_ids })
                 .or(scope.includes(:admin_publication).where(projects: { id: user.moderatable_project_ids }))
          else
            super
          end
        end
      end

      def create?
        super || user.moderates_parent_folder?(record)
      end
    end
  end
end
