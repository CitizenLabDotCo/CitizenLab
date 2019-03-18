class WebApi::V1::IdeaSerializer < ActiveModel::Serializer

  attributes :id, :title_multiloc, :body_multiloc, :author_name, :slug, :publication_status, :upvotes_count, :downvotes_count, :comments_count, :official_feedbacks_count, :location_point_geojson, :location_description, :created_at, :updated_at, :published_at, :budget, :baskets_count

  has_many :topics
  has_many :areas
  has_many :idea_images, serializer: WebApi::V1::ImageSerializer
  has_many :phases

  belongs_to :author
  belongs_to :project
  belongs_to :idea_status
  belongs_to :assignee, if: :can_moderate?

  has_one :user_vote, if: :signed_in? do |serializer|
    serializer.cached_user_vote
  end

  has_one :action_descriptor


  def signed_in?
    scope
  end

  def can_moderate?
    ProjectPolicy.new(scope, object.project).moderate?
  end

  def cached_user_vote
    if @instance_options[:vbii]
      @instance_options.dig(:vbii, object.id)
    else
       object.votes.where(user_id: scope.id).first
     end
  end

  def action_descriptor
    @participation_context_service = @instance_options[:pcs] || ParticipationContextService.new
    commenting_disabled_reason = @participation_context_service.commenting_disabled_reason_for_idea(object, current_user)
    voting_disabled_reason = @participation_context_service.voting_disabled_reason_for_idea(object, current_user)
    cancelling_votes_disabled_reason = @participation_context_service.cancelling_votes_disabled_reason(object, current_user)
    budgeting_disabled_reason = @participation_context_service.budgeting_disabled_reason(object, current_user)
    {
      voting: {
        enabled: !voting_disabled_reason,
        disabled_reason: voting_disabled_reason,
        future_enabled: voting_disabled_reason && @participation_context_service.future_voting_enabled_phase(object.project, current_user)&.start_at,
        cancelling_enabled: !cancelling_votes_disabled_reason
      },
      commenting: {
        enabled: !commenting_disabled_reason,
        disabled_reason: commenting_disabled_reason,
        future_enabled: commenting_disabled_reason && @participation_context_service.future_commenting_enabled_phase(object.project, current_user)&.start_at
      },
      budgeting: {
        enabled: !budgeting_disabled_reason,
        disabled_reason: budgeting_disabled_reason,
        future_enabled: budgeting_disabled_reason && @participation_context_service.future_budgeting_enabled_phase(object.project, current_user)&.start_at
      }
    }
  end
end
