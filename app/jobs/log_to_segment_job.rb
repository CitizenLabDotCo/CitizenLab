class LogToSegmentJob < ApplicationJob
  queue_as :default

  def perform activity
    service = LogToSegmentService.new

    event = {
      event: service.activity_event_name(activity),
      timestamp: activity.acted_at,
      properties: {
        source: 'cl2-back'
      }
    }

    if activity.user_id
      event[:user_id] = activity.user_id
      if activity.user
        event[:integrations] = service.integrations(activity.user)
      end
    else
    	event[:anonymous_id] = SecureRandom.base64
    end
    service.add_activity_properties event[:properties], activity
    begin
      tenant = Tenant.current
      service.add_tenant_properties event[:properties], tenant
    rescue  ActiveRecord::RecordNotFound => e
      # Tenant can't be found, so we don't add anything
    end
    service.add_activity_item_content event, event[:properties], activity
    service.add_environment_properties event[:properties]
    Analytics.track event
  end

end
