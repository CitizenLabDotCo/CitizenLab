require 'rails_helper'

RSpec.describe Permission, type: :model do
  describe 'participation_conditions' do
    it 'returns expected output' do
      birthyear = create(:custom_field_number, title_multiloc: { 'en' => 'Birthyear?' }, key: 'birthyear',
                                               code: 'birthyear')

      sebi = create(:user, first_name: 'Sebi', email: 'sebi@citizenlab.co', birthyear: 1992)
      koen = create(:user, first_name: 'Koen', email: 'koen@citizenlab.co', birthyear: 1987)
      flupke = create(:user, first_name: 'Flupke', email: 'flupke@gmail.com', birthyear: 1930)

      email_rule = {
        'ruleType' => 'email',
        'predicate' => 'ends_on',
        'value' => 'citizenlab.co'
      }
      bday_rule = {
        'ruleType' => 'custom_field_number',
        'customFieldId' => birthyear.id,
        'predicate' => 'is_smaller_than_or_equal',
        'value' => 1988
      }
      verified_rule = {
        'ruleType' => 'verified',
        'predicate' => 'is_verified'
      }

      manual = create(:group)
      manual.add_member create(:user)
      cl_verified = create(:smart_group, rules: [email_rule, verified_rule])
      veterans = create(:smart_group, rules: [bday_rule])
      verified = create(:smart_group, rules: [verified_rule])

      permission = create(:permission, permitted_by: 'groups', groups: [cl_verified, manual, verified, veterans])

      service = SmartGroupsService.new
      expect(permission.participation_conditions).to match [
        [
          service.parse_json_rule(email_rule).description_multiloc
        ],
        [
          service.parse_json_rule(bday_rule).description_multiloc
        ]
      ]
    end
  end
end
