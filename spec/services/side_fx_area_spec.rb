require "rails_helper"

describe SideFxAreaService do
  let(:service) { SideFxAreaService.new }
  let(:user) { create(:user) }
  let(:area) { create(:area) }

  describe "after_create" do
    it "logs a 'created' action when a area is created" do
      expect {service.after_create(area, user)}.
        to have_enqueued_job(LogActivityJob).with(area, 'created', user, area.created_at.to_i)
    end
  end

  describe "after_update" do
    it "logs a 'changed' action job when the area has changed" do
      area.update(title_multiloc: {'en': 'changed'})
      expect {service.after_update(area, user)}.
        to have_enqueued_job(LogActivityJob).with(area, 'changed', user, area.updated_at.to_i)
    end
  end

  describe "before_destroy" do
    it "destroys any smart group that refers to this area" do
      group1 = create(:smart_group, rules: [{
        ruleType: 'lives_in',
        predicate: 'has_value',
        value: area.id
      }])
      group2 = create(:smart_group)
      group3 = create(:group)
      service.before_destroy(area, user)
      expect{group1.reload}.to raise_error(ActiveRecord::RecordNotFound)
      expect(Group.count).to eq 2
    end
  end

  describe "after_destroy" do
    it "logs a 'deleted' action job when the area is destroyed" do
      travel_to Time.now do
        frozen_area = area.destroy
        expect {service.after_destroy(frozen_area, user)}.
          to have_enqueued_job(LogActivityJob)
      end
    end
  end

end
