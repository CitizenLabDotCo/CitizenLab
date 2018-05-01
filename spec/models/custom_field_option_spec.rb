require 'rails_helper'

RSpec.describe CustomFieldOption, type: :model do

  context "hooks" do

    it "should generate unique keys in the custom field scope on creation, if not specified" do
      cf = create(:custom_field_select)
      cfo1 = create(:custom_field_option, key: nil, custom_field: cf)
      cfo2 = create(:custom_field_option, key: nil, custom_field: cf)
      cfo3 = create(:custom_field_option, key: nil, custom_field: cf)
      expect([cfo1, cfo2, cfo3].map(&:key).uniq).to match [cfo1, cfo2, cfo3].map(&:key)
    end

  end

  describe "destroy" do

    let(:cf) { create(:custom_field_select) }
    let(:cfo) { create(:custom_field_option, custom_field: cf) }

    it "is allowed when there are no references in smart_group rules" do
      expect(cfo.destroy).to be_truthy
    end

    it "is not allowed when there are references in smart_group_rules" do
      group = create(:smart_group, rules: [
        {ruleType: 'custom_field_select', customFieldId: cf.id, predicate: 'has_value', value: cfo.id}
      ])
      expect(cfo.destroy).to be false
      expect(cfo.errors[:base].size).to eq 1
    end

  end
end
