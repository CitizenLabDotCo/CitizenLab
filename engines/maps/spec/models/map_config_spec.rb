require 'rails_helper'

RSpec.describe Maps::MapConfig, type: :model do

  describe "Default factory" do
    it "is valid" do
      map_config = build(:map_config)
      map_config.project.save  # otherwise map_config.project_id is nil => map_config is invalid
      expect(map_config).to be_valid
    end
  end

end
