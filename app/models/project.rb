class Project < ApplicationRecord

  DESCRIPTION_PREVIEW_JSON_SCHEMA = ERB.new(File.read(Rails.root.join('config', 'schemas', 'project_description_preview.json_schema.erb'))).result(binding)

  @@sanitizer = Rails::Html::WhiteListSanitizer.new

  mount_base64_uploader :header_bg, HeaderBgUploader


  has_many :ideas, dependent: :destroy
  has_and_belongs_to_many :topics
  has_and_belongs_to_many :areas
  has_many :phases, dependent: :destroy
  has_many :events, dependent: :destroy
  has_many :pages, dependent: :destroy
  has_many :project_images, -> { order(:ordering) }, dependent: :destroy
  has_many :project_files, -> { order(:ordering) }, dependent: :destroy
  has_many :groups_projects, dependent: :destroy
  has_many :groups, through: :groups_projects

  VISIBLE_TOS = %w(public groups admins)

  validates :title_multiloc, presence: true, multiloc: {presence: true}
  validates :description_multiloc, multiloc: {presence: false}
  validates :description_preview_multiloc, multiloc: {presence: false}
  validates :slug, presence: true, uniqueness: true, format: {with: SlugService.new.regex }
  validates :visible_to, presence: true, inclusion: {in: VISIBLE_TOS}
  validates :description_preview_multiloc, json: { 
    schema: DESCRIPTION_PREVIEW_JSON_SCHEMA, 
    message: ->(errors) { errors.map{|e| {fragment: e[:fragment], error: e[:failed_attribute], human_message: e[:message]} } },
    options: {
      errors_as_objects: true
    }
  }

  before_validation :generate_slug, on: :create
  before_validation :set_visible_to, on: :create
  before_validation :sanitize_description_preview_multiloc, if: :description_preview_multiloc
  before_validation :sanitize_description_multiloc, if: :description_multiloc


  scope :with_all_areas, (Proc.new do |area_ids|
    uniq_area_ids = area_ids.uniq
    joins(:areas)
    .where(areas: {id: uniq_area_ids})
    .group(:id).having("COUNT(*) = ?", uniq_area_ids.size)
  end)

  scope :with_all_topics, (Proc.new do |topic_ids|
    uniq_topic_ids = topic_ids.uniq
    joins(:topics)
    .where(topics: {id: uniq_topic_ids})
    .group(:id).having("COUNT(*) = ?", uniq_topic_ids.size)
  end)

  private

  def generate_slug
    slug_service = SlugService.new
    self.slug ||= slug_service.generate_slug self, self.title_multiloc.values.first
  end

  def sanitize_description_multiloc
    self.description_multiloc = self.description_multiloc.map do |locale, description|
      [locale, @@sanitizer.sanitize(description, tags: %w(p b u i em strong a h1 h2 h3 h4 h5 h6 ul li ol), attributes: %w(href type style))]
    end.to_h
  end

  def sanitize_description_preview_multiloc
    self.description_preview_multiloc = self.description_preview_multiloc.map do |locale, description_preview|
      [locale, @@sanitizer.sanitize(description_preview, tags: %w(), attributes: %w())]
    end.to_h
  end

  def set_visible_to
    self.visible_to ||= 'public'
  end
end
