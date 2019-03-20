module EmailCampaigns
  class Campaigns::IdeaMarkedAsSpam < Campaigns::NotificationCampaign
    include Consentable
    include ActivityTriggerable
    include RecipientConfigurable
    include Disableable

    recipient_filter :filter_notification_recipient

    def self.consentable_roles
      ['admin', 'project_moderator']
    end

    def activity_triggers
      {'Notifications::IdeaMarkedAsSpam' => {'created' => true}}
    end
  end
end