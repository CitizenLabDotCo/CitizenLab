class WebApi::V1::Fast::Notifications::CommentOnYourCommentSerializer < WebApi::V1::Fast::Notifications::NotificationSerializer

  # belongs_to :initiating_user, serializer: WebApi::V1::UserSerializer
  # belongs_to :idea, serializer: WebApi::V1::IdeaSerializer
  # belongs_to :comment, serializer: WebApi::V1::CommentSerializer  
  # belongs_to :project, serializer: WebApi::V1::ProjectSerializer

  # attributes :initiating_user_first_name, :initiating_user_last_name, :initiating_user_slug, :idea_title


  # def initiating_user_first_name
  #   object.initiating_user&.first_name
  # end

  # def initiating_user_last_name
  #   object.initiating_user&.last_name
  # end

  # def initiating_user_slug
  #   object.initiating_user&.slug
  # end

  attribute :idea_title do |object|
    object.idea&.title_multiloc
  end

end
