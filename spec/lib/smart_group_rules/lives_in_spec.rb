require "rails_helper"

describe SmartGroupRules::LivesIn do

  let(:valid_json_rule) {{
    'ruleType' => 'lives_in',
    'predicate' => 'has_value',
    'value' => create(:area).id
  }}
  let(:valid_rule) { SmartGroupRules::LivesIn.from_json(valid_json_rule) }

  describe "from_json" do

    it "successfully parses a valid json" do
      expect(valid_rule.predicate).to eq valid_json_rule['predicate']
      expect(valid_rule.value).to eq valid_json_rule['value']
    end

    it "successfully validate the valid multi-value rule" do
      expect(valid_rule.tap{|r| r.predicate='is_one_of'; r.value=[r.value]}).to be_valid
    end

    it "fails on a non-existing custom field option" do
      expect(valid_rule.tap{|r| r.predicate='is_one_of'; r.value=[r.value, 'garbage']}).to be_invalid
    end
  end

  describe "validations" do
    it "successfully validate the valid rule" do
      expect(valid_rule).to be_valid
    end
  end

  describe "filter" do

    before do
      CustomField.create!(
        resource_type: 'User',
        key: 'domicile',
        title_multiloc: {'en' => 'Domicile'},
        input_type: 'select',
        required: false,
        ordering: 2,
        enabled: true,
        code: 'domicile'
      ) 
    end

    let!(:area1) { create(:area) }
    let!(:area2) { create(:area) }
    let!(:users) {
      users = build_list(:user, 5)
      users[0][:custom_field_values] = {'domicile' => 'outside'}
      users[1][:custom_field_values] = {'domicile' => area1.id}
      users[2][:custom_field_values] = {'domicile' => area2.id}
      users[3][:custom_field_values] = nil
      users[4][:custom_field_values] = {'domicile' => area1.id}
      users.each(&:save!)
    }

    it "correctly filters on 'has_value' predicate" do
      rule = SmartGroupRules::LivesIn.new('has_value', area1.id)
      expect(rule.filter(User).count).to eq 2
    end

    it "correctly filters on 'not_has_value' predicate" do
      rule = SmartGroupRules::LivesIn.new('not_has_value', 'outside')
      expect(rule.filter(User).count).to eq 4
    end

    it "correctly filters on 'is_one_of' predicate" do
      rule = SmartGroupRules::LivesIn.new('is_one_of', [area1.id, 'outside'])
      expect(rule.filter(User).count).to eq 3
    end

    it "correctly filters on 'not_is_one_of' predicate" do
      rule = SmartGroupRules::LivesIn.new('not_is_one_of', [area2.id])
      expect(rule.filter(User).count).to eq User.count - 1
    end

    it "correctly filters on 'is_empty' predicate" do
      rule = SmartGroupRules::LivesIn.new('is_empty')
      expect(rule.filter(User).count).to eq 1
    end

    it "correctly filters on 'not_is_empty' predicate" do
      rule = SmartGroupRules::LivesIn.new('not_is_empty')
      expect(rule.filter(User).count).to eq 4
    end
  end

  describe "description_multiloc" do
    before do
      CustomField.create!(
        resource_type: 'User',
        key: 'domicile',
        title_multiloc: {'en' => 'Place of residence', 'fr-FR' => 'Domicile', 'nl-NL' => 'Woonplaats'},
        input_type: 'select',
        required: false,
        ordering: 2,
        enabled: true,
        code: 'domicile'
      ) 
    end

    let(:area) {create(:area, title_multiloc: {
      'en'    => 'Brussels',
      'fr-FR' => 'Bruxelles',
      'nl-NL' => 'Brussel'
    })}
    
    let(:lives_in_has_value_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'has_value',
      'value'     => area.id
    })}
    let(:lives_in_outside_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'has_value',
      'value'     => 'outside'
    })}
    let(:lives_in_not_has_value_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'not_has_value',
      'value'     => area.id
    })}
    let(:lives_in_not_outside_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'not_has_value',
      'value'     => 'outside'
    })}
    let(:lives_in_is_one_of_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'      => 'lives_in',
      'predicate'     => 'is_one_of',
      'value'         => [area.id, 'outside']
    })}
    let(:lives_in_not_is_one_of_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'      => 'lives_in',
      'predicate'     => 'not_is_one_of',
      'value'         => [area.id]
    })}
    let(:lives_in_is_empty_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'is_empty'
    })}
    let(:lives_in_not_is_empty_rule) {SmartGroupRules::LivesIn.from_json({
      'ruleType'  => 'lives_in',
      'predicate' => 'not_is_empty'
    })}

    it "successfully translates different combinations of rules" do
      # Stubbing the translations so the specs don't depend on those.
      I18n.load_path += Dir[Rails.root.join('spec', 'fixtures', 'locales', '*.yml')]

      expect(lives_in_has_value_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence is Brussels',
        'fr-FR' => 'Domicile est Bruxelles',
        'nl-NL' => 'Woonplaats is Brussel'
      })
      expect(lives_in_outside_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence is somewhere else',
        'fr-FR' => 'Domicile est ailleurs',
        'nl-NL' => 'Woonplaats is ergens anders'
      })
      expect(lives_in_not_has_value_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence isn\'t Brussels',
        'fr-FR' => 'Domicile n\'est pas Bruxelles',
        'nl-NL' => 'Woonplaats is niet Brussel'
      })
      expect(lives_in_not_outside_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence is not somewhere else',
        'fr-FR' => 'Domicile n\'est pas ailleurs',
        'nl-NL' => 'Woonplaats is niet ergens anders'
      })
      expect(lives_in_is_one_of_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence has one of the following values: Brussels, somewhere else',
        'fr-FR' => 'Domicile est un de: Bruxelles, quelque part d\'autre',
        'nl-NL' => 'Woonplaats heeft een van de volgende waarden: Brussel, ergens anders'
      })
      expect(lives_in_not_is_one_of_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence does not have any of the follow values: Brussels',
        'fr-FR' => 'Domicile n\'est pas un de: Bruxelles',
        'nl-NL' => 'Woonplaats heeft geen van de volgende waarden: Brussel'
      })
      expect(lives_in_is_empty_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence has no value',
        'fr-FR' => 'Domicile n\'as pas de value',
        'nl-NL' => 'Woonplaats heeft geen waarde'
      })
      expect(lives_in_not_is_empty_rule.description_multiloc).to eq ({
        'en'    => 'Place of residence has any value',
        'fr-FR' => 'Domicile peut avoir n\'importe quel value',
        'nl-NL' => 'Woonplaats heeft om het even welke waarde'
      })
    end
  end

end