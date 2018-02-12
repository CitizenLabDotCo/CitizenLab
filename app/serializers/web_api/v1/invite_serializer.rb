class WebApi::V1::InviteSerializer < ActiveModel::Serializer

  attributes :id, :token, :email

  belongs_to :group
  
end
