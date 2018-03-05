class SideFxVoteService
  include SideFxHelper

  def before_create vote, current_user
    check_voting_allowed(vote, vote.user)
  end

  def after_create vote, current_user
    type = votable_type(vote)
    LogActivityJob.perform_later(vote, "#{type}_#{vote.mode}voted", current_user, vote.created_at.to_i)
  end

  def before_destroy vote, current_user
    check_cancelling_votes_allowed(vote, vote.user)
  rescue ClErrors::TransactionError => error
    raise error unless vote.down? && error.error_key == VOTING_DISABLED_REASONS[:voting_limited_max_reached]
  end

  def after_destroy frozen_vote, current_user
    serialized_vote = clean_time_attributes(frozen_vote.attributes)
    type = votable_type(frozen_vote)
    LogActivityJob.perform_later(
      encode_frozen_resource(frozen_vote), 
      "canceled_#{type}_#{frozen_vote.mode}vote", 
      current_user, 
      Time.now.to_i, 
      payload: {vote: serialized_vote}
    )
  end



  private


  def check_voting_allowed vote, user
    pcs = ParticipationContextService.new

    idea = vote.votable
    if idea
      disallowed_reason = pcs.voting_disabled_reason(idea, user)
      if disallowed_reason
        raise ClErrors::TransactionError.new(error_key: disallowed_reason)
      end
    end
  end

  def check_cancelling_votes_allowed vote, user
    pcs = ParticipationContextService.new

    idea = vote.votable
    if idea
      disallowed_reason = pcs.cancelling_votes_disabled_reason(idea, user)
      if disallowed_reason
        raise ClErrors::TransactionError.new(error_key: disallowed_reason)
      end
    end
  end

  def votable_type vote
    vote.votable_type.underscore
  end
end