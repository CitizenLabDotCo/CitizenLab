require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Taggings" do

  explanation "The link between a tag and a piece of content (ideas for now)"

  before do
    header "Content-Type", "application/json"
    @user = create(:admin)
    token = Knock::AuthToken.new(payload: @user.to_token_payload).token
    header 'Authorization', "Bearer #{token}"
  end

  post "web_api/v1/taggings" do
    parameter :idea_id, "The idea to tag", required: true
    parameter :tag_id, "The id of the tag to assign", required: false
    parameter :tag_attributes, "The content to create a tag and assign it", required: false


    context do
      let(:idea_id) { create(:idea).id }
      let(:tag_id) { Tagging::Tag.create(title_multiloc: { en: 'Fish' }).id }

      example_request "Create a tagging with tag_id" do
        expect(response_status).to eq 201
      end
    end

    context do
      let(:idea_id) { create(:idea).id }
      let(:tag_attributes) { { title_multiloc: { en: 'Apples' } } }

      example_request "Create a tagging with tag attributes" do
        expect(response_status).to eq 201
      end
    end
  end

end
