require "rails_helper"

describe UserService do
  let(:service) { UserService.new }

  describe "#anonymized_attributes" do
    before(:all) do
      Apartment::Tenant.switch!('example_org')
      TenantTemplateService.new.apply_template('base')
      CustomField.find_by(code: 'education').update(enabled: true)
    end

    after(:all) do
      Apartment::Tenant.reset
      Tenant.find_by(host: 'example.org').destroy
      create(:test_tenant)
    end

    it "anonymizes confidential parts of the user's attributes" do 
      10.times do 
        user = create(:user)
        attributes = service.anonymized_attributes ['en'], user: user
        expect(User.new(attributes)).to be_valid
      end
    end

  end
end
