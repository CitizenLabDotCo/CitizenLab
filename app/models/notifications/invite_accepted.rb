module Notifications
  class InviteAccepted < Notification
    
    belongs_to :initiating_user, class_name: 'User'
    belongs_to :invite

    validates :initiating_user, presence: true
    validates :invite, presence: true


    ACTIVITY_TRIGGERS = {'Invite' => {'accepted' => true}}
    EVENT_NAME = 'Invite accepted'
    

    def self.make_notifications_on activity
      invite = activity.item
      recipient_id = invite&.inviter_id
      initiator_id = invite&.invitee_id

      if invite_id && recipient_id && initiator_id
        [self.new(
           recipient_id: recipient_id,
           initiating_user_id: initiator_id,
           invite: invite
         )]
      else
        []
      end
    end

  end
end

