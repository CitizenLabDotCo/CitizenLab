class Page < ApplicationRecord

  belongs_to :project, optional: true

  has_many :page_links, -> { order(:ordering) }, foreign_key: :linking_page_id, dependent: :destroy
  has_many :linked_pages, through: :page_links, source: :linked_page
  has_many :text_images, as: :imageable, dependent: :destroy
  has_many :page_files, -> { order(:ordering) }, dependent: :destroy

  PUBLICATION_STATUSES = %w(draft published)

  validates :title_multiloc, :body_multiloc, presence: true, multiloc: {presence: true}
  validates :slug, presence: true, uniqueness: true, format: {with: SlugService.new.regex }
  validates :publication_status, presence: true, inclusion: {in: PUBLICATION_STATUSES}

  before_validation :generate_slug, on: :create
  before_validation :set_publication_status, on: :create
  before_validation :strip_title

  scope :published, -> {where publication_status: 'published'}
  scope :draft, -> {where publication_status: 'draft'}

  def published?
    publication_status == 'published'
  end

  private

  def generate_slug
    self.slug ||= SlugService.new.generate_slug self, self.title_multiloc.values.first
  end

  def set_publication_status
    self.publication_status ||= 'published'
  end

  def strip_title
    self.title_multiloc.each do |key, value|
      self.title_multiloc[key] = value.strip
    end
  end

end
