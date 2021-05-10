# frozen_string_literal: true

require 'rails_helper'
require 'rspec_api_documentation/dsl'

resource 'Views' do
  explanation 'Insights views'

  before { header 'Content-Type', 'application/json' }

  let!(:views) { create_list(:view, 3) }
  let(:json_response) { json_parse(response_body) }

  shared_examples 'unauthorized requests' do
    context 'when visitor' do
      example_request('unauthorized', document: false) { expect(status).to eq(401) }
    end

    context 'when normal user' do
      before { user_header_token }
      example_request('unauthorized', document: false) { expect(status).to eq(401) }
    end
  end

  shared_examples 'unprocessable entity' do
    context 'when name is empty' do
      let(:name) { '' }

      example_request 'returns unprocessable-entity error', document: false do
        expect(status).to eq(422)
      end
    end
  end

  get 'web_api/v1/insights/views' do
    context 'when admin' do
      before { admin_header_token }

      example_request 'lists all views' do
        expect(status).to eq(200)
        expect(json_response[:data].pluck(:id)).to match_array(views.pluck(:id))
        expect(json_response[:included].pluck(:id)).to match_array(views.pluck(:scope_id))
      end
    end

    include_examples 'unauthorized requests'
  end

  get 'web_api/v1/insights/views/:id' do
    let(:view) { views.first }
    let(:id) { view.id }

    context 'when admin' do
      before { admin_header_token }

      let(:expected_response) do
        {
          data: {
            id: view.id,
            type: 'view',
            attributes: { name: view.name },
            relationships: {
              scope: {
                data: { id: view.scope_id, type: 'project' }
              }
            }
          },
          included: [hash_including(id: view.scope_id)]
        }
      end

      example_request 'gets one view by id' do
        expect(status).to eq(200)
        expect(json_response).to match(expected_response)
      end
    end

    include_examples 'unauthorized requests'
  end

  post 'web_api/v1/insights/views' do
    with_options scope: :view do
      parameter :name, 'The name of the view.', required: true
      parameter :scope_id, 'The identifier of the project whose inputs will be analyzed.', required: true
    end
    ValidationErrorHelper.new.error_fields(self, Insights::View)

    let(:name) { 'that awesome view' }
    let(:project) { create(:project) }
    let(:scope_id) { project.id }

    context 'when admin' do
      before { admin_header_token }

      let(:expected_response) do
        {
          data: {
            id: anything,
            type: 'view',
            attributes: { name: name },
            relationships: {
              scope: {
                data: { id: scope_id, type: 'project' }
              }
            }
          },
          included: [hash_including(id: scope_id)]
        }
      end

      example_request 'creates a new view' do
        expect(status).to eq(201)
        expect(json_response).to match(expected_response)
      end

      include_examples 'unprocessable entity'
    end

    include_examples 'unauthorized requests'
  end

  patch 'web_api/v1/insights/views/:id' do
    with_options scope: :view do
      parameter :name, 'The name of the view.', required: false
    end
    ValidationErrorHelper.new.error_fields(self, Insights::View)

    let(:view) { views.first }

    let(:id) { view.id }
    let(:previous_name) { view.name }
    let(:name) { 'Da view' }

    context 'when admin' do
      before { admin_header_token }

      let(:expected_response) do
        {
          data: {
            id: anything,
            type: 'view',
            attributes: { name: name },
            relationships: {
              scope: {
                data: { id: view.scope_id, type: 'project' }
              }
            }
          },
          included: [hash_including(id: view.scope_id)]
        }
      end

      example_request 'updates a view' do
        expect(name).not_to eq(previous_name) # making sure we didn't reuse the same name by mistake
        expect(status).to eq(200)
        expect(json_response).to match(expected_response)
      end

      include_examples 'unprocessable entity'
    end

    include_examples 'unauthorized requests'
  end
end