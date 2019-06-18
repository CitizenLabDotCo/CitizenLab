require 'rails_helper'

RSpec.describe Project, type: :model do
  describe "Default factory" do
    it "is valid" do
      expect(build(:project)).to be_valid
    end
  end

  describe "Factory with topics" do
    it "is valid" do
      expect(create(:project_with_topics)).to be_valid
    end
    it "has topics" do
      expect(create(:project_with_topics).topics).to_not be_empty
    end
  end

  describe "Factory with areas" do
    it "is valid" do
      expect(create(:project_with_areas)).to be_valid
    end
    it "has areas" do
      expect(create(:project_with_areas).areas).to_not be_empty
    end
  end

  describe "Factory XL" do
    it "is valid" do
      expect(create(:project_xl)).to be_valid
    end
    it "has ideas" do
      expect(create(:project_xl).ideas).to_not be_empty
    end
  end

  describe "comments_count" do
    it "remains up to date when an idea changes project" do
      p1 = create(:project)
      p2 = create(:project)
      i = create(:idea, project: p1)
      c = create(:comment, post: i)

      expect(p1.reload.comments_count).to eq 1
      i.update! project: p2
      expect(p1.reload.comments_count).to eq 0
      expect(p2.reload.comments_count).to eq 1
      expect(p2.reload.comments_count).to eq 1
    end
  end

  describe "description sanitizer" do
    it "sanitizes script tags in the description" do
      project = create(:project, description_multiloc: {
        "en" => '<p>Test</p><script>This should be removed!</script><h2>Title</h2><ul><li>A bullet</li></ul><ol type="1"><li>And a listing</li></ol>'
      })
      expect(project.description_multiloc).to eq({"en" => '<p>Test</p>This should be removed!<h2>Title</h2><ul><li>A bullet</li></ul><ol type="1"><li>And a listing</li></ol>'})
    end
    
  end

  describe "slug" do
    it "is valid when it's only containing alphanumeric and hyphens" do
      project = build(:project, slug: 'aBc-123-g3S')
      expect(project).to be_valid
    end

    it "is invalid when there's others than alphanumeric and hyphens" do
      project = build(:project, slug: 'ab_c-.asdf@')
      expect{ project.valid? }.to change{ project.errors[:slug] }
    end

  end

  describe "visible_to" do
    it "gets set to 'public' when not specified on create" do
      project = create(:project, visible_to: nil)
      expect(project.visible_to).to eq 'public'
    end
  end

  describe "destroy" do
    it "can be realised" do
      project = create(:project_xl)
      expect{ project.destroy }.not_to raise_error
    end
  end

  describe "participation_mode" do
    it "can be null for timeline projects" do 
      p = create(:project_with_current_phase)
      p.presentation_mode = nil
      expect(p.save).to eq true
    end
  end

end
