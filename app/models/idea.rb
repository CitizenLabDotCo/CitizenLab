class Idea < ApplicationRecord
  include PgSearch

  pg_search_scope :search_by_all, 
    :against => [:title_multiloc, :body_multiloc, :author_name],
    :using => { :tsearch => {:prefix => true} }

  belongs_to :project, optional: true
  counter_culture :project
  belongs_to :author, class_name: 'User', optional: true
  has_many :ideas_topics#, dependent: :destroy
  # has_many :topics, through: :ideas_topics
  has_and_belongs_to_many :topics
  has_many :areas_ideas#, dependent: :destroy
  # has_many :areas, through: :areas_ideas
  has_and_belongs_to_many :areas
  has_many :comments, dependent: :destroy
  has_many :votes, as: :votable, dependent: :destroy
  has_many :upvotes, -> { where(mode: "up") }, as: :votable, class_name: 'Vote'
  has_many :downvotes, -> { where(mode: "down") }, as: :votable, class_name: 'Vote'
  has_one :user_vote, -> (user_id) {where(user_id: user_id)}, as: :votable, class_name: 'Vote'
  belongs_to :idea_status
  has_many :activities, as: :item

  has_many :idea_images, -> { order(:ordering) }, dependent: :destroy
  has_many :idea_files, -> { order(:ordering) }, dependent: :destroy
  has_many :spam_reports, as: :spam_reportable, class_name: 'SpamReport', dependent: :destroy

  PUBLICATION_STATUSES = %w(draft published closed spam)
  validates :title_multiloc, presence: true, multiloc: {presence: true}
  validates :body_multiloc, presence: true, multiloc: {presence: true}, unless: :draft?
  validates :publication_status, presence: true, inclusion: {in: PUBLICATION_STATUSES}
  validates :author, presence: true, unless: :draft?, on: :create
  validates :author_name, presence: true, unless: :draft?
  validates :idea_status, presence: true, unless: :draft?
  validates :slug, uniqueness: true, format: {with: SlugService.new.regex }

  before_validation :generate_slug, on: :create
  before_validation :set_author_name
  before_validation :set_idea_status, on: :create
  after_validation :set_published_at, if: ->(idea){ idea.published? && idea.publication_status_changed? }

  scope :with_all_topics, (Proc.new do |topic_ids|
    uniq_topic_ids = topic_ids.uniq
    joins(:ideas_topics)
    .where(ideas_topics: {topic_id: uniq_topic_ids})
    .group(:id).having("COUNT(*) = ?", uniq_topic_ids.size)
  end)

  scope :with_some_topics, (Proc.new do |topic_ids|
    joins(:ideas_topics)
      .where(ideas_topics: {topic_id: topic_ids})
  end)

  scope :with_all_areas, (Proc.new do |area_ids|
    uniq_area_ids = area_ids.uniq
    joins(:areas_ideas)
    .where(areas_ideas: {area_id: uniq_area_ids})
    .group(:id).having("COUNT(*) = ?", uniq_area_ids.size)
  end)

  scope :with_some_areas, (Proc.new do |area_ids|
    joins(:areas_ideas)
      .where(areas_ideas: {area_id: area_ids})
  end)

  scope :order_new, -> (direction=:desc) {order(published_at: direction)}
  scope :order_popular, -> (direction=:desc) {order("(upvotes_count - downvotes_count) #{direction}")}
  # based on https://medium.com/hacking-and-gonzo/how-hacker-news-ranking-algorithm-works-1d9b0cf2c08d
  TREND_NUM_UPVOTES = 5
  TREND_NUM_COMMENTS = 5
  TREND_SINCE_ACTIVITY = 10 * 24 * 60 * 60 # 10 days
  scope :order_trending, (Proc.new do |direction|
    direction ||= :desc
    order(<<~EOS
      (
       power(GREATEST(((upvotes_count - downvotes_count) + 10), 0.5), 0.3)
        /
        ABS(EXTRACT(epoch FROM (NOW() - published_at))/3600)
      ) #{direction}
    EOS
    )
  end)

  scope :order_status, -> (direction=:desc) {
    joins(:idea_status)
    .order("idea_statuses.ordering #{direction}")
  }

  scope :published, -> {where publication_status: 'published'}

  def order_trending_beta
    Idea.all.sort_by { |idea| idea.trending_score }
  end

  def location_point_geojson= geojson_point
    self.location_point = RGeo::GeoJSON.decode(geojson_point)
  end

  def draft?
    self.publication_status == 'draft'
  end

  def published?
    self.publication_status == 'published'
  end

  def score
    upvotes_count - downvotes_count
  end

  def trending_score_old
    [score+10,0.5].max**0.3 /
    ((Time.now - published_at).abs / 3600)
  end

  def trending_score
    if (upvotes_count - downvotes_count) < 0
      return 0.0
    end
    if idea_status.code == 'rejected'
      return 0.0
    end
    upvotes_ago = activity_ago upvotes
    comments_ago = activity_ago comments
    if [upvotes_ago.first, comments_ago.first].min > TREND_SINCE_ACTIVITY
      return 0.0
    end

    1.0 / ([upvotes_ago.first, comments_ago.first].min)
  end

  def activity_ago iteratables
    iteratables.map{ |obj| Time.now.to_i - obj.created_at.to_i }
               .sort
               .take_and_fill TREND_NUM_COMMENTS, (Time.now.to_i - published_at.to_i)
  end

  def take_and_fill arr, n, default
    taken = arr.take n
    fill = Array.new (n - taken.size), default
    taken.concat fill
  end

  def generate_slug
    if !self.slug
      title = MultilocService.new.t self.title_multiloc, self.author
      self.slug = SlugService.new.generate_slug self, title
    end
  end

  def set_author_name
    self.author_name ||= self.author.display_name if self.author
  end

  def set_idea_status
    self.idea_status ||= IdeaStatus.find_by!(code: 'proposed')
  end

  def set_published_at
    self.published_at ||= Time.now
  end

end
