module EmailCampaigns
  class Campaigns::NewCommentOnCommentedIdea < Campaign
    include ActivityTriggerable
    include RecipientConfigurable
    include Disableable

    recipient_filter :filter_recipient


    def activity_triggers
      {'Comment' => {'created' => true}}
    end

    def filter_recipient users_scope, activity:, time: nil
      users_scope = users_scope
        .where(id: activity.item.idea.comments.pluck(:author_id))
        .where.not(id: activity.item.author_id)
        .where.not(id: activity.item.idea.author_id)
      if activity.item.parent
        users_scope = users_scope
          .where.not(id: activity.item.parent.author_id)
      end
      users_scope
    end

    def generate_commands recipient:, activity: 
      comment = activity.item
      [{
        event_payload: {
          comment: {
            id: comment.id,
            body_multiloc: comment.body_multiloc,
            url: FrontendService.new.model_to_url(comment, locale: recipient.locale)
          }
        }
      }]
    end


    protected

    def set_enabled
      self.enabled = false if self.enabled.nil?
    end
  end
end