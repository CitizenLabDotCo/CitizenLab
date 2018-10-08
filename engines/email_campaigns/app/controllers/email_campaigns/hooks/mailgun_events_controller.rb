require 'openssl'

module EmailCampaigns
  class Hooks::MailgunEventsController < EmailCampaignsController

    skip_after_action :verify_policy_scoped
    skip_after_action :verify_authorized

    before_action :verify, only: [:create]
    around_action :switch_tenant


    MAILGUN_STATUS_MAPPING = {
      'accepted' => 'accepted',
      'rejected' => 'bounced',
      'delivered' => 'delivered',
      'failed' => 'failed',
      'opened' => 'opened',
      'clicked' => 'clicked',
    }

    def create
      campaigns_recipient = Delivery.find_by(
        user_id: params[:'event-data'][:'user-variables'][:'cl_user_id'],
        campaign_id: params[:'event-data'][:'user-variables'][:'cl_campaign_id'],
      )
      if campaigns_recipient
        target_status = MAILGUN_STATUS_MAPPING[params[:'event-data'][:event]]
        if target_status
          campaigns_recipient.set_delivery_status(target_status)
          if campaigns_recipient.save
            head :ok
          else
            head 500
          end
        else
          # we're not supporting this event
          head :not_acceptable
        end
      else
        # We haven't sent out this mail
        head :not_acceptable
      end
    end

    def secure_controller?
      false
    end

    private

    # from https://documentation.mailgun.com/en/latest/user_manual.html#webhooks
    def verify
      if ENV.fetch("MAILGUN_API_KEY", false)
        api_key = ENV.fetch("MAILGUN_API_KEY")
        token = params[:signature][:token]
        timestamp = params[:signature][:timestamp]
        signature = params[:signature][:signature]

        digest = OpenSSL::Digest::SHA256.new
        data = [timestamp, token].join

        if signature != OpenSSL::HMAC.hexdigest(digest, api_key, data)
          head :not_acceptable
        end
      end
    end

    def switch_tenant
      tenant_id = params.dig(:'event-data', :'user-variables', :'cl_tenant_id')
      if tenant_id
        Apartment::Tenant.switch(Tenant.find(tenant_id).schema_name) do
          yield
        end
      else
        head :not_acceptable
      end
    end
  end
end
