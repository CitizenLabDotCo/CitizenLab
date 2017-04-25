class Vote < ApplicationRecord
  MODES = %w(up down)

  belongs_to :votable, polymorphic: true
  counter_culture :votable, column_name: proc {|model| "#{model.mode}votes_count" }
  belongs_to :user

  enum mode: MODES

  validates :mode, inclusion: { in: MODES }
  validates :user_id, uniqueness: {scope: [:votable_id, :votable_type]}
end
