class CreatePeriodicActivitiesJob < ApplicationJob
  queue_as :default

  def perform now
    ActivitiesService.new.create_periodic_activities now: now
  end

end
