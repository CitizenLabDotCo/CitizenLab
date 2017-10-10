class Group < ApplicationRecord
  has_many :groups_projects, dependent: :destroy
  has_many :projects, through: :groups_projects
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships

  validates :title_multiloc, presence: true, multiloc: {presence: true}
  validates :slug, uniqueness: true, format: {with: SlugService.new.regex }

  before_validation :generate_slug, on: :create


  def add_member user
    self.users << user
  end

  def remove_member user
    self.users.delete user
  end


  private

  def generate_slug
    slug_service = SlugService.new
    self.slug ||= slug_service.generate_slug self, self.title_multiloc.values.first # don't know if this should be unique?
  end
end
