class UserPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      scope.all
    end
  end

  def index?
    user
  end

  def show?
    true
  end

  def me?
    true
  end

  def update?
    true
  end

  def view_private_attributes?
    user && record.id == user.id
  end
end
