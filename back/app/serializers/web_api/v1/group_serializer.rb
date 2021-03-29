class WebApi::V1::GroupSerializer < WebApi::V1::BaseSerializer
  attributes :title_multiloc, :slug, :membership_type, :memberships_count

  attribute :rules, if: Proc.new { |object|
    object.rules?
  }
end