class Group < ApplicationRecord
  include EmailCampaigns::GroupDecorator

  has_many :groups_projects, dependent: :destroy
  has_many :projects, through: :groups_projects
  has_many :memberships, dependent: :destroy
  has_many :users, through: :memberships
  private :memberships, :memberships=, :membership_ids, :membership_ids=
  private :users, :users=, :user_ids, :user_ids=
  has_many :groups_permissions, dependent: :destroy
  has_many :permissions, through: :groups_permissions

  validates :title_multiloc, presence: true, multiloc: { presence: true }
  validates :slug, uniqueness: true, presence: true
  validates :membership_type, presence: true, inclusion: { in: proc { membership_types } }

  before_validation :generate_slug, on: :create
  before_validation :set_membership_type, on: :create
  before_validation :strip_title

  scope :order_new, ->(direction = :desc) { order(created_at: direction) }

  def member?(user)
    users.exists?(id: user.id)
  end

  def add_member(user)
    users << user
  end

  def remove_member(user)
    users.delete user
  end

  def members
    users
  end

  def members=(*args)
    self.users = *args
  end

  def member_ids
    user_ids
  end

  def member_ids=(*args)
    self.user_ids = *args
  end

  def manual?
    membership_type == 'manual'
  end

  # The manual? case is covered by counter_culture in membership.rb
  def update_memberships_count!; end

  private

  def membership_types
    %w[manual]
  end

  def generate_slug
    slug_service = SlugService.new
    self.slug ||= slug_service.generate_slug self, title_multiloc.values.first
  end

  def set_membership_type
    self.membership_type ||= 'manual'
  end

  def strip_title
    title_multiloc.each do |key, value|
      title_multiloc[key] = value.strip
    end
  end
end

Group.prepend_if_ee('SmartGroups::Patches::Group')
Group.include_if_ee('SmartGroups::Extensions::Group')
