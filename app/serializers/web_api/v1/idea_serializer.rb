class WebApi::V1::IdeaSerializer < WebApi::V1::BaseSerializer
  attributes :title_multiloc, :body_multiloc, :author_name, :slug, :publication_status, :upvotes_count, :downvotes_count, :comments_count, :official_feedbacks_count, :location_point_geojson, :location_description, :created_at, :updated_at, :published_at, :budget, :baskets_count

  attribute :action_descriptor do |object, params|
    @participation_context_service = params[:pcs] || ParticipationContextService.new
    commenting_disabled_reason = @participation_context_service.commenting_disabled_reason_for_idea(object, current_user(params))
    voting_disabled_reason = @participation_context_service.voting_disabled_reason_for_idea(object, current_user(params))
    cancelling_votes_disabled_reason = @participation_context_service.cancelling_votes_disabled_reason_for_idea(object, current_user(params))
    budgeting_disabled_reason = @participation_context_service.budgeting_disabled_reason_for_idea(object, current_user(params))
    comment_voting_disabled_reason = @participation_context_service.voting_disabled_reason_for_comment(Comment.new(idea: object), current_user(params))

    {
      commenting: {
        enabled: !commenting_disabled_reason,
        disabled_reason: commenting_disabled_reason,
        future_enabled: commenting_disabled_reason && @participation_context_service.future_commenting_enabled_phase(object.project, current_user(params))&.start_at
      },
      voting: {
        enabled: !voting_disabled_reason,
        disabled_reason: voting_disabled_reason,
        future_enabled: voting_disabled_reason && @participation_context_service.future_voting_enabled_phase(object.project, current_user(params))&.start_at,
        cancelling_enabled: !cancelling_votes_disabled_reason
      },   
      comment_voting: {
        enabled: !comment_voting_disabled_reason,
        disabled_reason: comment_voting_disabled_reason,
        future_enabled: comment_voting_disabled_reason && @participation_context_service.future_comment_voting_enabled_phase(object.project, current_user(params))&.start_at
      },
      budgeting: {
        enabled: !budgeting_disabled_reason,
        disabled_reason: budgeting_disabled_reason,
        future_enabled: budgeting_disabled_reason && @participation_context_service.future_budgeting_enabled_phase(object.project, current_user(params))&.start_at
      }
    }
  end

  has_many :topics
  has_many :areas
  has_many :idea_images, serializer: WebApi::V1::ImageSerializer
  has_many :phases

  belongs_to :author, record_type: :user, serializer: WebApi::V1::UserSerializer
  belongs_to :project
  belongs_to :idea_status
  belongs_to :assignee, if: Proc.new { |object, params|
    can_moderate? object, params
  }, record_type: :user, serializer: WebApi::V1::UserSerializer

  has_one :user_vote, if: Proc.new { |object, params|
    signed_in? object, params
  }, record_type: :vote, serializer: WebApi::V1::VoteSerializer do |object, params|
    cached_user_vote object, params
  end

  def self.can_moderate? object, params
    ProjectPolicy.new(current_user(params), object.project).moderate?
  end

  def self.cached_user_vote object, params
    if params[:vbii]
      params.dig(:vbii, object.id)
    else
       object.votes.where(user_id: current_user(params)&.id).first
     end
  end
end
