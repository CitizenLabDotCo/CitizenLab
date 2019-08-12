module Notifications
  class OfficialFeedbackOnCommentedInitiative < Notification
    
    belongs_to :initiating_user, class_name: 'User'
    belongs_to :official_feedback
    belongs_to :initiative
    belongs_to :project, optional: true

    validates :official_feedback, presence: true
    validates :initiating_user, presence: true
    validates :initiative, presence: true


    ACTIVITY_TRIGGERS = {'OfficialFeedback' => {'created' => true}}
    EVENT_NAME = 'Official feedback on commented initiative'
    

    def self.make_notifications_on activity
      official_feedback = activity.item
      initiator_id = official_feedback.user_id

      if official_feedback.post_type == 'Initiative' && initiator_id
        User.active
          .joins(:comments).merge(Comment.published)
          .where(comments: {post: official_feedback.post})
          .distinct
          .ids
          .select{|recipient_id| recipient_id != initiator_id && recipient_id != official_feedback.post.author_id}
          .map do |recipient_id|
            self.new(
              recipient_id: recipient_id,
              initiating_user_id: initiator_id,
              initiative: official_feedback.post,
              official_feedback: official_feedback
            )
          end
      else
        []
      end.compact
    end

  end
end
