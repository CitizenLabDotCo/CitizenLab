module EmailCampaigns
  class Campaigns::ProjectPhaseUpcoming < Campaigns::NotificationCampaign
    include Consentable
    include ActivityTriggerable
    include RecipientConfigurable

    recipient_filter :filter_notification_recipient

    def activity_triggers
      {'Notifications::ProjectPhaseUpcoming' => {'created' => true}}
    end
  end
end