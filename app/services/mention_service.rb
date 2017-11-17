class MentionService

  def mention_to_slug mention
    mention[1..-1]
  end

  def user_to_mention user
    "@#{user.slug}"
  end

  def extract_mentions text
    full_mentions = text.scan(/(@\w+-[\w-]+)/).flatten
    full_mentions.map do |fm|
      mention_to_slug(fm)
    end
  end

  def extract_expanded_mention_users text
    doc = Nokogiri::HTML.fragment(text)
    expanded_mentions = doc.css("span.cl-mention-user")
    user_ids = expanded_mentions.map do |mention|
      mention.attr('data-user-id')
    end
    User.where(id: user_ids.uniq)
  end

  def remove_expanded_mentions text
    doc = Nokogiri::HTML.fragment(text)
    expanded_mentions = doc.css("span.cl-mention-user")
    expanded_mentions.each{|el| el.replace(el.inner_html)}
    doc.to_s
  end

  def add_span_around text, mention, user_id, user_slug
    text.gsub(/#{mention}/i, "<span class=\"cl-mention-user\" data-user-id=\"#{user_id}\" data-user-slug=\"#{user_slug}\">#{mention}</span>")
  end

  def process_mentions text
    users_mentioned_before = extract_expanded_mention_users(text)

    cleaned_text = remove_expanded_mentions(text)

    mention_candidates = extract_mentions(cleaned_text)

    return [text, []] if mention_candidates.empty?

    users_mentioned_now = User.where(slug: mention_candidates)
    new_users_mentioned = users_mentioned_now.map(&:id) - users_mentioned_before.map(&:id)

    new_text = users_mentioned_now.all.inject(cleaned_text) do |memo, user|
      add_span_around(memo, user_to_mention(user), user.id, user.slug)
    end

    [new_text, new_users_mentioned]
  end

  def extract_mentioned_users text
    mentions = extract_mentions(text)
    User.where(slug: mentions)
  end

  def new_mentioned_users old_text, new_text
    old_users = extract_expanded_mention_users(old_text).all
    new_users = extract_expanded_mention_users(new_text).all
    new_users - old_users
  end

  def users_from_idea slug, idea, limit
    author = idea.author
    commenters = User
      .joins(:comments)
      .where("users.slug LIKE ?", "#{slug}%")
      .where(comments: {idea_id: idea.id})
      .limit(limit)
    [author, *commenters].uniq
  end

end