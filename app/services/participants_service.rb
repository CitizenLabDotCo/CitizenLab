class ParticipantsService

  def participants options={}
    project = options[:project]
    since = options[:since]
    if project
      ideas = Idea.where(project: project)
      comments = Comment.where(idea_id: ideas)
      votes = Vote.where(votable_id: ideas).or(Vote.where(votable_id: comments))
      baskets = Basket.submitted.where(participation_context_id: [project.id, *project.phases.ids])
      if since
        ideas = ideas.where('created_at::date >= (?)::date', since)
        comments = comments.where('created_at::date >= (?)::date', since)
        votes = votes.where('created_at::date >= (?)::date', since)
        baskets = baskets.where('created_at::date >= (?)::date', since)
      end
      User
        .where(id: ideas.select(:author_id))
        .or(User.where(id: comments.select(:author_id)))
        .or(User.where(id: votes.select(:user_id)))
        .or(User.where(id: baskets.select(:user_id)))
    else
      users = User
        .joins(:activities)
        .group('users.id')
      if since
        users.where("activities.acted_at::date >= ?", since)
      else
        users
      end
    end
  end


  ENGAGING_ACTIVITIES = [
    {item_type: 'Comment', action: 'created', score: 3},
    {item_type: 'Idea', action: 'published', score: 5},
    {item_type: 'Vote', action: 'idea_upvoted', score: 1},
    {item_type: 'Vote', action: 'idea_downvoted', score: 1},
    {item_type: 'Vote', action: 'comment_upvoted', score: 1},
    {item_type: 'Vote', action: 'comment_downvoted', score: 1},
    {item_type: 'Basket', action: 'created', score: 3},
  ]

  # Adapts the passed activities_scope to only take into account activities
  # that should truly be taken into account as actual activity generated by
  # the user. E.g. Creating a vote is a truly engaging activity, whereas
  # receiving project moderation rights is not
  def filter_engaging_activities activities_scope
    output = activities_scope
    ENGAGING_ACTIVITIES.each.with_index do |activity, i|
      if i == 0
        output = output.where(item_type: activity[:item_type], action: activity[:action])
      else
        output = output.or(
          activities_scope.where(item_type: activity[:item_type], action: activity[:action]))
      end
    end
    output
  end

  # Adds a `score` field to the results, indicating the engagement score for the activity
  def with_engagement_scores activities_scope
    activities_scope
      .select("""(CASE 
        #{ENGAGING_ACTIVITIES.map do |activity|
          "WHEN item_type = '#{activity[:item_type]}' AND action = '#{activity[:action]}' THEN #{activity[:score]}" 
          end.join(" ")
        }
      ELSE 0 END) as score""")
  end

end