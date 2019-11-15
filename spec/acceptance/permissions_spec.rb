require 'rails_helper'
require 'rspec_api_documentation/dsl'


resource "Permissions" do
 
  explanation 'These determine who (e.g. groups) can take which actions (e.g. posting, voting) in a participation context'

  before do
    header "Content-Type", "application/json"
    @project = create(:continuous_project, with_permissions: true)
    @phase = ParticipationContextService.new.get_participation_context(
      create(:project_with_current_phase, with_permissions: true)
      )
  end
  let(:project_id) { @project.id }
  let(:phase_id) { @phase.id }

  context "when admin" do
    before do
      @admin = create(:admin)
      token = Knock::AuthToken.new(payload: @admin.to_token_payload).token
      header 'Authorization', "Bearer #{token}"
    end

    get "web_api/v1/projects/:project_id/permissions" do
      with_options scope: :page do
        parameter :number, "Page number"
        parameter :size, "Number of permissions per page"
      end

      example_request "List all permissions of a project" do
        expect(status).to eq(200)
        json_response = json_parse(response_body)
        expect(json_response[:data].size).to eq PermissionsService::ACTIONS['ideation'].size
      end
    end

    get "web_api/v1/phases/:phase_id/permissions" do
      with_options scope: :page do
        parameter :number, "Page number"
        parameter :size, "Number of permissions per page"
      end

      example_request "List all permissions of a phase" do
        expect(status).to eq(200)
        json_response = json_parse(response_body)
        expect(json_response[:data].size).to eq PermissionsService::ACTIONS['ideation'].size
      end
    end

    get "web_api/v1/projects/:project_id/permissions/:action" do
      let(:action) { @project.permissions.first.action }

      example_request "Get one permission by id" do
        expect(status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.dig(:data, :id)).to eq @project.permissions.first.id
      end
    end

    get "web_api/v1/phases/:phase_id/permissions/:action" do
      let(:action) { @phase.permissions.first.action }

      example_request "Get one permission by id" do
        expect(status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.dig(:data, :id)).to eq @phase.permissions.first.id
      end
    end

    patch "web_api/v1/projects/:project_id/permissions/:action" do
      with_options scope: :permission do
        parameter :permitted_by, "Defines who is granted permission, either #{Permission::PERMITTED_BIES.join(",")}.", required: false
        parameter :group_ids, "An array of group id's associated to this permission", required: false
      end
      ValidationErrorHelper.new.error_fields(self, Permission)

      let(:action) { @project.permissions.first.action }
      let(:permitted_by) { 'groups' }
      let(:group_ids) { create_list(:group, 3, projects: [@project]).map(&:id) }

      example_request "Update a permission" do
         expect(response_status).to eq 200
         json_response = json_parse(response_body)
         expect(json_response.dig(:data, :attributes, :permitted_by)).to eq permitted_by
         expect(json_response.dig(:data, :relationships, :groups, :data).map{|h| h[:id]}).to match_array group_ids
       end
    end

    patch "web_api/v1/phases/:phase_id/permissions/:action" do
      with_options scope: :permission do
        parameter :permitted_by, "Defines who is granted permission, either #{Permission::PERMITTED_BIES.join(",")}.", required: false
        parameter :group_ids, "An array of group id's associated to this permission", required: false
      end
      ValidationErrorHelper.new.error_fields(self, Permission)

      let(:action) { @phase.permissions.first.action }
      let(:permitted_by) { 'groups' }
      let(:group_ids) { create_list(:group, 3, projects: [@phase.project]).map(&:id) }

      example_request "Update a permission" do
         expect(response_status).to eq 200
         json_response = json_parse(response_body)
         expect(json_response.dig(:data, :attributes, :permitted_by)).to eq permitted_by
         expect(json_response.dig(:data, :relationships, :groups, :data).map{|h| h[:id]}).to match_array group_ids
       end
    end
  end

  context "when authenticated" do
    before do
      @user = create(:user)
      token = Knock::AuthToken.new(payload: @user.to_token_payload).token
      header 'Authorization', "Bearer #{token}"
    end

    get "web_api/v1/projects/:project_id/permissions/:action/participation_conditions" do
      before do 
        @groups = [create(:group), create(:smart_group)]
        @permission = @project.permissions.first
        @permission.update!(permitted_by: 'groups', groups: @groups)
      end
      let(:action) { @permission.action }

      example_request "Get the groups inclusion of a user" do
        expect(status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.map{|h| h[:id]}).to match_array @groups.map(&:id)
      end
    end

    get "web_api/v1/phases/:phase_id/permissions/:action/participation_conditions" do
      before do 
        @groups = [create(:group), create(:smart_group)]
        @permission = @phase.permissions.first
        @permission.update!(permitted_by: 'groups', groups: @groups)
      end
      let(:action) { @permission.action }

      example_request "Get the groups inclusion of a user" do
        expect(status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response.map{|h| h[:id]}).to match_array @groups.map(&:id)
      end
    end
  end

  context "when not authenticated" do

    get "web_api/v1/projects/:project_id/permissions/:action/participation_conditions" do
      let(:action) { @project.permissions.first.action }

      example_request "[error] Get the groups inclusion of a user", document: false do
        expect(status).to eq 401
      end
    end

    get "web_api/v1/phases/:phase_id/permissions/:action/participation_conditions" do
      let(:action) { @phase.permissions.first.action }

      example_request "[error] Get the groups inclusion of a user", document: false do
        expect(status).to eq 401
      end
    end
  end
end
