class InitiativeVotePolicy < ApplicationPolicy

  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user = user
      @scope = scope
    end

    def resolve
      if user&.admin?
        scope.all
      elsif user
        scope.where(user: user)
      else
        scope.none
      end
    end
  end

  def create?
    return unless user&.active? && owner?

    reason = voting_denied?(user)
    reason ? raise_not_authorized(reason) : true
  end

  def destroy?
    create?
  end

  def up?
    create?
  end

  def down?
    raise_not_authorized('downvoting_not_supported')
  end

  def show?
    active? && (owner? || admin?)
  end

  private

  def voting_denied?(user)
    :not_signed_in unless user
  end
end

# InitiativeVotePolicy.prepend(GranularPermissions::Patches::InitiativeVotePolicy)
