require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "User Custom Fields" do

  before do
    header "Content-Type", "application/json"
    @custom_fields = create_list(:custom_field, 3)
  end

  get "web_api/v1/users/custom_fields" do
    with_options scope: :page do
      parameter :number, "Page number"
      parameter :size, "Number of custom fields per page"
    end
    
    example_request "List custom fields defined for users" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 3
    end
  end

  get "web_api/v1/users/custom_fields/:id" do
    let(:id) { @custom_fields.first.id }

    example_request "Get one custom field by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @custom_fields.first.id
    end
  end

  context "when authenticated as admin" do
    before do
      @user = create(:admin)
      token = Knock::AuthToken.new(payload: { sub: @user.id }).token
      header 'Authorization', "Bearer #{token}"
    end

    post "web_api/v1/users/custom_fields" do
      with_options scope: :custom_field do
        parameter :key, "A unique internal name for the field. Only letters, numbers and underscores allowed. Can't be changed afterwards", required: true
        parameter :input_type, "The type of input presented to the user. One of #{CustomField::INPUT_TYPES.join(", ")}. Can't be changed afterwards", required: true
        parameter :title_multiloc, "The title of the field as shown to users, in multiple locales", required: true
        parameter :description_multiloc, "An optional description of the field, as shown to users, in multiple locales", required: false
        parameter :required, "Whether filling out the field is mandatory. Defaults to false", required: false
        parameter :ordering, "Optional integer that is used to sort the fields", required: false
      end

      ValidationErrorHelper.new.error_fields(self, CustomField)

      let(:custom_field) { build(:custom_field) }

      describe do
        let(:key) { custom_field.key }
        let(:input_type) { custom_field.input_type }
        let(:title_multiloc) { custom_field.title_multiloc }
        let(:description_multiloc) { custom_field.description_multiloc }
        let(:required) { custom_field.required }
        let(:ordering) { custom_field.ordering }

        example_request "Create a custom field on users" do
          expect(response_status).to eq 201
          json_response = json_parse(response_body)
          expect(json_response.dig(:data,:attributes,:key)).to match key
          expect(json_response.dig(:data,:attributes,:input_type)).to match input_type
          expect(json_response.dig(:data,:attributes,:title_multiloc).stringify_keys).to match title_multiloc
          expect(json_response.dig(:data,:attributes,:description_multiloc).stringify_keys).to match description_multiloc
          expect(json_response.dig(:data,:attributes,:required)).to match required
          expect(json_response.dig(:data,:attributes,:ordering)).to match ordering
        end
      end

      describe do
        let(:key) { "No spaces allowed" }
        let(:title_multiloc) { {'en' => ""} }

        example_request "[error] Create an invalid custom field" do
          expect(response_status).to eq 422
          json_response = json_parse(response_body)
          expect(json_response.dig(:errors, :key)).to eq [{error: 'invalid', value: key}]
          expect(json_response.dig(:errors, :title_multiloc)).to eq [{error: 'blank'}]
        end
      end

    end

    patch "web_api/v1/users/custom_fields/:id" do
      with_options scope: :custom_field do
        parameter :title_multiloc, "The title of the field as shown to users, in multiple locales", required: false
        parameter :description_multiloc, "An optional description of the field, as shown to users, in multiple locales", required: false
        parameter :required, "Whether filling out the field is mandatory", required: false
        parameter :ordering, "Optional integer that is used to sort the fields", required: false
      end
      ValidationErrorHelper.new.error_fields(self, CustomField)

      let(:id) { create(:custom_field).id }
      let(:title_multiloc) { {"en" => "New title"} }
      let(:description_multiloc) { {"en" => "New description"} }
      let(:required) { true }
      let(:ordering) { 8 }

      example_request "Update a custom field" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.dig(:data,:attributes,:title_multiloc).stringify_keys).to match title_multiloc
        expect(json_response.dig(:data,:attributes,:description_multiloc).stringify_keys).to match description_multiloc
        expect(json_response.dig(:data,:attributes,:required)).to match required
        expect(json_response.dig(:data,:attributes,:ordering)).to match ordering
      end
    end


    delete "web_api/v1/users/custom_fields/:id" do
      let(:custom_field) { create(:custom_field) }
      let(:id) { custom_field.id }

      example_request "Delete a custom field" do
        expect(response_status).to eq 200
        expect{CustomField.find(id)}.to raise_error(ActiveRecord::RecordNotFound)
      end
    end

  end

end