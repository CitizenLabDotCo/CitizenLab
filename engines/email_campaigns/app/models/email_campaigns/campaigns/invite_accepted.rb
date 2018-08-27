module EmailCampaigns
  class Campaigns::InviteAccepted < Campaigns::NotificationCampaign
  	include Disableable
    include Consentable
    include ActivityTriggerable
    include RecipientConfigurable

    recipient_filter :filter_notification_recipient

    def activity_triggers
      {'Notifications::InviteAccepted' => {'created' => true}}
    end
  end
end