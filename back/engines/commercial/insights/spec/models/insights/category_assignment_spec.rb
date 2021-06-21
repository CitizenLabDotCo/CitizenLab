# frozen_string_literal: true

require 'rails_helper'

describe Insights::CategoryAssignment do
  describe 'validations' do
    subject(:assignment) { build(:category_assignment) }

    specify { expect(assignment).to be_valid }

    it 'is not valid without a category' do
      assignment.category = nil
      expect(assignment).not_to be_valid
    end

    it 'is not valid without an input' do
      assignment.input = nil
      expect(assignment).not_to be_valid
    end

    it 'is not valid if the input is not an Idea' do
      assignment.input = create(:comment)
      expect(assignment).not_to be_valid
    end

    it 'cannot have duplicates' do
      assignment.clone.tap do |duplicate|
        # 'approved' attribute should not be taken into account to identify duplicates
        duplicate.approved = !assignment.approved
      end.save!

      aggregate_failures(' checking assignment is invalid ') do
        expect(assignment).not_to be_valid
        expect(assignment.errors.messages).to match({ input_id: ['Assignment already exists'] })
      end
    end
  end

  describe 'associations' do
    subject(:assignment) { create(:category_assignment) }

    context 'when its view is deleted' do
      before { assignment.category.view.destroy! }

      it { expect { assignment.reload }.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context 'when its category is deleted' do
      before { assignment.category.destroy! }

      it { expect { assignment.reload }.to raise_error(ActiveRecord::RecordNotFound) }
    end

    context 'when its input is deleted' do
      before { assignment.input.destroy! }

      it { expect { assignment.reload }.to raise_error(ActiveRecord::RecordNotFound) }
    end
  end

  describe 'after_destroy callbacks' do
    subject(:assignment) { create(:category_assignment) }

    specify do
      expect { assignment.destroy! }.to(change { assignment.view.updated_at })
    end
  end

  describe 'after_save callbacks' do
    subject(:assignment) { build(:category_assignment) }

    it 'touch the view for newly created assignments' do
      expect { assignment.save! }.to(change { assignment.view.updated_at })
    end

    it 'touch the view if the assignment changes' do
      assignment.save!
      assignment.approved = !assignment.approved
      expect { assignment.save! }.to(change { assignment.view.updated_at })
    end

    it 'does not touch the view if there are no changes' do
      assignment.save!
      expect { assignment.save! }.not_to(change { assignment.view.updated_at })
    end
  end

  describe '#approved' do
    it 'is true by default' do
      assignment = described_class.new(category: nil, input: nil) # No need to provide valid data here.
      expect(assignment.approved).to be(true)
    end
  end
end
