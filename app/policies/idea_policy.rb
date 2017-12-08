class IdeaPolicy < ApplicationPolicy
  class Scope
    attr_reader :user, :scope

    def initialize(user, scope)
      @user  = user
      @scope = scope
    end

    def resolve
      if user&.admin?
        scope.all
      elsif user
        # This version caused issues with the pagination, so we use a more expensive 2-query approach.
        # TODO: Improve this 
        # scope
        #   .left_outer_joins(project: {groups: :memberships})
        #   .where("projects.id IS NULL OR \
        #     projects.visible_to = 'public' OR \
        #     (projects.visible_to = 'groups' AND memberships.user_id = ?)", user&.id)
        project_ids =  Pundit.policy_scope(user, Project).select(:id).map(&:id)
          scope.where(project_id: nil).or(scope.where(project_id: project_ids))
      else
        scope
          .includes(:project)# .left_outer_joins(:project)
          .where("projects.id IS NULL OR projects.visible_to = 'public'")
      end
    end
  end

  def images_index?
    show?
  end

  def files_index?
    show?
  end

  def create?
    record.draft? || (user && (record.author_id == user.id || user.admin?))
  end

  def show?
    user&.admin? ||
    record.project_id.blank? ||
    ProjectPolicy.new(user, record.project).show?
  end

  def by_slug?
    show?
  end

  def update?
    record.draft? || (user && (record.author_id == user.id || user.admin?))
  end

  def destroy?
    update?
  end

  def permitted_attributes
    shared = [:publication_status,
      :project_id,
      :author_id,
      :location_description,
      location_point_geojson: [:type, coordinates: []],
      title_multiloc: I18n.available_locales,
      body_multiloc: I18n.available_locales,
      topic_ids: [],
      area_ids: []
    ]
    if user&.admin?
      [:idea_status_id] + shared
    else
      shared
    end
  end


end
