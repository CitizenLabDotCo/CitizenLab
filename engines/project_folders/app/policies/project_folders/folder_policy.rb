module ProjectFolders
  class FolderPolicy < ApplicationPolicy
    class Scope
      attr_reader :user, :scope

      def initialize(user, scope)
        @user = user
        @scope = scope
      end

      def resolve
        if user&.admin?
          scope.all
        elsif user&.project_folder_moderator?
          user.moderated_project_folders
        else
          scope.left_outer_joins(:admin_publication)
               .where(admin_publications: {publication_status: ['published', 'archived']})
        end
      end
    end

    def show?
      true
    end

    def by_slug?
      show?
    end

    def create?
      user&.active_and_admin?
    end

    def update?
      user&.active_and_admin? || user&.project_folder_moderator?(record.id)
    end

    def destroy?
      user&.active_and_admin?
    end
  end
end
