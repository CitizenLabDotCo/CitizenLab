require "rails_helper"

describe SideFxUserService do
  let(:service) { SideFxUserService.new }
  let(:current_user) { create(:user) }
  let(:user) { create(:user) }

  describe "before_create" do
    it "makes the first user that registers automatically admin" do
      User.destroy_all
      u = build(:user)
      service.before_create(u, nil)
      expect(u.admin?).to be true
    end

    it "makes second and later users admin when the first user is not an admin" do
      u = build(:user)
      service.before_create(u, current_user)
      expect(u.admin?).to be true
    end

    it "doesn't make second and later users admin when the first user is an admin" do
      create(:user, roles: [{type: 'admin'}, {type: 'project_moderator', project_id: '42'}])
      u = build(:user)
      service.before_create(u, current_user)
      expect(u.admin?).to be false
    end
  end

  describe "after_create" do
    it "logs a 'created' action when a user is created" do
      expect {service.after_create(user, current_user)}.
        to have_enqueued_job(LogActivityJob).with(user, 'created', current_user, user.updated_at.to_i)
    end

  end

  describe "after_update" do

    it "logs a 'changed_avatar' action job when the avatar has changed" do
      user.update(avatar: File.open(Rails.root.join("spec", "fixtures", "lorem-ipsum.jpg")))
      expect {service.after_update(user, current_user)}.
        to have_enqueued_job(LogActivityJob).with(user, 'changed', current_user, user.updated_at.to_i)
    end

  end

  describe "after_destroy" do
    it "logs a 'deleted' action job when the user is destroyed" do
      travel_to Time.now do
        frozen_user = user.destroy
        expect {service.after_destroy(frozen_user, current_user)}.
          to have_enqueued_job(LogActivityJob)
      end
    end

  end

end
