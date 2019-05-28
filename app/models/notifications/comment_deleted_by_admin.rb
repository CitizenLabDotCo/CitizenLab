module Notifications
  class CommentDeletedByAdmin < Notification

    REASON_CODES = %w(irrelevant inappropriate other)

    
    belongs_to :initiating_user, class_name: 'User'
    belongs_to :comment
    belongs_to :idea
    belongs_to :project, optional: true

    validates :comment_id, presence: true
    validates :initiating_user, presence: true
    validates :reason_code, inclusion: { in: REASON_CODES }, presence: true


    ACTIVITY_TRIGGERS = {'Comment' => {'marked_as_deleted' => true}}
    EVENT_NAME = 'Comment deleted by admin'
    

    def self.make_notifications_on activity
      comment = activity.item
      recipient_id = comment&.author_id

      comment_id = comment&.id
      idea = (comment&.post_type == 'Idea') && comment&.post
      idea_id = idea&.id
      initiator_id = activity.user_id
      project_id = idea&.project_id

      if comment_id && recipient_id && initiator_id && (recipient_id != initiator_id)
        [self.create!(
           recipient_id: recipient_id,
           initiating_user: User.find(initiator_id),
           idea_id: idea_id,
           comment_id: comment_id,
           project_id: project_id,
           reason_code: activity.payload["reason_code"],
           other_reason: activity.payload["other_reason"]
         )]
      else
        []
      end
    end

  end
end

