require 'rails_helper'

describe AdminPublicationPolicy do
  subject { AdminPublicationPolicy.new(user, admin_publication) }
  let(:scope) { AdminPublicationPolicy::Scope.new(user, AdminPublication) }

  context "on a public project" do 
    let!(:admin_publication) { create(:project, with_admin_publication: true).admin_publication }
    context "for a visitor" do
      let(:user) { nil }

      it { should_not permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 1
      end
    end

    context "for a user" do
      let(:user) { create(:user) }

      it { should_not permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 1
      end
    end

    context "for an admin" do
      let(:user) { create(:admin) }

      it { should permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 1
      end
    end

    context "for a moderator of another project" do
      let(:user) { create(:moderator, project: create(:project, with_admin_publication: true)) }

      it { should_not permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 2
      end
    end
  end

  context "on a private admins project" do 
    let!(:project) { create(:private_admins_project, with_admin_publication: true) }
    let!(:admin_publication) { project.admin_publication }
    context "for a visitor" do
      let(:user) { nil }

      it { should_not permit(:reorder) }

      it "should not index the project holder"  do
        expect(scope.resolve.size).to eq 0

      end
    end

    context "for a user" do
      let(:user) { create(:user) }

      it { should_not permit(:reorder) }

      it "should not index the project holder"  do
        expect(scope.resolve.size).to eq 0
      end
    end

    context "for an admin" do
      let(:user) { create(:admin) }

      it { should permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 1
      end
    end

    context "for a moderator" do
      let(:user) { create(:moderator, project: project) }

      it { should_not permit(:reorder) }

      it "should index the project holder"  do
        expect(scope.resolve.size).to eq 1
      end
    end
  end

  context "for a visitor on a private groups project" do
    let!(:user) { nil }
    let!(:admin_publication) { create(:private_groups_project, with_admin_publication: true).admin_publication }

    it { should_not permit(:reorder) }

    it "should not index the project holder"  do
      expect(scope.resolve.size).to eq 0
    end
  end

  context "for a user on a private groups project where she's no member of a rules group with access" do
    let!(:user) { create(:user, email: 'not-user@test.com') }
    let!(:group) { create(:smart_group, rules: [
      {ruleType: 'email', predicate: 'is', value: 'user@test.com'}
    ])}
    let!(:admin_publication) { create(:project, visible_to: 'groups', groups: [group], with_admin_publication: true).admin_publication }

    it { should_not permit(:reorder) }

    it "should not index the project holder"  do
      expect(scope.resolve.size).to eq 0
    end
  end
end