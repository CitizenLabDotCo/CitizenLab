# frozen_string_literal: true

require 'rails_helper'

describe ProjectsFinder do
  subject(:result) { described_class.find(params, **options) }
  let(:params) { {} }
  let(:options) { {} }

  before do
    create_list(:project, 5)
  end

  describe '#find' do
    context 'When no params or options are received' do
      it 'is successful' do
        expect(result).to be_a_success
      end

      it 'returns all' do
        expect(result.count).to eq Project.count
      end
    end
  end
end
