class UserPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      scope
    end
  end

  def index?
    user&.active? && user.admin?
  end

  def create?
    true
  end

  def show?
    true
  end

  def by_slug?
    show?
  end

  def by_invite?
    record&.invite_pending?
  end

  def update?
    user&.active? && (record.id == user.id || user.admin?)
  end

  def complete_registration?
    user && !user.active? && (record.id == user.id)
  end

  def destroy?
    user&.active? && user.admin?
  end

  def view_private_attributes?
    (user && (record.id == user.id || user.admin?)) || record.invite_pending?
  end

  def permitted_attributes
    shared = [:first_name, :last_name, :email, :password, :avatar, :locale, custom_field_values: {}, bio_multiloc: CL2_SUPPORTED_LOCALES]
    if user && user.admin?
      shared + [roles: [:type, :project_id]]
    else
      shared
    end
  end

  def permitted_attributes_for_complete_registration
    [custom_field_values: {}]
  end
end
