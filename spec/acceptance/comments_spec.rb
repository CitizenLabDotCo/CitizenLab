require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "Comments" do

  explanation "Comments permit users to have discussions about content (i.e. ideas)."

  before do
    header "Content-Type", "application/json"
    @project = create(:continuous_project, with_permissions: true)
    @idea = create(:idea, project: @project)
  end

  get "web_api/v1/ideas/:idea_id/comments" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of top-level comments per page. The response will include some child comments too, so expect to receive more"
    end
    parameter :parent, "Only list the child comments of the given comment id. When specified, the pagination behaves normally"

    before do
      @c1 = create(:comment, idea: @idea)
      @c2 = create(:comment, idea: @idea)
      @c1sub1 = create(:comment, parent: @c2, idea: @idea)
      @c1sub2 = create(:comment, parent: @c2, idea: @idea)
      @c1sub3 = create(:comment, parent: @c2, idea: @idea)
      @c1sub4 = create(:comment, parent: @c2, idea: @idea)
      @c1sub5 = create(:comment, parent: @c2, idea: @idea)
      @c3 = create(:comment, idea: @idea)
      @c3sub1 = create(:comment, parent: @c3, idea: @idea)
      @c3sub2 = create(:comment, parent: @c3, idea: @idea)
      @c3sub3 = create(:comment, parent: @c3, idea: @idea)
      @c3sub4 = create(:comment, parent: @c3, idea: @idea)
      @c3sub5 = create(:comment, parent: @c3, idea: @idea)
      @c3sub6 = create(:comment, parent: @c3, idea: @idea)
      @c4 = create(:comment, idea: @idea)
      @c4sub1 = create(:comment, parent: @c4, idea: @idea)
    end

    let(:idea_id) { @idea.id }
    let(:size) { 3 }

    example_request "List the top-level comments of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 10
      expect(json_response[:data].map{|d| d[:id]}).to eq([
        @c1,
        @c2,
        @c1sub1,
        @c1sub2,
        @c1sub3,
        @c1sub4,
        @c1sub5,
        @c3,
        @c3sub5,
        @c3sub6,
      ].map(&:id))
      expect(json_response[:meta][:total]).to eq 4
    end

  end

  get "web_api/v1/comments/:comment_id/children" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of comments per page"
    end

    before do
      @c = create(:comment, idea: @idea)
      @csub1 = create(:comment, parent: @c, idea: @idea)
      @csub2 = create(:comment, parent: @c, idea: @idea)
      @csub3 = create(:comment, parent: @c, idea: @idea)
      @csub4 = create(:comment, parent: @c, idea: @idea)
      @csub5 = create(:comment, parent: @c, idea: @idea)
      @csub6 = create(:comment, parent: @c, idea: @idea)
      @c2 = create(:comment, idea: @idea)
    end

    let(:comment_id) { @c.id }

    example_request "List the direct child comments of a comment" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 6
      expect(json_response[:data].map{|d| d[:id]}).to eq([
        @csub1,
        @csub2,
        @csub3,
        @csub4,
        @csub5,
        @csub6,
      ].map(&:id))
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
    let(:id) { create(:comment).id }

    example_request "Get one comment by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq id
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
        expect(@idea.reload.comments_count).to eq 1
      end

      describe do
        let(:parent_id) { create(:comment, idea: @idea).id }

        example_request "Create a comment on a comment" do
          expect(response_status).to eq 201
          json_response = json_parse(response_body)
          expect(json_response.dig(:data,:relationships,:author,:data,:id)).to eq @user.id
          expect(json_response.dig(:data,:attributes,:body_multiloc).stringify_keys).to match body_multiloc
          expect(json_response.dig(:data,:relationships,:parent,:data, :id)).to eq parent_id
          expect(json_response.dig(:data,:relationships,:idea,:data,:id)).to eq idea_id
          expect(@idea.reload.comments_count).to eq 2
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
          expect(response_status).to be >= 400
        end
      end

      describe do
        before do
          project = create(:continuous_budgeting_project, with_permissions: true)
          @idea.project = project
          @idea.save!
        end

        example "Commenting should be enabled by default in a budgeting project", document: false do
          do_request
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
        expect(@idea.reload.comments_count).to eq 1
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
