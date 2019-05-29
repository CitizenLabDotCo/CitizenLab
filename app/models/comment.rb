class Comment < ApplicationRecord
  acts_as_nested_set dependent: :destroy, counter_cache: :children_count

  belongs_to :author, class_name: 'User'

  belongs_to :post, polymorphic: true
  counter_culture :post, 
    column_name: proc {|model| model.published? ? 'comments_count' : nil },
    column_names: {
      ["comments.publication_status = ?", "published"] => "comments_count"
    },
    touch: true

  # After https://stackoverflow.com/a/16124295/3585671
  belongs_to :idea, -> { joins(:comments).where(comments: {post_type: 'Idea'}) }, foreign_key: 'post_id', optional: true, class_name: 'Idea'
  def idea
    return unless post_type == 'Idea'
    super
  end
  belongs_to :initiative, -> { joins(:comments).where(comments: {post_type: 'Initiative'}) }, foreign_key: 'post_id', optional: true, class_name: 'Initiative'
  def initiative
    return unless post_type == 'Initiative'
    super
  end

  # counter_culture [:idea, :project],
  #   column_name: proc {|model| model.published? ? 'comments_count' : nil },
  #   column_names: {
  #     ["comments.publication_status = ?", "published"] => "comments_count"
  #   },
  #   touch: true

  has_many :votes, as: :votable, dependent: :destroy
  has_many :upvotes, -> { where(mode: "up") }, as: :votable, class_name: 'Vote'
  has_many :downvotes, -> { where(mode: "down") }, as: :votable, class_name: 'Vote'
  has_one :user_vote, -> (user_id) {where(user_id: user_id)}, as: :votable, class_name: 'Vote'

  has_many :spam_reports, as: :spam_reportable, class_name: 'SpamReport', dependent: :destroy
  has_many :notifications, foreign_key: :comment_id, dependent: :nullify

  PUBLICATION_STATUSES = %w(published deleted)

  validates :body_multiloc, presence: true, multiloc: {presence: true}
  validates :author_name, presence: true
  validates :author, presence: true, on: :create
  validates :publication_status, presence: true, inclusion: {in: PUBLICATION_STATUSES}

  before_validation :set_author_name, :set_publication_status, on: :create
  before_validation :sanitize_body_multiloc

  scope :published, -> {where publication_status: 'published'}
  
  def set_author_name
    self.author_name = self.author.display_name if self.author
  end

  def published?
    self.publication_status == 'published'
  end

  private

  def set_publication_status
    self.publication_status ||= 'published'
  end

  def sanitize_body_multiloc
    service = SanitizationService.new
    self.body_multiloc = service.sanitize_multiloc(
      self.body_multiloc,
      %i{mention}
    )
    self.body_multiloc = service.remove_empty_paragraphs_multiloc(self.body_multiloc)
    self.body_multiloc = service.linkify_multiloc(self.body_multiloc)

  end
end
