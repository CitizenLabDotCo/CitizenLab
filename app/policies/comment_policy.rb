class CommentPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      idea_ids = Pundit.policy_scope(user, Idea).pluck(:id)
      scope.where(idea: idea_ids)
    end
  end

  def create?
    (
      user&.active? && 
      (record.author_id == user.id) &&
      ProjectPolicy.new(user, record.project).show? &&
      check_commenting_allowed(record, user)
    ) || 
    user&.active_admin_or_moderator?(record.project.id)
  end

  def show?
    IdeaPolicy.new(user, record.idea).show?
  end

  def update?
    create?
  end

  def mark_as_deleted?
    update?
  end

  def destroy?
    false
  end

  def permitted_attributes_for_update
    attrs = [:parent_id, :author_id]
    if record.author_id == user&.id
      attrs += [body_multiloc: CL2_SUPPORTED_LOCALES]
    end
    attrs
  end


  private

  def check_commenting_allowed comment, user
    pcs = ParticipationContextService.new
    !pcs.commenting_disabled_reason comment.idea, user
  end

end
