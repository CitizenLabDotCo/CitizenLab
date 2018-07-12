require "rails_helper"

describe SideFxPhaseService do
  let(:service) { SideFxPhaseService.new }
  let(:user) { create(:user) }
  let(:phase) { create(:phase) }

  describe "before_create" do
    it "runs the description through the text image service" do
      expect_any_instance_of(TextImageService).to receive(:swap_data_images).with(phase, :description_multiloc)
      service.before_create(phase, user)
    end
  end

  describe "after_create" do
    it "logs a 'created' action when a phase is created" do
      expect {service.after_create(phase, user)}.
        to have_enqueued_job(LogActivityJob).with(phase, 'created', user, phase.created_at.to_i)
    end
  end

  describe "before_update" do
    it "runs the description through the text image service" do
      expect_any_instance_of(TextImageService).to receive(:swap_data_images).with(phase, :description_multiloc)
      service.before_update(phase, user)
    end
  end

  describe "after_update" do
    it "logs a 'changed' action job when the phase has changed" do
      phase.update(title_multiloc: {'en': 'changed'})
      expect {service.after_update(phase, user)}.
        to have_enqueued_job(LogActivityJob).with(phase, 'changed', user, phase.updated_at.to_i)
    end
  end

  describe "after_destroy" do
    it "logs a 'deleted' action job when the phase is destroyed" do
      travel_to Time.now do
        frozen_phase = phase.destroy
        expect {service.after_destroy(frozen_phase, user)}.
          to have_enqueued_job(LogActivityJob)
      end
    end
  end

end
