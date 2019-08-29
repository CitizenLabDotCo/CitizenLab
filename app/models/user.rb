class User < ApplicationRecord
  include PgSearch

  GENDERS = %w(male female unspecified)
  INVITE_STATUSES = %w(pending accepted)

  has_secure_password validations: false
  mount_base64_uploader :avatar, AvatarUploader

  pg_search_scope :search_by_all, 
    :against => [:first_name, :last_name, :email], 
    :using => { :tsearch => {:prefix => true} }

  has_many :ideas, foreign_key: :author_id, dependent: :nullify
  has_many :initiatives, foreign_key: :author_id, dependent: :nullify
  has_many :assigned_ideas, class_name: 'Idea', foreign_key: :assignee_id, dependent: :nullify
  has_many :assigned_initiatives, class_name: 'Initiative', foreign_key: :assignee_id, dependent: :nullify
  has_many :default_assigned_projects, class_name: 'Project', foreign_key: :default_assignee_id, dependent: :nullify
  has_many :comments, foreign_key: :author_id, dependent: :nullify
  has_many :official_feedbacks, dependent: :nullify
  has_many :votes, dependent: :nullify
  has_many :notifications, foreign_key: :recipient_id, dependent: :destroy
  has_many :unread_notifications, -> { where read_at: nil }, class_name: 'Notification', foreign_key: :recipient_id
  has_many :initiator_notifications, class_name: 'Notification', foreign_key: :initiating_user_id, dependent: :nullify
  has_many :invites, foreign_key: :inviter_id, dependent: :destroy
  has_many :identities, dependent: :destroy
  has_many :spam_reports, dependent: :nullify
  has_many :activities, dependent: :nullify
  has_many :inviter_invites, class_name: 'Invite', foreign_key: :inviter_id, dependent: :nullify
  has_one :invitee_invite, class_name: 'Invite', foreign_key: :invitee_id, dependent: :destroy
  has_many :memberships, dependent: :destroy
  has_many :manual_groups, class_name: 'Group', source: 'group', through: :memberships
  has_many :campaign_email_commands, class_name: 'EmailCampaigns::CampaignEmailCommand', foreign_key: :recipient_id, dependent: :destroy
  has_many :baskets, dependent: :destroy

  store_accessor :custom_field_values, :gender, :birthyear, :domicile, :education

  validates :email, :first_name, :slug, :locale, presence: true, unless: :invite_pending?

  validates :email, uniqueness: true, allow_nil: true
  validates :slug, uniqueness: true, format: {with: SlugService.new.regex }, unless: :invite_pending?
  validates :email, format: { with: /\A([^@\s]+)@((?:[-a-z0-9]+\.)+[a-z]{2,})\z/i }, allow_nil: true
  validates :locale, inclusion: { in: proc {Tenant.settings('core','locales')} }
  validates :bio_multiloc, multiloc: {presence: false}
  validates :gender, inclusion: {in: GENDERS}, allow_nil: true
  validates :birthyear, numericality: {only_integer: true, greater_than: Time.now.year - 120, less_than: Time.now.year}, allow_nil: true
  validates :domicile, inclusion: {in: proc {['outside'] + Area.select(:id).map(&:id)}}, allow_nil: true
  # Follows ISCED2011 scale
  validates :education, numericality: {only_integer: true, greater_than_or_equal_to: 0, less_than_or_equal_to: 8}, allow_nil: true

  validates :invite_status, inclusion: {in: INVITE_STATUSES}, allow_nil: true

  validates :custom_field_values, json: {
    schema: lambda { CustomFieldService.new.fields_to_json_schema(CustomField.fields_for('User')) },
    message: ->(errors) { errors }
  }, if: [:custom_field_values_changed?, :active?]

  validates :password, length: { in: 5..72 }, allow_nil: true
  validate do |record|
    record.errors.add(:last_name, :blank) unless (record.last_name.present? or record.cl1_migrated or record.invite_pending?)
    record.errors.add(:password, :blank) unless (record.password_digest.present? or record.identities.any? or record.invite_pending?)
    if record.email && User.find_by_cimail(record.email).present?
      duplicate_user = User.find_by_cimail(record.email)
      if duplicate_user.invite_pending? && duplicate_user.id != id
        ErrorsService.new.remove record.errors, :email, :taken, value: record.email
        record.errors.add(:email, :taken_by_invite, value: record.email, inviter_email: duplicate_user.invitee_invite&.inviter&.email)
      elsif duplicate_user.email != record.email
        # We're only checking this case, as the other case is covered
        # by the uniqueness constraint which can "cleverly" distinguish
        # true duplicates from the record itself.
        record.errors.add(:email, :taken, value: record.email)
      end
    end
  end

  EMAIL_DOMAIN_BLACKLIST = File.readlines(Rails.root.join('config', 'domain_blacklist.txt')).map(&:strip)
  validate :validate_email_domain_blacklist

  ROLES_JSON_SCHEMA = Rails.root.join('config', 'schemas', 'user_roles.json_schema').to_s
  validates :roles, json: { schema: ROLES_JSON_SCHEMA, message: ->(errors) { errors } }

  before_validation :set_cl1_migrated, on: :create
  before_validation :generate_slug

  scope :order_role, -> (direction=:asc) {
    joins("LEFT OUTER JOIN (SELECT jsonb_array_elements(roles) as ro, id FROM users) as r ON users.id = r.id")
    .order(Arel.sql("(roles @> '[{\"type\":\"admin\"}]')::integer #{direction}"))
    .reverse_order
    .group('users.id')
  }

  scope :admin, -> { 
    where("roles @> '[{\"type\":\"admin\"}]'")
  }

  scope :not_admin, -> {
    where.not("roles @> '[{\"type\":\"admin\"}]'")
  }

  scope :project_moderator, -> (project_id=nil) {
    if project_id
      where("roles @> ?", JSON.generate([{type: 'project_moderator', project_id: project_id}]))
    else
      where("roles @> '[{\"type\":\"project_moderator\"}]'")
    end
  }

  scope :not_project_moderator, -> {
    where.not("roles @> '[{\"type\":\"project_moderator\"}]'")
  }

  scope :normal_user, -> {
    where("roles = '[]'::jsonb")
  }

  scope :not_normal_user, -> {
    where.not("roles = '[]'::jsonb")
  }

  scope :active, -> {
    where("registration_completed_at IS NOT NULL AND invite_status is distinct from 'pending'")
  }

  scope :not_invited, -> {
    where.not(invite_status: 'pending').or(where(invite_status: nil))
  }


  scope :in_group, -> (group) {
    if group.rules?
      SmartGroupsService.new.filter(self.all, group.rules)
    elsif group.manual?
      joins(:memberships).where(memberships: {group_id: group.id})
    end
  }

  scope :in_any_group, -> (groups) {
    user_ids = groups
      .flat_map do |group|
        in_group(group).ids
      end
      .uniq
    where(id: user_ids)
  }

  def self.find_by_cimail email
    where('lower(email) = lower(?)', email).first
  end

  def self.from_token_request request
    # This method is used by knock to get the user.
    # Default is by email, but we want to compare
    # case insensitively and forbid login for 
    # invitees.
    not_invited.find_by_cimail request.params["auth"]["email"]
  end

  def avatar_blank?
    avatar.file.nil?
  end

  def invite_pending?
    invite_status == 'pending'
  end

  def display_name
    [first_name, last_name].compact.join(" ")
  end

  def admin?
    !!self.roles.find{|r| r["type"] == "admin"}
  end

  def super_admin?
    admin? && !!(email =~ /citizen\-?lab\.(eu|be|fr|ch|de|nl|co|uk|us|cl)$/i)
  end

  def project_moderator? project_id=nil
    !!self.roles.find{|r| r["type"] == "project_moderator" && (project_id.nil? || r["project_id"] == project_id)}
  end

  def active_admin_or_moderator? project_id
    active? && (admin? || project_moderator?(project_id))
  end

  def highest_role
    if super_admin?
      :super_admin
    elsif admin?
      :admin
    elsif project_moderator?
      :project_moderator
    else
      :user
    end
  end

  def moderatable_project_ids
    self.roles
      .select{|role| role['type'] == 'project_moderator'}
      .map{|role| role['project_id']}.compact
  end

  def add_role type, options={}
    self.roles << {"type" => type}.merge(options)
    self.roles.uniq!
  end

  def delete_role type, options={}
    self.roles.delete({"type" => type}.merge(options.stringify_keys))
  end

  def authenticate unencrypted_password
    if !password_digest
      false
    elsif cl1_authenticate(unencrypted_password)
      self.password_digest = BCrypt::Password.create(unencrypted_password)
      self
    else
      original_authenticate(unencrypted_password) && self
    end
  end

  def member_of? group_id
    !self.memberships.select{ |m| m.group_id == group_id }.empty?
  end

  def active?
    self.registration_completed_at.present? && !self.invite_pending?
  end

  def groups
    manual_groups + SmartGroupsService.new.groups_for_user(self)
  end

  def group_ids
    manual_group_ids + SmartGroupsService.new.groups_for_user(self).pluck(:id)
  end
  

  private

  def generate_slug
    if !self.slug && self.first_name.present?
      self.slug = SlugService.new.generate_slug self, self.display_name
    end
  end

  def set_cl1_migrated
    self.cl1_migrated ||= false
  end

  def original_authenticate(unencrypted_password)
    BCrypt::Password.new(password_digest).is_password?(unencrypted_password)
  end

  def cl1_authenticate(unencrypted_password)
    original_authenticate(::Digest::SHA256.hexdigest(unencrypted_password))
  end

  def validate_email_domain_blacklist
    if email.present?
      domain = email.split('@')&.last
      if domain && EMAIL_DOMAIN_BLACKLIST.include?(domain.strip.downcase)
        errors.add(:email, :domain_blacklisted, value: domain)
      end
    end
  end

end
