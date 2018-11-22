require "rails_helper"

describe SmartGroupRules::Role do

  let(:valid_json_rule) {{
    'ruleType' => 'role',
    'predicate' => 'is_admin'
  }}
  let(:valid_rule) { SmartGroupRules::Role.from_json(valid_json_rule) }

  describe "from_json" do

    it "successfully parses a valid json" do
      expect(valid_rule.predicate).to eq valid_json_rule['predicate']
    end

  end

  describe "validations" do
    it "successfully validate the valid rule" do
      expect(valid_rule).to be_valid
    end

    it "fails on a non-existing predicate" do
      expect(valid_rule.tap{|r| r.predicate='has_long_toes'}).to be_invalid
    end
  end

  describe "filter" do

    let!(:users) {
      mortals = create_list(:user, 3)
      admins = create_list(:admin, 2)
      moderators = create_list(:moderator, 2)
      admin_and_moderator = create(:moderator)
      admin_and_moderator.update(roles: admin_and_moderator.roles + [{type: 'admin'}])
      mortals + admins + moderators + [admin_and_moderator]
    }

    it "correctly filters on 'is_admin' predicate" do
      rule = SmartGroupRules::Role.new('is_admin')
      expect(rule.filter(User).count).to eq 3
    end

    it "correctly filters on 'not_is_admin' predicate" do
      rule = SmartGroupRules::Role.new('not_is_admin')
      expect(rule.filter(User).count).to eq 5
    end

    it "correctly filters on 'is_project_moderator' predicate" do
      rule = SmartGroupRules::Role.new('is_project_moderator')
      expect(rule.filter(User).count).to eq 3
    end

    it "correctly filters on 'not_is_project_moderator' predicate" do
      rule = SmartGroupRules::Role.new('not_is_project_moderator')
      expect(rule.filter(User).count).to eq 5
    end

    it "correctly filters on 'is_normal_user' predicate" do
      rule = SmartGroupRules::Role.new('is_normal_user')
      expect(rule.filter(User).count).to eq 3
    end

    it "correctly filters on 'not_is_normal_user' predicate" do
      rule = SmartGroupRules::Role.new('not_is_normal_user')
      expect(rule.filter(User).count).to eq 5
    end
 
  end

end