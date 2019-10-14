class WebApi::V1::Notifications::MentionInOfficialFeedbackSerializer < WebApi::V1::Notifications::NotificationSerializer
  attribute :post_type

  attribute :initiating_user_first_name do |object|
    object.initiating_user&.first_name
  end

  attribute :initiating_user_last_name do |object|
    object.initiating_user&.last_name
  end

  attribute :initiating_user_slug do |object|
    object.initiating_user&.slug
  end

  attribute :official_feedback_author do |object|
    object.official_feedback&.author_multiloc
  end

  attribute :post_title_multiloc do |object|
    object.post&.title_multiloc
  end

  attribute :post_slug do |object|
    object.post&.slug
  end
end
