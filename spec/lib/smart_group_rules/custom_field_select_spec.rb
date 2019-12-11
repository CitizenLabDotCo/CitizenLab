require "rails_helper"

describe SmartGroupRules::CustomFieldSelect do


  describe "validations" do

    let(:custom_field) { create(:custom_field_select) }
    let(:options) { create_list(:custom_field_option, 3, custom_field: custom_field) }

    let(:valid_json_rule) {{
      'ruleType' => 'custom_field_select',
      'customFieldId' => custom_field.id,
      'predicate' => 'has_value',
      'value' => options.first.id
    }}
    let(:valid_rule) { SmartGroupRules::CustomFieldSelect.from_json(valid_json_rule) }

    it "successfully validate the valid rule" do
      expect(valid_rule).to be_valid
    end

    it "fails on a non-existing custom field" do
      expect(valid_rule.tap{|r| r.custom_field_id='garbage'}).to be_invalid
    end

    it "fails on a non-existing custom field option" do
      expect(valid_rule.tap{|r| r.value='garbage'}).to be_invalid
    end

    it "fails on a custom field option from another custom field" do
      other_custom_field_option = create(:custom_field_option, custom_field: create(:custom_field_select))
      expect(valid_rule.tap{|r| r.value=other_custom_field_option.id}).to be_invalid
    end
  end

  describe "filter" do

    context "on a select field" do

      let(:custom_field) { create(:custom_field_select, required: false) }
      let(:options) { create_list(:custom_field_option, 3, custom_field: custom_field )}

      let!(:users) {
        users = build_list(:user, 5)
        users[0].custom_field_values[custom_field.key] = options[0].key
        users[1].custom_field_values[custom_field.key] = options[0].key
        users[2].custom_field_values[custom_field.key] = options[1].key
        users[3].custom_field_values[custom_field.key] = options[2].key
        # users[4].custom_field_values[custom_field.key] = nil
        users.each(&:save!)
      }

      it "correctly filters on 'has_value' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'has_value', options[0].id)
        expect(rule.filter(User).count).to eq 2 
      end

      it "correctly filters on 'not_has_value' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'not_has_value', options[1].id)
        expect(rule.filter(User).count).to eq User.count - 1
      end

      it "correctly filters on 'is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'is_empty')
        expect(rule.filter(User).count).to eq 1 
      end

      it "correctly filters on 'not_is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'not_is_empty')
        expect(rule.filter(User).count).to eq User.count - 1
      end

    end

    context "on a multiselect field" do

      let(:custom_field) { create(:custom_field_multiselect, required: false) }
      let(:options) { create_list(:custom_field_option, 3, custom_field: custom_field )}

      let!(:users) {
        users = build_list(:user, 5)
        users[0].custom_field_values[custom_field.key] = [options[0].key, options[1].key]
        users[1].custom_field_values[custom_field.key] = []
        users[2].custom_field_values[custom_field.key] = [options[1].key]
        users[3].custom_field_values[custom_field.key] = [options[2].key]
        # users[4].custom_field_values[custom_field.key] = nil
        users.each(&:save!)
      }

      it "correctly filters on 'has_value' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'has_value', options[1].id)
        expect(rule.filter(User).count).to eq 2 
      end

      it "correctly filters on 'not_has_value' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'not_has_value', options[1].id)
        expect(rule.filter(User).count).to eq 3
      end

      it "correctly filters on 'is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'is_empty')
        expect(rule.filter(User).count).to eq 2
      end

      it "correctly filters on 'not_is_empty' predicate" do
        rule = SmartGroupRules::CustomFieldSelect.new(custom_field.id, 'not_is_empty')
        expect(rule.filter(User).count).to eq 3
      end

    end

 
  end

  describe "description_multiloc" do
    let(:custom_field) {create(:custom_field_select, title_multiloc: {
      'en'    => 'Where should we put the immigrants?',
      'fr-FR' => 'Où devrions-nous placer les immigrants?',
      'nl-NL' => 'Waar moeten we de immigraten plaatsen?'
    })}
    let(:train_station) { create(:custom_field_option, custom_field: custom_field, title_multiloc: {
      'en'    => 'In the train station',
      'fr-FR' => 'Dans la gare',
      'nl-NL' => 'In het treinstation'
    })}
    
    let(:custom_field_select_has_value_rule) {SmartGroupRules::CustomFieldSelect.from_json({
      'ruleType'      => 'custom_field_select',
      'predicate'     => 'has_value',
      'customFieldId' => custom_field.id,
      'value'         => train_station.id
    })}
    let(:custom_field_select_not_has_value_rule) {SmartGroupRules::CustomFieldSelect.from_json({
      'ruleType'      => 'custom_field_select',
      'predicate'     => 'not_has_value',
      'customFieldId' => custom_field.id,
      'value'         => train_station.id
    })}
    let(:custom_field_select_is_empty_rule) {SmartGroupRules::CustomFieldSelect.from_json({
      'ruleType'      => 'custom_field_select',
      'predicate'     => 'is_empty',
      'customFieldId' => custom_field.id
    })}
    let(:custom_field_select_not_is_empty_rule) {SmartGroupRules::CustomFieldSelect.from_json({
      'ruleType'      => 'custom_field_select',
      'predicate'     => 'not_is_empty',
      'customFieldId' => custom_field.id
    })}

    # TODO test education: return education description instead of number

    it "successfully translates different combinations of rules" do
      # Stubbing the translations so the specs don't depend on those.
      I18n.load_path += Dir[Rails.root.join('spec', 'fixtures', 'locales', '*.yml')]

      expect(custom_field_select_has_value_rule.description_multiloc).to eq ({
        'en'    => 'Where should we put the immigrants? is In the train station',
        'fr-FR' => 'Où devrions-nous placer les immigrants? est Dans la gare',
        'nl-NL' => 'Waar moeten we de immigraten plaatsen? is In het treinstation'
      })
      expect(custom_field_select_not_has_value_rule.description_multiloc).to eq ({
        'en'    => 'Where should we put the immigrants? isn\'t In the train station',
        'fr-FR' => 'Où devrions-nous placer les immigrants? n\'est pas Dans la gare',
        'nl-NL' => 'Waar moeten we de immigraten plaatsen? is niet In het treinstation'
      })
      expect(custom_field_select_is_empty_rule.description_multiloc).to eq ({
        'en'    => 'Where should we put the immigrants? has no value',
        'fr-FR' => 'Où devrions-nous placer les immigrants? n\'as pas de value',
        'nl-NL' => 'Waar moeten we de immigraten plaatsen? heeft geen waarde'
      })
      expect(custom_field_select_not_is_empty_rule.description_multiloc).to eq ({
        'en'    => 'Where should we put the immigrants? has any value',
        'fr-FR' => 'Où devrions-nous placer les immigrants? peut avoir n\'importe quel value',
        'nl-NL' => 'Waar moeten we de immigraten plaatsen? heeft om het even welke waarde'
      })
    end
  end

end