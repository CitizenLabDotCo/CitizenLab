require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource 'Ideas' do

  before do
    header 'Content-Type', 'application/json'
    @user = create(:user)
    token = Knock::AuthToken.new(payload: @user.to_token_payload).token
    header 'Authorization', "Bearer #{token}"
  end

  post 'web_api/v1/ideas' do
    before do
      IdeaStatus.create_defaults
      SettingsService.new.activate_feature! 'moderation'
      SettingsService.new.activate_feature! 'flag_inappropriate_content'
      @project = create(:continuous_project)
    end

    with_options scope: :idea do
      parameter :project_id, 'The identifier of the project that hosts the idea', extra: ''
      parameter :publication_status, 'Publication status', required: true, extra: "One of #{Post::PUBLICATION_STATUSES.join(',')}"
      parameter :title_multiloc, 'Multi-locale field with the idea title', required: true, extra: 'Maximum 100 characters'
      parameter :body_multiloc, 'Multi-locale field with the idea body', extra: 'Required if not draft'
      parameter :location_point_geojson, 'A GeoJSON point that situates the location the idea applies to'
      parameter :location_description, 'A human readable description of the location the idea applies to'
    end

    let(:idea) { build(:idea) }
    let(:project_id) { @project.id }
    let(:publication_status) { 'published' }
    let(:title_multiloc) { idea.title_multiloc }
    let(:body_multiloc) { idea.body_multiloc }
    let(:location_description) { 'Stanley Road 4' }

    example 'Toxicity detection job is enqueued when creating an idea' do
      expect {
        do_request
      }.to have_enqueued_job(ToxicityDetectionJob)
    end
  end

  patch 'web_api/v1/ideas/:id' do
    before do
      SettingsService.new.activate_feature! 'moderation'
      SettingsService.new.activate_feature! 'flag_inappropriate_content'
      @idea =  create(:idea, author: @user)
    end

    with_options scope: :idea do
      parameter :title_multiloc, 'Multi-locale field with the idea title', extra: 'Maximum 100 characters'
      parameter :body_multiloc, 'Multi-locale field with the idea body', extra: 'Required if not draft'
      parameter :location_description, 'A human readable description of the location the idea applies to'
      parameter :budget, 'The budget needed to realize the idea, as determined by the city'
    end

    let(:id) { @idea.id }

    describe do
      let(:title_multiloc) { {'en' => 'Changed title' } }
      let(:location_description) { 'Watkins Road 8' }

      example 'Toxicity detection job is enqueued when updating an idea\'s title and location description' do
        expect {
          do_request
        }.to have_enqueued_job(ToxicityDetectionJob).with(@idea, attributes: [:title_multiloc, :location_description])
      end
    end

    describe do
      let(:budget) { 11 }

      example 'No toxicity detection job is enqueued when updating idea attributes without text' do
        expect {
          do_request
        }.not_to have_enqueued_job(ToxicityDetectionJob)
      end
    end
  end

end