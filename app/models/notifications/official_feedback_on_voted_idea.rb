module Notifications
  class OfficialFeedbackOnVotedIdea < Notification
    
    belongs_to :initiating_user, class_name: 'User'
    belongs_to :official_feedback
    belongs_to :idea
    belongs_to :project, optional: true

    validates :official_feedback_id, presence: true
    validates :initiating_user, presence: true
    validates :idea_id, presence: true


    ACTIVITY_TRIGGERS = {'OfficialFeedback' => {'created' => true}}
    EVENT_NAME = 'Official feedback on voted idea'
    

    def self.make_notifications_on activity
      official_feedback = activity.item

      official_feedback_id = official_feedback&.id
      idea = official_feedback&.idea
      idea_id = official_feedback&.idea_id
      initiator_id = official_feedback&.user_id
      project_id = idea&.project_id

      if official_feedback_id && idea_id && recipient_id && initiator_id
        comment_author_ids = idea.comments.pluck(:author_id)
        idea.votes.pluck(&:user_id).map do |recipient_id|
          if (recipient_id != initiator_id) && !(comment_author_ids + [idea.author_id]).include?(recipient_id)
            self.create(
              recipient_id: recipient_id,
              initiating_user: User.find(initiator_id),
              idea_id: idea_id,
              official_feedback_id: official_feedback_id,
              project_id: project_id
              )
          end
        end
      else
        []
      end.compact
    end

  end
end

