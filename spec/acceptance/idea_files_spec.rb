require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "IdeaFile" do

  explanation "File attachments."

  before do
    header "Content-Type", "application/json"
    @user = create(:user)
    token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    header 'Authorization', "Bearer #{token}"
    @idea = create(:idea, author: @user)
    create_list(:idea_file, 2, idea: @idea)
  end

  get "web_api/v1/ideas/:idea_id/files" do
    let(:idea_id) { @idea.id }

    example_request "List all file attachments of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
    end
  end

  get "web_api/v1/ideas/:idea_id/files/:file_id" do
    let(:idea_id) { @idea.id }
    let(:file_id) { IdeaFile.first.id }

    example_request "Get one file attachment of an idea by id" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:file)).to be_present
    end
  end

  post "web_api/v1/ideas/:idea_id/files" do
    with_options scope: :file do
      parameter :file, "The base64 encoded file", required: true
      parameter :ordering, "An integer that is used to order the files within an idea", required: false
    end
    ValidationErrorHelper.new.error_fields(self, IdeaFile)
    let(:idea_id) { @idea.id }
    let(:file) { encode_file_as_base64("afvalkalender.pdf") }
    let(:ordering) { 1 }

    example_request "Add a file attachment to an idea" do
      expect(response_status).to eq 201
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:file)).to be_present
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(1)
    end
  end

  patch "web_api/v1/ideas/:idea_id/files/:file_id" do
    with_options scope: :file do
      parameter :file, "The base64 encoded file"
      parameter :ordering, "An integer that is used to order the file attachments within an idea"
    end
    ValidationErrorHelper.new.error_fields(self, IdeaFile)
    let(:idea_id) { @idea.id }
    let(:file_id) { IdeaFile.first.id }
    let(:file) { encode_file_as_base64("afvalkalender.pdf") }
    let(:ordering) { 2 }

    example_request "Update a file attachment for an idea" do
      expect(response_status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:file)).to be_present
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(2)
    end
  end

  delete "web_api/v1/ideas/:idea_id/files/:file_id" do
    let(:idea_id) { @idea.id }
    let(:file_id) { IdeaFile.first.id }

    example_request "Delete a file attachment from an idea" do
      expect(response_status).to eq 200
      expect{IdeaFile.find(file_id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end


  private

  def encode_file_as_base64 filename
    "data:application/pdf;base64,#{Base64.encode64(File.read(Rails.root.join("spec", "fixtures", filename)))}"
  end

end