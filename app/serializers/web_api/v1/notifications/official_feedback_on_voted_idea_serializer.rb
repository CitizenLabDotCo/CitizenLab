class WebApi::V1::Notifications::OfficialFeedbackOnVotedIdeaSerializer < WebApi::V1::Notifications::NotificationSerializer

  belongs_to :initiating_user, serializer: WebApi::V1::UserSerializer
  belongs_to :idea, serializer: WebApi::V1::IdeaSerializer
  belongs_to :official_feedback, serializer: WebApi::V1::OfficialFeedbackSerializer  
  belongs_to :project, serializer: WebApi::V1::ProjectSerializer

  attributes :initiating_user_first_name, :initiating_user_last_name, :initiating_user_slug, :idea_title


  def initiating_user_first_name
    object.initiating_user&.first_name
  end

  def initiating_user_last_name
    object.initiating_user&.last_name
  end

  def initiating_user_slug
    object.initiating_user&.slug
  end

  def idea_title
    object.idea&.title_multiloc
  end

end
