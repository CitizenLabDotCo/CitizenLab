require 'rails_helper'

RSpec.describe Maps::LegendItem, type: :model do

  describe "Default factory" do
    it "is valid" do
      expect(build(:legend_item)).to be_valid
    end
  end

end
