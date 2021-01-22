class AutomatedTransitionJob < ApplicationJob
  queue_as :default

  def perform
    if AppConfiguration.instance.has_feature? 'initiatives'
      InitiativeStatusService.new.automated_transitions!
    end
  end

end
