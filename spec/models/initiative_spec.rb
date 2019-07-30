require 'rails_helper'

RSpec.describe Initiative, type: :model do
  context "associations" do
    it { should have_many(:votes) }
  end

  context "Default factory" do
    it "is valid" do
      # Using create instead of build because it otherwise 
      # doesn't have status changes yet which are required 
      # by validation.
      expect(create(:initiative)).to be_valid
    end
  end

  context "with_status" do
    it "returns initiatives with that status" do
      s1 = create(:initiative_status)
      s2 = create(:initiative_status)
      initiatives_1 = create_list(:initiative, 2, initiative_status: s1)
      initiatives_2 = create_list(:initiative, 3, initiative_status: s2)
      expect(Initiative.with_status(s1.id).count).to eq 2
      expect(Initiative.with_status(s2.id).count).to eq 3
    end
  end

  context "hooks" do
    it "should set the author name on creation" do
      u = create(:user)
      initiative = create(:initiative, author: u)
      expect(initiative.author_name).to eq u.display_name
    end

    it "should generate a slug on creation" do
      idea = create(:initiative, slug: nil)
      expect(idea.slug).to be_present
    end
  end

  context "published at" do
    it "gets set immediately when creating a published idea" do
      t = Time.now
      travel_to t do
        initiative = create(:initiative, publication_status: 'published')
        expect(initiative.published_at.to_i).to eq t.to_i
      end
    end

    it "stays empty when creating a draft" do
      initiative = create(:initiative, publication_status: 'draft')
      expect(initiative.published_at).to be_nil
    end

    it "gets filled in when publishing a draft" do
      initiative = create(:initiative, publication_status: 'draft')
      t = Time.now + 1.week
      travel_to t do
        initiative.update(publication_status: 'published')
        expect(initiative.published_at.to_i).to eq t.to_i
      end
    end

    it "doesn't change again when already published once" do
      t = Time.now
      travel_to t
      initiative = create(:initiative, publication_status: 'published')
      travel_to t+1.week
      initiative.update(publication_status: 'closed')
      travel_to t+1.week
      initiative.update(publication_status: 'published')
      expect(initiative.published_at.to_i).to eq t.to_i
      travel_back
    end
  end

  describe "body sanitizer" do
    it "sanitizes script tags in the body" do
      initiative = create(:initiative, body_multiloc: {
        "en" => "<p>Test</p><script>This should be removed!</script>"
      })
      expect(initiative.body_multiloc).to eq({"en" => "<p>Test</p>This should be removed!"})
    end
  end

  describe "title" do
    it "is stripped from spaces at beginning and ending" do
      initiative = create(:initiative, title_multiloc: {'en' => ' my fantastic idea  '})
      expect(initiative.title_multiloc['en']).to eq 'my fantastic idea'
    end
  end

end
