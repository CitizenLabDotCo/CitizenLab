class StatVotePolicy < ApplicationPolicy

  def votes_count?
    user&.active? && user.admin?
  end

  def votes_by_birthyear?
    user&.active? && user.admin?
  end

  def votes_by_domicile?
    user&.active? && user.admin?
  end

  def votes_by_education?
    user&.active? && user.admin?
  end

  def votes_by_gender?
    user&.active? && user.admin?
  end

  def votes_by_custom_field?
    user&.active? && user.admin?
  end

  def votes_by_time?
    user&.active? && user.admin?
  end

  def votes_by_time_cumulative?
    user&.active? && user.admin?
  end

  def votes_by_topic?
    user&.active? && user.admin?
  end

  def votes_by_project?
    user&.active? && user.admin?
  end
end
