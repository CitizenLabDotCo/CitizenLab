class PublishGenericEventToRabbitJob < ApplicationJob
  queue_as :default

  def perform(event, routing_key)
    return unless BUNNY_CON
    event = add_tenant_properties(event)

    with_channel do |channel|
      exchange = channel.topic('cl2back')
      exchange.publish(
          event.to_json,
          app_id: 'cl2-back',
          content_type: 'application/json',
          routing_key: routing_key
      )
    end
  end

  private

  def add_tenant_properties(event)
    tenant_properties = TrackingService.new.tenant_properties(Tenant.current)
    event.merge(tenant_properties)
  rescue ActiveRecord::RecordNotFound
    # TODO Shouldn't we at least log something?
    # Tenant can't be found, so we don't add anything
  end

  def with_channel
    channel = BUNNY_CON.create_channel
    yield channel
    channel.close
  end

end
