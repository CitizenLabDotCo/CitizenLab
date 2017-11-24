require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource "Projects" do
  before do
    @projects = create_list(:project, 5)
    @user = create(:user, roles: [{type: 'admin'}])
    token = Knock::AuthToken.new(payload: { sub: @user.id }).token
    header 'Authorization', "Bearer #{token}"
    header "Content-Type", "application/json"
  end

  get "web_api/v1/projects" do
    parameter :topics, 'Filter by topics (AND)', required: false
    parameter :areas, 'Filter by areas (AND)', required: false

    example_request "List all projects" do
      explanation "Sorted by descending created_at"
      expect(status).to eq(200)
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 5
    end

    example "Get all projects on the second page with fixed page size" do
      do_request({"page[number]" => 2, "page[size]" => 2})
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 2
    end

    example "List all projects with an area" do
      a1 = create(:area)

      p1 = @projects.first
      p1.areas << a1
      p1.save

      do_request(areas: [a1.id])
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 1
      expect(json_response[:data][0][:id]).to eq p1.id
    end

    example "List all projects with all given areas" do
      a1 = create(:area)
      a2 = create(:area)

      p1 = @projects.first
      p1.areas = [a1, a2]
      p1.save

      do_request(areas: [a1.id, a2.id])
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 1
      expect(json_response[:data][0][:id]).to eq p1.id
    end

    example "List all projects with a topic" do
      t1 = create(:topic)

      p1 = @projects.first
      p1.topics << t1
      p1.save

      do_request(topics: [t1.id])
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 1
      expect(json_response[:data][0][:id]).to eq p1.id
    end

    example "List all projects with all given topics" do
      t1 = create(:topic)
      t2 = create(:topic)

      p1 = @projects.first
      p1.topics = [t1, t2]
      p1.save

      do_request(topics: [t1.id, t2.id])
      json_response = json_parse(response_body)
      expect(json_response[:data].size).to eq 1
      expect(json_response[:data][0][:id]).to eq p1.id
    end

  end

  get "web_api/v1/projects/:id" do
    let(:id) {@projects.first.id}

    example_request "Get a project by id" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @projects.first.id
    end
  end

  get "web_api/v1/projects/by_slug/:slug" do
    let(:slug) {@projects.first.slug}

    example_request "Get a project by slug" do
      expect(status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response.dig(:data, :id)).to eq @projects.first.id
    end

    describe do
      let(:slug) {"unexisting-project"}
      example "get an unexisting project by slug triggers 404", document: false do
        do_request
        expect(status).to eq 404
      end
    end
  end

  post "web_api/v1/projects" do
    with_options scope: :project do
      parameter :title_multiloc, "The title of the project, as a multiloc string", required: true
      parameter :description_multiloc, "The description of the project, as a multiloc HTML string", required: true
      parameter :slug, "The unique slug of the project. If not given, it will be auto generated"
      parameter :header_bg, "Base64 encoded header image"
      parameter :area_ids, "Array of ids of the associated areas"
      parameter :topic_ids, "Array of ids of the associated topics"
      parameter :visible_to, "Defines who can see the project, either #{Project::VISIBLE_TOS.join(",")}. Defaults to public."
    end
    ValidationErrorHelper.new.error_fields(self, Project)


    let(:project) { build(:project) }
    let(:title_multiloc) { project.title_multiloc }
    let(:description_multiloc) { project.description_multiloc }
    let(:header_bg) { encode_image_as_base64("header.jpg")}
    let(:area_ids) { create_list(:area, 2).map(&:id) }
    let(:visible_to) { 'admins' }


    example_request "Create a project" do
      expect(response_status).to eq 201
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:title_multiloc).stringify_keys).to match title_multiloc
      expect(json_response.dig(:data,:attributes,:description_multiloc).stringify_keys).to match description_multiloc
      expect(json_response.dig(:data,:relationships,:areas,:data).map{|d| d[:id]}).to match area_ids
      expect(json_response.dig(:data,:attributes,:visible_to)).to eq 'admins'
    end

    describe do

      let(:slug) { 'this-is-taken' }

      example "[error] Create an invalid project" do
        create(:project, slug: 'this-is-taken')
        do_request
        expect(response_status).to eq 422
        json_response = json_parse(response_body)
        expect(json_response.dig(:errors,:slug)).to eq [{:error=>"taken", :value=>"this-is-taken"}]
      end
    end

  end

  patch "web_api/v1/projects/:id" do
    before do 
      @project = create(:project)
    end

    with_options scope: :project do
      parameter :title_multiloc, "The title of the project, as a multiloc string", required: true
      parameter :description_multiloc, "The description of the project, as a multiloc HTML string", required: true
      parameter :slug, "The unique slug of the project"
      parameter :header_bg, "Base64 encoded header image"
      parameter :area_ids, "Array of ids of the associated areas"
      parameter :topic_ids, "Array of ids of the associated topics"
      parameter :visible_to, "Defines who can see the project, either #{Project::VISIBLE_TOS.join(",")}. Defaults to public."
    end
    ValidationErrorHelper.new.error_fields(self, Project)


    let(:id) { @project.id }
    let(:title_multiloc) { {"en" => "Changed title" } }
    let(:description_multiloc) { {"en" => "Changed body" } }
    let(:slug) { "changed-title" }
    let(:header_bg) { encode_image_as_base64("header.jpg")}
    let(:area_ids) { create_list(:area, 2).map(&:id) }
    let(:visible_to) { 'groups' }


    example_request "Updating the project" do
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:attributes,:title_multiloc,:en)).to eq "Changed title"
      expect(json_response.dig(:data,:attributes,:description_multiloc,:en)).to eq "Changed body"
      expect(json_response.dig(:data,:attributes,:slug)).to eq "changed-title"
      expect(json_response.dig(:data,:relationships,:areas,:data).map{|d| d[:id]}).to match area_ids
      expect(json_response.dig(:data,:attributes,:visible_to)).to eq 'groups'
    end

    example "Clearing all areas", document: false do
      do_request(project: {area_ids: []})
      json_response = json_parse(response_body)
      expect(json_response.dig(:data,:relationships,:areas,:data).size).to eq 0
    end
  end


  delete "web_api/v1/projects/:id" do
    let(:project) { create(:project) }
    let(:id) { project.id }
    example_request "Delete a project" do
      expect(response_status).to eq 200
      expect{Project.find(id)}.to raise_error(ActiveRecord::RecordNotFound)
    end
  end

  private

  def encode_image_as_base64 filename
    "data:image/png;base64,#{Base64.encode64(File.read(Rails.root.join("spec", "fixtures", filename)))}"
  end
end
