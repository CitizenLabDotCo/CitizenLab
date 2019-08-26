module EmailCampaigns
  class Campaigns::StatusChangeOfYourIdea < Campaign
    include Consentable
    include ActivityTriggerable
    include RecipientConfigurable
    include Disableable
    include Trackable
    include LifecycleStageRestrictable
    allow_lifecycle_stages only: ['active']

    recipient_filter :filter_recipient

    def activity_triggers
      {'Notifications::StatusChangeOfYourIdea' => {'created' => true}}
    end

    def filter_recipient users_scope, activity:, time: nil
      users_scope
        .where(id: activity.item.post.votes.pluck(:user_id))
        .where.not(id: activity.item.post.author_id)
        .where.not(id: activity.item.post.comments.pluck(:author_id))
    end

    def generate_commands recipient:, activity: 
      idea = activity.item.post
      status = idea.idea_status
      [{
        event_payload: {
          post_id: idea.id,
          post_title_multiloc: idea.title_multiloc,
          post_body_multiloc: idea.body_multiloc,
          post_url: Frontend::UrlService.new.model_to_url(idea, locale: recipient.locale),
          post_images: idea.idea_images.map{ |image|
            {
              ordering: image.ordering,
              versions: image.image.versions.map{|k, v| [k.to_s, v.url]}.to_h
            }
          },
          idea_status_id: status.id,
          idea_status_title_multiloc: status.title_multiloc,
          idea_status_code: status.code,
          idea_status_color: status.color
        }
      }]
    end
  end
end