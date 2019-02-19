require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "OfficialFeedback" do

  explanation "Official feedback is input from moderators on content (i.e. ideas), separated from comments."

  before do
    header "Content-Type", "application/json"
    @project = create(:continuous_project, with_permissions: true)
    @idea = create(:idea, project: @project)
    @feedbacks = create_list(:official_feedback, 2, idea: @idea)
  end

  get "web_api/v1/ideas/:idea_id/official_feedback" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of official feedback per page"
    end

    let(:idea_id) { @idea.id }

    example_request "List all official feedback of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
      expect(json_response.dig(:data,0,:attributes,:body_multiloc)).to be_present
      expect(json_response.dig(:data,0,:attributes,:author_multiloc)).to be_present
    end
  end

  get "web_api/v1/official_feedback/:id" do
    let(:id) { @feedbacks.first.id }

    example_request "Get one official feedback by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @feedbacks.first.id
    end
  end

  context "when authenticated" do
    before do
      @user = create(:moderator, project: @project)
      token = Knock::AuthToken.new(payload: { sub: @user.id }).token
      header 'Authorization', "Bearer #{token}"
    end

    post "web_api/v1/ideas/:idea_id/official_feedback" do
      with_options scope: :official_feedback do
        parameter :body_multiloc, "Multi-locale field with the feedback body", required: true
        parameter :author_multiloc, "Multi-locale field with describing the author", required: true
      end
      ValidationErrorHelper.new.error_fields(self, OfficialFeedback)

      let(:idea_id) { @idea.id }
      let(:feedback) { build(:official_feedback) }
      let(:body_multiloc) { feedback.body_multiloc }
      let(:author_multiloc) { feedback.author_multiloc }

      example_request "Create an official feedback on an idea" do
        expect(response_status).to eq 201
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:relationships,:user,:data,:id)).to eq @user.id
        expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
        expect(json_response.dig(:data,:attributes,:author_multiloc).stringify_keys).to match author_multiloc
        expect(json_response.dig(:data,:relationships,:idea,:data,:id)).to eq idea_id
        expect(@idea.reload.admin_feedbacks_count).to eq 3
      end

      describe do
        let(:body_multiloc) { {"en" => ""} }

        example_request "[error] Create an invalid official feedback" do
          expect(response_status).to eq 422
          json_response = json_parse(response_body)
          expect(json_response.dig(:errors, :body_multiloc)).to eq [{error: 'blank'}]
        end
      end
    end

    patch "web_api/v1/official_feedback/:id" do
      with_options scope: :official_feedback do
        parameter :body_multiloc, "Multi-locale field with the feedback body", required: true
        parameter :author_multiloc, "Multi-locale field with describing the author", required: true
      end
      ValidationErrorHelper.new.error_fields(self, AdminFeedback)

      let(:official_feedback) { create(:official_feedback, user: @user, idea: @idea) }
      let(:id) { official_feedback.id }
      let(:body_multiloc) { {'en' => "His hair is not blond, it's orange. Get your facts straight!"} }

      example_request "Update an official feedback" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
        expect(@idea.reload.official_feedbacks_count).to eq 3
      end
    end

    delete "web_api/v1/official_feedback/:id" do
      let(:official_feedback) { create(:official_feedback, user: @user, idea: @idea) }
      let(:id) { official_feedback.id }
      example_request "Delete an official feedback" do
        expect(response_status).to eq 200
        expect{OfficialFeedback.find(id)}.to raise_error(ActiveRecord::RecordNotFound)
        expect(@idea.reload.official_feedbacks_count).to eq 2
      end
    end

  end

  context "when authenticated as normal user" do
    before do
      @user = create(:user)
      token = Knock::AuthToken.new(payload: { sub: @user.id }).token
      header 'Authorization', "Bearer #{token}"
    end

    post "web_api/v1/ideas/:idea_id/official_feedback" do
      with_options scope: :official_feedback do
        parameter :body_multiloc, "Multi-locale field with the feedback body", required: true
        parameter :author_multiloc, "Multi-locale field with describing the author", required: true
      end
      ValidationErrorHelper.new.error_fields(self, OfficialFeedback)

      let(:idea_id) { @idea.id }
      let(:feedback) { build(:official_feedback) }
      let(:body_multiloc) { feedback.body_multiloc }
      let(:author_multiloc) { feedback.author_multiloc }

      example_request "[error] Create an official feedback on an idea" do
        expect(response_status).to eq 401
      end
    end
  end
end
