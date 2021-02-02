class PublishActivityToRabbitJob < ApplicationJob
  queue_as :default


  # @param [Activity] activity
  def perform(activity)
    event = event_from(activity)
    routing_key = routing_key_from(activity)
    PublishGenericEventToRabbitJob.perform_now(event, routing_key)
  end

  # @param [Activity] activity
  # @return [Hash] event
  def event_from(activity)
    service = TrackingService.new

    event = {
      event: service.activity_event_name(activity),
      timestamp: activity.acted_at,
      **service.activity_properties(activity),
      item_content: service.activity_item_content(activity)
    }

    event[:user_id] = activity.user_id if activity.user_id
    event
  end

  private

  def routing_key_from(activity)
    "#{activity.item_type.underscore}.#{activity.action.underscore}"
  end
end
