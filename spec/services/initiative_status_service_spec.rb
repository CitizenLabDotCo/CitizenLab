require "rails_helper"

describe InitiativeStatusService do
  let(:service) { InitiativeStatusService.new }

  describe "#automated_transitions!" do
    before do
      @initiative = create(:initiative)
      tenant = Tenant.current
      tenant.settings['initiatives'] = {
        enabled: true,
        allowed: true,
        voting_threshold: 2,
        days_limit: 20
      }
      tenant.save!
      TenantTemplateService.new.resolve_and_apply_template 'base', external_subfolder: false
    end

    it "transitions when voting threshold was reached" do 
      create(
        :initiative_status_change, 
        initiative: @initiative, initiative_status: InitiativeStatus.find_by(code: 'proposed')
        )
      create_list(:vote, 3, votable: @initiative, mode: 'up')

      service.automated_transitions!

      expect(@initiative.reload.initiative_status.code).to eq 'threshold_reached'
    end

  end
end
