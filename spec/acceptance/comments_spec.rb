require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "Comments" do

  explanation "Comments permit users to have discussions about content (i.e. ideas)."

  before do
    header "Content-Type", "application/json"
    @project = create(:continuous_project, with_permissions: true)
    @idea = create(:idea, project: @project)
    @comments = ['published','deleted'].map{|ps| create(:comment, idea: @idea, publication_status: ps)}
  end

  get "web_api/v1/ideas/:idea_id/comments" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of comments per page"
    end

    let(:idea_id) { @idea.id }

    example_request "List all comments of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
      published_comment_data = json_response[:data].select{|cd| cd.dig(:attributes,:publication_status) == 'published'}&.first
      expect(published_comment_data).to be_present
      expect(published_comment_data.dig(:attributes,:body_multiloc)).to be_present
      deleted_comment_data = json_response[:data].select{|cd| cd.dig(:attributes,:publication_status) == 'deleted'}&.first
      expect(deleted_comment_data).to be_present
      expect(deleted_comment_data.dig(:attributes,:body_multiloc)).to be_blank
    end
  end

  get "web_api/v1/comments/as_xlsx" do
    parameter :project, 'Filter by project', required: false
    parameter :ideas, 'Filter by a given list of idea ids', required: false

    example_request "XLSX export" do
      expect(status).to eq 200
    end

    describe do
      before do 
        @project = create(:project)
        @comments = 3.times.collect do |i|
          create(:comment, idea: create(:idea, project: @project))
        end
      end
      let(:project) { @project.id }

      example_request 'XLSX export by project', document: false do
        expect(status).to eq 200
        worksheet = RubyXL::Parser.parse_buffer(response_body).worksheets[0]
        expect(worksheet.count).to eq (@comments.size + 1)
      end
    end

    describe do
      before do 
        @comments = create_list(:comment, 4)
      end
      let(:ideas) { @comments.map(&:idea_id) }
      
      example_request 'XLSX export by idea ids', document: false do
        expect(status).to eq 200
        worksheet = RubyXL::Parser.parse_buffer(response_body).worksheets[0]
        expect(worksheet.count).to eq (ideas.size + 1)
      end
    end
  end

  get "web_api/v1/comments/:id" do
    let(:id) { @comments.first.id }

    example_request "Get one comment by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @comments.first.id
    end
  end

  context "when authenticated" do
    before do
      @user = create(:user)
      token = Knock::AuthToken.new(payload: { sub: @user.id }).token
      header 'Authorization', "Bearer #{token}"
    end

    get "web_api/v1/ideas/:idea_id/comments" do
      let(:idea_id) { @idea.id }

      example "List all comments includes the user_vote when authenticated" do
        comment = create(:comment, idea: @idea)
        vote = create(:vote, user: @user, votable: comment)
        do_request
        json_response = json_parse(response_body)
        expect(json_response[:data].map{|d| d[:relationships][:user_vote][:data]}.compact.first[:id]).to eq vote.id
        expect(json_response[:included].map{|i| i[:id]}).to include vote.id
      end
    end

    post "web_api/v1/ideas/:idea_id/comments" do
      with_options scope: :comment do
        parameter :author_id, "The user id of the user owning the comment. Signed in user by default", required: false
        parameter :body_multiloc, "Multi-locale field with the comment body", required: true
        parameter :parent_id, "The id of the comment this comment is a response to", required: false
      end
      ValidationErrorHelper.new.error_fields(self, Comment)
      response_field :base, "Array containing objects with signature { error: #{ParticipationContextService::COMMENTING_DISABLED_REASONS.values.join(' | ')} }", scope: :errors

      let(:idea_id) { @idea.id }
      let(:comment) { build(:comment) }
      let(:body_multiloc) { comment.body_multiloc }

      example_request "Create a comment on an idea" do
        expect(response_status).to eq 201
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:relationships,:author,:data,:id)).to eq @user.id
        expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
        expect(json_response.dig(:data,:relationships,:parent,:data)).to be_nil
        expect(json_response.dig(:data,:relationships,:idea,:data,:id)).to eq idea_id
        expect(@idea.reload.comments_count).to eq 3
      end

      describe do
        let(:parent_id) { @comments.first.id }

        example_request "Create a comment on a comment" do
          expect(response_status).to eq 201
          json_response = json_parse(response_body)
          expect(json_response.dig(:data,:relationships,:author,:data,:id)).to eq @user.id
          expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
          expect(json_response.dig(:data,:relationships,:parent,:data, :id)).to eq parent_id
          expect(json_response.dig(:data,:relationships,:idea,:data,:id)).to eq idea_id
          expect(@idea.reload.comments_count).to eq 3
        end
      end

      describe do
        let(:body_multiloc) { {"fr-FR" => ""} }

        example_request "[error] Create an invalid comment" do
          expect(response_status).to eq 422
          json_response = json_parse(response_body)
          expect(json_response.dig(:errors, :body_multiloc)).to eq [{error: 'blank'}]
        end
      end

      describe do
        before do
          project = create(:project_with_past_phases)
          @idea.project = project
          @idea.save
        end
        
        example_request "[error] Create a comment on an idea in an inactive project" do
          expect(response_status).to eq 422
          json_response = json_parse(response_body)
          expect(json_response.dig(:errors, :base)&.first&.dig(:error)).to eq ParticipationContextService::COMMENTING_DISABLED_REASONS[:project_inactive]
        end
      end

      describe do
        before do
          project = create(:continuous_budgeting_project, with_permissions: true)
          @idea.project = project
          @idea.save!
        end

        example_request "Commenting should be enabled by default in a budgeting project", document: false do
          expect(response_status).to eq 201
        end
      end
    end

    post "web_api/v1/comments/:id/mark_as_deleted" do
      with_options scope: :comment do
        parameter :reason_code, "one of #{Notifications::CommentDeletedByAdmin::REASON_CODES}; only required for admins", required: false
        parameter :other_reason, "the reason for deleting the comment, if none of the reason codes is applicable, in which case 'other' must be chosen", required: false
      end

      let(:comment) { create(:comment, author: @user, idea: @idea) }
      let(:id) { comment.id }

      example_request "Mark a comment as deleted" do
        expect(response_status).to eq 200
        expect(comment.reload.publication_status).to eq('deleted')
      end

      example "Admins cannot mark a comment as deleted without a reason", document: false do
        @admin = create(:admin)
        token = Knock::AuthToken.new(payload: { sub: @admin.id }).token
        header 'Authorization', "Bearer #{token}"
        do_request
        expect(response_status).to eq 422
      end
    end

    patch "web_api/v1/comments/:id" do
      with_options scope: :comment do
        parameter :author_id, "The user id of the user owning the comment. Signed in user by default"
        parameter :body_multiloc, "Multi-locale field with the comment body"
        parameter :parent_id, "The id of the comment this comment is a response to"
      end
      ValidationErrorHelper.new.error_fields(self, Comment)
      response_field :base, "Array containing objects with signature { error: #{ParticipationContextService::COMMENTING_DISABLED_REASONS.values.join(' | ')} }", scope: :errors

      let(:comment) { create(:comment, author: @user, idea: @idea) }
      let(:id) { comment.id }
      let(:body_multiloc) { {'en' => "His hair is not blond, it's orange. Get your facts straight!"} }

      example_request "Update a comment" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
        expect(@idea.reload.comments_count).to eq 3
      end

      example "Admins cannot modify a comment", document: false do
        @admin = create(:admin)
        token = Knock::AuthToken.new(payload: { sub: @admin.id }).token
        header 'Authorization', "Bearer #{token}"
        do_request
        expect(comment.reload.body_multiloc).not_to eq body_multiloc
      end
    end

    ## Currently not allowed by anyone, but works at the moment of writing (if permitted, that is)
    # delete "web_api/v1/comments/:id" do
    #   let(:comment) { create(:comment, author: @user, idea: @idea) }
    #   let(:id) { comment.id }
    #   example_request "Delete a comment" do
    #     expect(response_status).to eq 200
    #     expect{Comment.find(id)}.to raise_error(ActiveRecord::RecordNotFound)
    #     expect(@idea.reload.comments_count).to eq 2
    #   end
    # end

  end
end