# frozen_string_literal: true

#
# Mixin for user participation in a model.
#
# ==== Usage (models only)
#
#     include ParticipationContext
#
module ParticipationContext
  extend ActiveSupport::Concern
  include Surveys::SurveyParticipationContext
  include Polls::PollParticipationContext
  include Volunteering::VolunteeringParticipationContext

  PARTICIPATION_METHODS = %w[information ideation survey budgeting poll volunteering].freeze
  VOTING_METHODS = %w[unlimited limited].freeze
  PRESENTATION_MODES = %w[card map].freeze
  IDEAS_ORDERS = %i[trending random most_voted most_recent oldest].freeze

  included do
    has_many :baskets, as: :participation_context, dependent: :destroy
    has_many :permissions, as: :permission_scope, dependent: :destroy
    enum ideas_order: IDEAS_ORDERS

    # for timeline projects, the phases are the participation contexts, so nothing applies
    with_options unless: :timeline_project? do
      validate :ideas_allowed_in_participation_method
      validates :participation_method, presence: true, inclusion: { in: PARTICIPATION_METHODS }
      validates :voting_enabled, boolean: true
      validates :posting_enabled, boolean: true
      validates :presentation_mode, presence: true, inclusion: { in: PRESENTATION_MODES }
      validates :voting_method, presence: true, inclusion: { in: VOTING_METHODS }
      validates :voting_limited_max,
                presence: true,
                numericality: { only_integer: true, greater_than: 0 },
                if: %i[ideation? voting_limited?]

      with_options if: :ideation? do
        validates :commenting_enabled, boolean: true
        validates :ideas_order, presence: true, inclusion: { in: IDEAS_ORDERS }
      end

      with_options if: :budgeting? do
        validates :max_budget, presence: true
        validates :commenting_enabled, boolean: true
      end

      before_validation :set_participation_method, on: :create
      before_validation :set_presentation_mode, on: :create
    end
  end

  def ideation?
    participation_method == 'ideation'
  end

  def information?
    participation_method == 'information'
  end

  def budgeting?
    participation_method == 'budgeting'
  end

  def can_contain_ideas?
    ideation? || budgeting?
  end

  def voting_limited?
    voting_method == 'limited'
  end

  def voting_unlimited?
    voting_method == 'unlimited'
  end

  def votes
    Vote.where(votable: ideas)
  end

  def participation_context?
    !timeline_project?
  end

  private

  def timeline_project?
    self.class == Project && timeline?
  end

  def set_participation_method
    self.participation_method ||= 'ideation'
  end

  def set_presentation_mode
    self.presentation_mode ||= 'card'
  end

  def ideas_allowed_in_participation_method
    return unless !can_contain_ideas? && ideas.present?

    errors.add(
      :base,
      :cannot_contain_ideas,
      ideas_count: ideas.size,
      message: 'cannot contain ideas with the current participation context'
    )
  end
end
