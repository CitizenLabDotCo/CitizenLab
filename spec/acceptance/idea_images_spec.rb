require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "IdeaImage" do

  explanation "Ideas can have mutliple images."

  before do
    header "Content-Type", "application/json"
    @user = create(:user)
    token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    header 'Authorization', "Bearer #{token}"
    @idea = create(:idea, author: @user)
    create_list(:idea_image, 2, idea: @idea)
  end

  get "web_api/v1/ideas/:idea_id/images" do
    let(:idea_id) { @idea.id }

    example_request "List all images of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
    end
  end

  get "web_api/v1/ideas/:idea_id/images/:image_id" do
    let(:idea_id) { @idea.id }
    let(:image_id) { IdeaImage.first.id }

    example_request "Get one image of an idea" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:versions).keys).to match %i(small medium large)
    end
  end

  post "web_api/v1/ideas/:idea_id/images" do
    with_options scope: :image do
      parameter :image, "The base64 encoded image", required: true
      parameter :ordering, "An integer that is used to order the images within an idea", required: false
    end
    ValidationErrorHelper.new.error_fields(self, IdeaImage)
    let(:idea_id) { @idea.id }
    let(:image) { encode_image_as_base64("image13.png") }
    let(:ordering) { 1 }

    example_request "Add an image to an idea" do
      expect(response_status).to eq 201
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:versions).keys).to match %i(small medium large)
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(1)
    end
  end

  patch "web_api/v1/ideas/:idea_id/images/:image_id" do
    with_options scope: :image do
      parameter :image, "The base64 encoded image"
      parameter :ordering, "An integer that is used to order the images within an idea"
    end
    ValidationErrorHelper.new.error_fields(self, IdeaImage)
    let(:idea_id) { @idea.id }
    let(:image_id) { IdeaImage.first.id }
    let(:image) { encode_image_as_base64("image14.png") }
    let(:ordering) { 2 }

    example_request "Edit an image for an idea" do
      expect(response_status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:versions).keys).to match %i(small medium large)
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(2)
    end
  end

  delete "web_api/v1/ideas/:idea_id/images/:image_id" do
    let(:idea_id) { @idea.id }
    let(:image_id) { IdeaImage.first.id }

    example_request "Delete an image on an idea" do
      expect(response_status).to eq 200
      expect{IdeaImage.find(image_id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  private

  def encode_image_as_base64 filename
    "data:image/png;base64,#{Base64.encode64(File.read(Rails.root.join("spec", "fixtures", filename)))}"
  end

end