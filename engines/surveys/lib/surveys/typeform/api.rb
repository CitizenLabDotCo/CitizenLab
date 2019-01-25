module Surveys
  module Typeform
    class Api
      include HTTParty
      debug_output $stdout if Rails.env.development? || Rails.env.test?

      base_uri 'https://api.typeform.com'

      def initialize token
        @token = token
      end

      def webhooks form_id
        self.class.get(
          "/forms/#{form_id}/webhooks",
          headers: authorized_headers
        )
      end

      def create_or_update_webhook form_id:, tag:, url:, secret: nil, enabled: true
        self.class.put(
          "/forms/#{form_id}/webhooks/#{tag}",
          body: {
            url: url,
            enabled: enabled,
            secret: secret
          }.to_json,
          headers: authorized_headers.merge({
            'Content-Type' => 'application/json'
          })
        )
      end

      def delete_webhook form_id:, tag:
        self.class.delete(
          "/forms/#{form_id}/webhooks/#{tag}",
          headers: authorized_headers
        )
      end

      private 

      def authorized_headers
        {
          'Authorization' => "Bearer #{@token}"
        }
      end
    end
  end
end