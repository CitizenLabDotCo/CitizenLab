class AdminPublicationPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      ApplicationRecord
          .all_polymorphic_types(:publication) # List of publication classes
          .map { |klass| scope.where(publication: Pundit.policy_scope(user, klass)) } # scope per publication type
          .reduce(&:or) # joining partial scopes
    end
  end

  def show?
    Pundit.policy(user, record.publication).show?
  end

  def reorder?
    user&.active? && user.admin?
  end

  def permitted_attributes_for_reorder
    [:ordering]
  end
end
