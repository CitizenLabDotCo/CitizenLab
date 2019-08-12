module EmailCampaigns
  class Campaigns::NewCommentOnVotedIdea < Campaign
    include ActivityTriggerable
    include Consentable
    include RecipientConfigurable
    include Disableable
    include LifecycleStageRestrictable
    include Trackable
    allow_lifecycle_stages only: ['active']

    recipient_filter :filter_recipient


    def activity_triggers
      {'Comment' => {'created' => true}}
    end

    def filter_recipient users_scope, activity:, time: nil
      users_scope
        .where(id: activity.item.post.votes.pluck(:user_id))
        .where.not(id: activity.item.author_id)
        .where.not(id: activity.item.post.author_id)
        .where.not(id: activity.item.post.comments.pluck(:author_id))
    end

    def generate_commands recipient:, activity: 
      comment = activity.item
      if comment.post_type == 'Idea'
        idea = comment.post
        author = comment.author
        [{
          event_payload: {
            comment: {
              id: comment.id,
              body_multiloc: comment.body_multiloc,
              url: Frontend::UrlService.new.model_to_url(comment, locale: recipient.locale),
              created_at: comment.created_at.iso8601
            },
            comment_author: {
              id: author.id,
              first_name: author.first_name,
              last_name: author.last_name,
              avatar_url: author.avatar_url
            },
            idea: {
              id: idea.id,
              title_multiloc: idea.title_multiloc,
              body_multiloc: idea.body_multiloc,
              url: Frontend::UrlService.new.model_to_url(idea, locale: recipient.locale),
              published_at: idea.published_at.iso8601,
              idea_images: idea.idea_images.map{ |image|
                {
                  ordering: image.ordering,
                  versions: image.image.versions.map{|k, v| [k.to_s, v.url]}.to_h
                }
              }
            }
          }
        }]
      else
        []
      end
    end

    def set_enabled
      self.enabled = false if self.enabled.nil?
    end

  end
end