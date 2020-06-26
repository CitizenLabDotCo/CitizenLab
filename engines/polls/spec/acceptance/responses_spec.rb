require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "Poll Responses" do
 
  explanation "A poll response is an answer by a user to all poll questions associated to the same participation context. A poll response contains response options that associate the options picked by the user"

  before do
    header "Content-Type", "application/json"
    @user = create(:admin, locale: 'en')
    token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    header 'Authorization', "Bearer #{token}"
  end


  get "web_api/v1/projects/:participation_context_id/poll_responses/as_xlsx" do
    context "non-anonymous poll" do
      before do
        @participation_context = create(:continuous_poll_project)
        @q1 = create(:poll_question, :with_options, participation_context: @participation_context)
        @q2 = create(:poll_question, :with_options, participation_context: @participation_context)
        r1 = create(:poll_response, participation_context: @participation_context)
        r1.update!(response_options: [@q1,@q2].map{|q| create(:poll_response_option, response: r1, option: q.options.first)})
        r2 = create(:poll_response, participation_context: @participation_context)
        r2.update!(response_options: [@q1,@q2].map{|q| create(:poll_response_option, response: r2, option: q.options.last)})
        @q1.options.first.destroy!
        @q2.destroy!
        @q3 = create(:poll_question, :with_options, participation_context: @participation_context)
      end

      let(:participation_context_id) { @participation_context.id }

      example_request "XLSX export for a non-anonymous poll" do
        expect(status).to eq 200
        worksheet = RubyXL::Parser.parse_buffer(response_body).worksheets[0]
        headers = worksheet[0].cells.map(&:value).map(&:downcase)

        expect(worksheet.count).to eq 3
        expect(headers).not_to include "email"
        expect(worksheet[0][2].value.to_s).to eq @q3.title_multiloc['en']
        expect(worksheet[1][1].value.to_s).to eq ''
        expect(worksheet[1][2].value.to_s).to eq ''
        expect(worksheet[2][1].value.to_s).to eq @q1.options.last.title_multiloc['en']
        expect(worksheet[2][2].value.to_s).to eq ''
      end
    end
    context "anonymous poll" do
      before do
        @participation_context = create(:continuous_poll_project, poll_anonymous: true)
        @q1 = create(:poll_question, :with_options, participation_context: @participation_context)
        @u1 = create(:user)
        @r1 = create(:poll_response,
          user: @u1,
          participation_context: @participation_context,
          response_options: [create(:poll_response_option, option: @q1.options.first)]
        )
      end

      let (:participation_context_id) { @participation_context.id }

      example_request "XLSX export for an anonymous poll" do
        expect(status).to eq 200
        worksheet = RubyXL::Parser.parse_buffer(response_body).worksheets[0]
        expect(worksheet[0][0].value.to_s).to eq @q1.title_multiloc['en']
        worksheet.each do |row|
          row.cells.each do |cell|
            expect(cell.value.to_s).not_to include @u1.id
            expect(cell.value.to_s).not_to include @u1.email
          end
        end
      end
    end
  end

  post "web_api/v1/projects/:participation_context_id/poll_responses" do
    parameter :response_options_attributes, "Array with response option objects", required: true, scope: :response
    parameter :option_id, "The id of the option the user selected", required: true, scope: [:response, :response_options_attributes]

    ValidationErrorHelper.new.error_fields(self, Polls::Response)
    ValidationErrorHelper.new.error_fields(self, Polls::ResponseOption)
    response_field :base, "Array containing objects with signature {error: 'not_all_questions_one_option'}", scope: :errors


    let(:pc) { create(:continuous_poll_project, with_permissions: true)}
    let(:participation_context_id) { pc.id }
    let(:q1) { create(:poll_question, :with_options, participation_context: pc) }
    let(:q2) { create(:poll_question_multiple_options, :with_options, participation_context: pc) }
    let(:response_options_attributes) {[
      {option_id: q1.options.first.id},
      {option_id: q2.options.last.id},
    ]}

    example_request "Create a poll response in a project" do
      expect(response_status).to eq 201
    end
  end

  post "web_api/v1/phases/:participation_context_id/poll_responses" do
    parameter :response_options_attributes, "Array with response option objects", required: true, scope: :response
    parameter :option_id, "The id of the option the user selected", required: true, scope: [:response, :response_options_attributes]

    ValidationErrorHelper.new.error_fields(self, Polls::Response)
    ValidationErrorHelper.new.error_fields(self, Polls::ResponseOption)

    let(:project) { create(:project_with_current_phase, with_permissions: true, current_phase_attrs: { participation_method: 'poll' }) }
    let(:pc) { project.phases[2] }
    let(:participation_context_id) { pc.id }
    let(:q1) { create(:poll_question, :with_options, participation_context: pc) }
    let(:q2) { create(:poll_question, :with_options, participation_context: pc)}
    let(:response_options_attributes) {[
      {option_id: q1.options.first.id},
      {option_id: q2.options.last.id},
    ]}

    example_request "Create a poll response in a phase" do
      expect(response_status).to eq 201
    end
  end

end
