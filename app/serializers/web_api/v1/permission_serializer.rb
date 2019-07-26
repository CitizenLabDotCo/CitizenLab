class WebApi::V1::PermissionSerializer < WebApi::V1::BaseSerializer
  attributes :action, :permitted_by, :created_at, :updated_at

  belongs_to :permittable, polymorphic: true
  has_many :groups
end
