require "rails_helper"

describe SmartGroupRules::CustomFieldDate do


  describe "validations" do

    let(:custom_field) { create(:custom_field_date) }

    let(:valid_json_rule) {{
      'ruleType' => 'custom_field_date',
      'customFieldId' => custom_field.id,
      'predicate' => 'is_before',
      'value' => (Date.today - 1.day)
    }}
    let(:valid_rule) { SmartGroupRules::CustomFieldDate.from_json(valid_json_rule) }

    it "successfully validates a valid rule" do
      expect(valid_rule).to be_valid
    end
  end

  describe "filter" do

    context "on a date field" do

      let(:custom_field) { create(:custom_field_date, required: false) }

      let!(:users) {
        users = build_list(:user, 5)
        users[0].custom_field_values[custom_field.key] = Date.today
        users[1].custom_field_values[custom_field.key] = (Date.today - 1.day)
        users[2].custom_field_values[custom_field.key] = (Date.today + 1.day)
        users[3].custom_field_values[custom_field.key] = (Date.today - 1.year)
        # users[4].custom_field_values[custom_field.key] = nil
        users.each(&:save!)
      }

      it "correctly filters on 'is_before' predicate" do
        rule = SmartGroupRules::CustomFieldDate.new(custom_field.id, 'is_before', Date.today)
        expect(rule.filter(User).count).to eq 2
      end

      it "correctly filters on 'is_after' predicate" do
        rule = SmartGroupRules::CustomFieldDate.new(custom_field.id, 'is_after', Date.today)
        expect(rule.filter(User).count).to eq 1
      end

      it "correctly filters on 'is_exactly' predicate" do
        rule = SmartGroupRules::CustomFieldDate.new(custom_field.id, 'is_exactly', Date.today)
        expect(rule.filter(User).count).to eq 1
      end

      it "correctly filters on 'is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldDate.new(custom_field.id, 'is_empty')
        expect(rule.filter(User).count).to eq 1 
      end

      it "correctly filters on 'not_is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldDate.new(custom_field.id, 'not_is_empty')
        expect(rule.filter(User).count).to eq User.count - 1
      end

    end
 
  end

  describe "description_multiloc" do
    let(:date_picker) {create(:custom_field_date, title_multiloc: {
      'en'    => 'When will we have a new government?',
      'fr-FR' => 'Quand est-ce que on aura un nouveau gouvernement?',
      'nl-NL' => 'Wanneer zullen we een nieuwe regering hebben?'
    })}
    
    let(:custom_field_date_is_before_rule) {SmartGroupRules::CustomFieldDate.from_json({
      'ruleType'      => 'custom_field_date',
      'predicate'     => 'is_before',
      'customFieldId' => date_picker.id,
      'value'         => '2027-11-08'
    })}

    it "successfully translates different combinations of rules" do
      # Stubbing the translations so the specs don't depend on those.
      I18n.load_path += Dir[Rails.root.join('spec', 'fixtures', 'locales', '*.yml')]

      expect(custom_field_date_is_before_rule.description_multiloc).to eq ({
        'en'    => '\'When will we have a new government?\' is before 2027-11-08',
        'fr-FR' => '\'Quand est-ce que on aura un nouveau gouvernement?\' est avant 08/11/2027',
        'nl-NL' => '\'Wanneer zullen we een nieuwe regering hebben?\' is voor 08-11-2027'
      })
    end
  end

end