class SideFxCommentService

  include SideFxHelper

  @@mention_service = MentionService.new

  def before_create comment, user

    comment.body_multiloc = comment.body_multiloc.map do |locale, body|
      new_body, users = @@mention_service.process_mentions(body)
      [locale, new_body]
    end.to_h
  end

  def after_create comment, user
    LogActivityJob.perform_later(comment, 'created', user, comment.created_at.to_i)
    
    mentioned_users = comment.body_multiloc.flat_map do |locale, body|
      @@mention_service.extract_expanded_mention_users(body)
    end


    mentioned_users.uniq.each do |mentioned_user|
      LogActivityJob.perform_later(comment, 'mentioned', user, comment.created_at.to_i, payload: {mentioned_user: mentioned_user.id})
    end
  end

  def before_update comment, user
    if comment.body_multiloc_changed?
      comment.body_multiloc = comment.body_multiloc.map do |locale, body|
        new_body, new_mentioned_users = @@mention_service.process_mentions(body)
        [locale, new_body]
      end.to_h
    end
  end

  def after_update comment, user
    if comment.body_multiloc_previously_changed?
      old_body_multiloc, new_body_multiloc = comment.body_multiloc_previous_change
      LogActivityJob.perform_later(comment, 'changed', user, comment.updated_at.to_i)

      mentioned_users = new_body_multiloc.flat_map do |locale, new_body|
        old_body = old_body_multiloc[locale] || ""
        @@mention_service.new_mentioned_users(old_body, new_body)
      end

      mentioned_users.uniq.each do |mentioned_user|
        LogActivityJob.perform_later(comment, 'mentioned', user, comment.created_at.to_i, payload: {mentioned_user: mentioned_user.id})
      end
    end
  end

  def before_destroy comment, user

  end

  def after_destroy frozen_comment, user
    serialized_comment = clean_time_attributes(frozen_comment.attributes)
    LogActivityJob.perform_later(encode_frozen_resource(frozen_comment), 'deleted', user, Time.now.to_i, payload: {comment: serialized_comment})
  end

end