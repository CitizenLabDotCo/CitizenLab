module EmailCampaigns
  class WelcomeMailer < ActionMailer::Base
    add_template_helper(CampaignHelper)

    default from: ENV.fetch("DEFAULT_FROM_EMAIL", 'hello@citizenlab.co')
    default reply_to: ENV.fetch("DEFAULT_FROM_EMAIL", 'hello@citizenlab.co')

    def campaign_mail campaign, command
      recipient = command[:recipient]
      multiloc_service = MultilocService.new
      
      @locale = recipient.locale
      @user = recipient
      @tenant = Tenant.current
      @campaign = campaign
      @command = command

      I18n.with_locale(@locale) do
        subject = I18n.t(
          'email_campaigns.welcome.subject', 
          organizationName: multiloc_service.t(@tenant.settings.dig('core', 'organization_name'))
          )
        message = mail(
          subject: subject,
          to: recipient.email
        ) do |format|
          # format.text
          format.mjml
        end
        if (ActionMailer::Base.delivery_method == :mailgun)
          message.mailgun_headers = {
            'X-Mailgun-Variables' => {
              'cl_tenant_id' => @tenant.id,
              'cl_campaign_id' => campaign.id,
              'cl_user_id' => recipient.id,
            }.to_json,
          }
        end
        message
      end
    end


    private

  end
end
