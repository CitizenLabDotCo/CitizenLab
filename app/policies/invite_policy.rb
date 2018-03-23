class InvitePolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user&.admin?
        scope.all
      else
        scope.none
      end
    end
  end

  def create?
    user&.active? && user.admin?
  end

  def bulk_create?
    user&.active? && user.admin?
  end

  def bulk_create_xlsx?
    user&.active? && user.admin?
  end

end