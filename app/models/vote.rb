class Vote < ApplicationRecord
  MODES = %w(up down)

  belongs_to :votable, polymorphic: true
  counter_culture :votable, column_name: proc {|model| "#{model.mode}votes_count" }
  belongs_to :user

  validates :votable, :mode, presence: true
  validates :mode, inclusion: { in: MODES }
  # validates :user_id, uniqueness: {scope: [:votable_id, :votable_type, :mode]}

  scope :up, -> {where mode: 'up'}
  scope :down, -> {where mode: 'down'}


  def up?
    self.mode == 'up'
  end

  def down?
    self.mode == 'down'
  end
end
