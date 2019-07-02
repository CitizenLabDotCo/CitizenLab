module Onboarding
  module WebApi
    module V1
      class CampaignsController < OnboardingController

        class Campaign < OpenStruct
          include ActiveModel::Serialization
          def type
            Campaign
          end
        end


        def current
          authorize current_user, :update?
          service = OnboardingService.new
          current_campaign = service.current_campaign(current_user)
          custom_cta = current_campaign == :custom_cta
          campaign = Campaign.new({
            name: current_campaign,
            cta_message_multiloc: custom_cta ? Tenant.settings('core','custom_onboarding_message') : nil,
            cta_button_multiloc: custom_cta ? Tenant.settings('core','custom_onboarding_button') : nil,
            cta_button_link: custom_cta ? Tenant.settings('core','custom_onboarding_link') : nil,
          })
          
          render json: WebApi::V1::Fast::CampaignSerializer.new(campaign, params: fastjson_params)
        end

        private

        def secure_controller?
          true
        end
      end
    end
  end
end