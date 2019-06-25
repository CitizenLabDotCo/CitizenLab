module EmailCampaigns
  class WebApi::V1::DeliverySerializer < ActiveModel::Serializer
    attributes :id, :delivery_status, :sent_at, :created_at, :updated_at

    belongs_to :user, serializer: ::WebApi::V1::External::UserSerializer 
    
  end
end
