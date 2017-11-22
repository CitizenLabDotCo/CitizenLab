require "rails_helper"

describe SideFxIdeaService do
  let(:service) { SideFxIdeaService.new }
  let(:user) { create(:user) }

  describe "after_create" do
    it "logs a 'published' action job when publication_state is published" do
      idea = create(:idea, publication_status: 'published', author: user)
      expect {service.after_create(idea, user)}.
        to have_enqueued_job(LogActivityJob).with(idea, 'published', user, idea.created_at.to_i).at_least(1).times
        .and have_enqueued_job(LogActivityJob).with(idea, 'first published by user', user, idea.created_at.to_i).at_least(1).times
    end

    it "doesn't log a 'published' action job when publication_state is draft" do
      idea = create(:idea, publication_status: 'draft')
      expect {service.after_create(idea, user)}.
        to_not have_enqueued_job(LogActivityJob)
    end
  end

  describe "after_update" do
    it "logs a 'published' action job when publication_state goes from draft to published" do
      idea = create(:idea, publication_status: 'draft', author: user)
      idea.update(publication_status: 'published')
      expect {service.after_update(idea, user)}.
        to have_enqueued_job(LogActivityJob).with(idea, 'published', user, idea.created_at.to_i).at_least(1).times
        .and have_enqueued_job(LogActivityJob).with(idea, 'first published by user', user, idea.created_at.to_i).at_least(1).times
    end

    it "logs a 'changed_title' action job when the title has changed" do
      idea = create(:idea)
      idea.update(title_multiloc: {'en': 'changed'})
      expect {service.after_update(idea, user)}.
        to have_enqueued_job(LogActivityJob).with(idea, 'changed_title', user, idea.updated_at.to_i)
    end

    it "logs a 'changed_body' action job when the body has changed" do
      idea = create(:idea)
      idea.update(body_multiloc: {'en': 'changed'})
      expect {service.after_update(idea, user)}.
        to have_enqueued_job(LogActivityJob).with(idea, 'changed_body', user, idea.updated_at.to_i)
    end

    it "logs a 'changed_status' action job when the idea_status has changed" do
      idea = create(:idea)
      new_idea_status = create(:idea_status)
      idea.update(idea_status: new_idea_status)
      expect {service.after_update(idea, user)}.
        to have_enqueued_job(LogActivityJob).with(idea, 'changed_status', user, idea.updated_at.to_i, payload: {code: new_idea_status.code})
    end
  end

  describe "after_destroy" do
    it "logs a 'deleted' action job when the idea is destroyed" do
      idea = create(:idea)
      travel_to Time.now do
        frozen_idea = idea.destroy
        expect {service.after_destroy(frozen_idea, user)}.
          to have_enqueued_job(LogActivityJob)
      end
    end

  end

end
