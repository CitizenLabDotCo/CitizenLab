class TenantPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      scope.none
    end
  end

  def create?
    false
  end

  def show?
    false
  end

  def current?
    true
  end

  def update?
    user && user.admin?
  end

  def destroy?
    false
  end
end
