require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "PageFile" do

  explanation "Page attachments."

  before do
    header "Content-Type", "application/json"
    @user = create(:admin)
    token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    header 'Authorization', "Bearer #{token}"
    @page = create(:page)
    create_list(:page_file, 2, page: @page)
  end

  get "web_api/v1/pages/:page_id/files" do
    let(:page_id) { @page.id }

    example_request "List all file attachments of a page" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
    end
  end

  get "web_api/v1/pages/:page_id/files/:file_id" do
    let(:page_id) { @page.id }
    let(:file_id) { PageFile.first.id }

    example_request "Get one file of a page" do
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:file)).to be_present
    end
  end

  post "web_api/v1/pages/:page_id/files" do
    with_options scope: :file do
      parameter :file, "The base64 encoded file", required: true
      parameter :ordering, "An integer that is used to order the file attachments within a page", required: false
      parameter :name, "The name of the file, including the file extension", required: true
    end
    ValidationErrorHelper.new.error_fields(self, PageFile)
    let(:page_id) { @page.id }
    let(:ordering) { 1 }
    let(:name) { "afvalkalender.pdf" }
    let(:file) { encode_pdf_file_as_base64(name) }

    example_request "Add a file attachment to a page" do
      expect(response_status).to eq 201
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:file)).to be_present
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(1)
      expect(json_response.dig(:data,:attributes,:name)).to eq(name)
      expect(json_response.dig(:data,:attributes,:size)).to be_present
    end

    describe do
      let(:file) { encode_exe_file_as_base64("keylogger.exe") }

      example_request "[error] Add an unsupported file extension as attachment to a page" do
        expect(response_status).to eq 422
        json_response = json_parse(response_body)
        expect(json_response.dig(:errors,:file)).to include({:error=>"extension_whitelist_error"})
      end
    end

    describe do
      example "[error] Add a file of which the size is too large" do
        # mock the size_range method of PageFileUploader to have 3 bytes as maximum size
        expect_any_instance_of(PageFileUploader).to receive(:size_range).and_return(1..3)

        do_request
        expect(response_status).to eq 422
        json_response = json_parse(response_body)
        expect(json_response.dig(:errors,:file)).to include({:error=>"max_size_error"})
      end
    end
  end

  patch "web_api/v1/pages/:page_id/files/:file_id" do
    with_options scope: :file do
      parameter :file, "The base64 encoded file"
      parameter :ordering, "An integer that is used to order the file attachments within a page"
      parameter :name, "The name of the file, including the file extension"
    end
    ValidationErrorHelper.new.error_fields(self, PageFile)
    let(:page_id) { @page.id }
    let(:file_id) { PageFile.first.id }
    let(:name) { 'ophaalkalender.pdf' }
    let(:ordering) { 2 }

    example_request "Edit a file attachment for a page" do
      expect(response_status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:name)).to eq(name)
      expect(json_response.dig(:data,:attributes,:ordering)).to eq(2)
    end
  end

  delete "web_api/v1/pages/:page_id/files/:file_id" do
    let(:page_id) { @page.id }
    let(:file_id) { PageFile.first.id }

    example_request "Delete a file attachment from a page" do
      expect(response_status).to eq 200
      expect{PageFile.find(file_id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end


  private

  def encode_pdf_file_as_base64 filename
    "data:application/pdf;base64,#{Base64.encode64(File.read(Rails.root.join("spec", "fixtures", filename)))}"
  end

  def encode_exe_file_as_base64 filename
    "data:application/octet-stream;base64,#{Base64.encode64(File.read(Rails.root.join("spec", "fixtures", filename)))}"
  end

end