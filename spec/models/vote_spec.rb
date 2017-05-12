require 'rails_helper'

RSpec.describe Vote, type: :model do
  context "associations" do
    it { should belong_to(:user) }
    it { should belong_to(:votable) }
  end

  context "Default factory" do
    it "is valid" do
      expect(build(:vote)).to be_valid
    end
  end

  context "uniquness" do
    it "can't create 2 votes for the same votable and user" do
      idea = create(:idea)
      user = create(:user)
      vote = create(:vote, votable: idea, user: user)
      expect{ create(:vote, mode: 'up', votable: idea, user: user) }.to raise_error(ActiveRecord::RecordNotUnique)
      expect{ create(:vote, mode: 'down', votable: idea, user: user) }.to raise_error(ActiveRecord::RecordNotUnique)
    end
  end
end
