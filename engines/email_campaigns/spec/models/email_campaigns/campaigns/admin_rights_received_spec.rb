require 'rails_helper'

RSpec.describe EmailCampaigns::Campaigns::AdminRightsReceived, type: :model do
  describe "AdminRightsReceived Campaign default factory" do
    it "is valid" do
      expect(build(:admin_rights_received_campaign)).to be_valid
    end
  end

  describe '#generate_command' do
  	let(:campaign) { create(:admin_rights_received_campaign) }
    let(:notification) { create(:admin_rights_received) }
    let(:notification_activity) { create(:activity, item: notification, action: 'created') }

  	it "generates a command with the desired payload and tracked content" do
  		command = campaign.generate_commands(
        recipient: notification_activity.item.recipient, 
        activity: notification_activity
        ).first

      expect(
      	command.dig(:event_payload, :recipient, :id)
      	).to eq(notification.recipient_id)
      expect(
      	command.dig(:event_payload, :initiating_user, :id)
      	).to eq(notification.initiating_user_id)
  	end
  end
end
