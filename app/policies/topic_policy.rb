class TopicPolicy < ApplicationPolicy
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

  def create?
    user&.active? && user.admin?
  end

  def show?
    true
  end

  def update?
    user&.active? && user.admin?
  end

  def reorder?
    update?
  end

  def destroy?
    update?
  end

  def permitted_attributes_for_create
    [
      title_multiloc: CL2_SUPPORTED_LOCALES,
      description_multiloc: CL2_SUPPORTED_LOCALES
    ]
  end

  def permitted_attributes_for_update
    permitted_attributes_for_create
  end

  def permitted_attributes_for_reorder
    [:ordering]
  end
end
