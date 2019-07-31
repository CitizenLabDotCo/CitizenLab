require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "InitiativeStatusChange" do

  explanation "Initiative status changes allow admins to apply manual status changes on initiatives."

  before do
    header "Content-Type", "application/json"
    @initiative = create(:initiative)
    @changes = create_list(:initiative_status_change, 2, initiative: @initiative)
  end

  get "web_api/v1/initiatives/:initiative_id/initiative_status_changes" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of status changes per page"
    end

    let(:initiative_id) { @initiative.id }

    example_request "List all status changes of an initiative" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 3
      expect(json_response.dig(:data,0,:attributes,:created_at)).to be_present
    end
  end

  get "web_api/v1/initiative_status_changes/:id" do
    let(:id) { @changes.first.id }

    example_request "Get one status changes on an initiative by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @changes.first.id
    end
  end

  context "when authenticated" do
    before do
      @user = create(:admin)
      token = Knock::AuthToken.new(payload: { sub: @user.id }).token
      header 'Authorization', "Bearer #{token}"

      TenantTemplateService.new.resolve_and_apply_template 'base', external_subfolder: false
      create(
        :initiative_status_change, 
        initiative: @initiative, initiative_status: InitiativeStatus.find_by(code: 'threshold_reached')
        )
    end

    post "web_api/v1/initiatives/:initiative_id/initiative_status_changes" do
      with_options scope: :initiative_status_change do
        parameter :initiative_status_id, "The new initiative status", required: true
        parameter :user_id, "The user who made the status change", required: false
        parameter :official_feedback_id, "An existing official feedback can be used", required: false
      end
      with_options scope: [:initiative_status_change, :official_feedback_attributes] do
        parameter :body_multiloc, "Multi-locale field with the feedback body", required: false
        parameter :author_multiloc, "Multi-locale field with describing the author", required: false
      end
      ValidationErrorHelper.new.error_fields(self, OfficialFeedback)

      let(:initiative_id) { @initiative.id }
      let(:initiative_status_id) { InitiativeStatus.find_by(code: 'answered').id }
      let(:feedback) { build(:official_feedback) }
      let(:body_multiloc) { feedback.body_multiloc }
      let(:author_multiloc) { feedback.author_multiloc }

      example_request "Create a status change on an initiative with new feedback" do
        expect(response_status).to eq 201
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:relationships,:user,:data,:id)).to eq @user.id
        expect(@initiative.reload.official_feedbacks_count).to eq 1
      end

      describe do
        let(:official_feedback_id) { create(:official_feedback, post: @initiative).id }
        let(:body_multiloc) { nil }
        let(:author_multiloc) { nil }

        example_request "Create a status change on an initiative using an existing feedback" do
          expect(response_status).to eq 201
          expect(@initiative.reload.official_feedbacks_count).to eq 1
        end
      end
    end
  end

  # context "when authenticated as normal user" do
  #   before do
  #     @user = create(:user)
  #     token = Knock::AuthToken.new(payload: { sub: @user.id }).token
  #     header 'Authorization', "Bearer #{token}"
  #   end

  #   post "web_api/v1/initiatives/:initiative_id/official_feedback" do
  #     with_options scope: :official_feedback do
  #       parameter :body_multiloc, "Multi-locale field with the feedback body", required: true
  #       parameter :author_multiloc, "Multi-locale field with describing the author", required: true
  #     end
  #     ValidationErrorHelper.new.error_fields(self, OfficialFeedback)

  #     let(:initiative_id) { @initiative.id }
  #     let(:feedback) { build(:official_feedback) }
  #     let(:body_multiloc) { feedback.body_multiloc }
  #     let(:author_multiloc) { feedback.author_multiloc }

  #     example_request "[error] Create an official feedback on an initiative" do
  #       expect(response_status).to eq 401
  #     end
  #   end
  # end
end
