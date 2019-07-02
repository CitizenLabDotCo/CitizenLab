module EmailCampaigns
  class WebApi::V1::ConsentSerializer < ::WebApi::V1::Fast::BaseSerializer
    attributes :consented, :created_at, :updated_at

    attribute :campaign_name do |object|
      object.campaign_type.safe_constantize&.campaign_name
    end

    attribute :campaign_type_description_multiloc do |object|
    	object.campaign_type.safe_constantize&.campaign_description_multiloc
    end
  end
end
