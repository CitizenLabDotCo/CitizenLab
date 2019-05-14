class RecreateVersionsJob < ApplicationJob
  queue_as :image_background

  def perform(instance, attribute)
    puts "Recreating #{Tenant.current.name} #{instance.class.name} #{instance.id} #{attribute} versions"
    begin
      instance.send(attribute).recreate_versions! if instance.send("#{attribute}?")
    rescue NoMethodError
      # Needed to get past this bug https://github.com/carrierwaveuploader/carrierwave/issues/828
      puts "Something went wrong, recreate_version failed!"
    end
  end
end
