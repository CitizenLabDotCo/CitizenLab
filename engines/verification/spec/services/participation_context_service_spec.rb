require "rails_helper"

describe ParticipationContextService do
  let(:service) { ParticipationContextService.new }

  describe "posting_disabled_reason" do
    it "returns nil when a permitted group requires verification for a verified user" do
      project = create(:continuous_project, with_permissions: true)
      permission = project.permissions.find_by(action: 'posting')
      verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
      permission.update!(permitted_by: 'groups', 
        group_ids: [create(:group).id, verified_members.id]
        )
      expect(service.posting_disabled_reason_for_project(project, create(:user, verified: true))).to be_nil
    end

    it "returns `not_verified` when not permitted and a permitted group requires verification" do
      project = create(:continuous_project, with_permissions: true)
      permission = project.permissions.find_by(action: 'posting')
      verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
      permission.update!(permitted_by: 'groups', 
        group_ids: [create(:group).id, verified_members.id]
        )
      expect(service.posting_disabled_reason_for_project(project, create(:user))).to eq 'not_verified'
    end

    it "returns `not_permitted` when only permitted to admins but a group requires verification" do
      project = create(:continuous_project, with_permissions: true)
      permission = project.permissions.find_by(action: 'posting')
      verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
      permission.update!(permitted_by: 'admins_moderators', 
        group_ids: [create(:group).id, verified_members.id]
        )
      expect(service.posting_disabled_reason_for_project(project, create(:user))).to eq 'not_permitted'
    end
  end

  describe "commenting_disabled_reason" do
    let (:user) { create(:user) }

    context "for timeline projects" do
      it "returns `not_verified` when not permitted and a permitted group requires verification" do
        project = create(:project_with_current_phase, with_permissions: true)
        permission = service.get_participation_context(project).permissions.find_by(action: 'commenting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        expect(service.commenting_disabled_reason_for_project(project, user)).to eq 'not_verified'
        idea = create(:idea, project: project, phases: [project.phases[2]])
        expect(service.commenting_disabled_reason_for_idea(idea, user)).to eq 'not_verified'
      end
    end

    context "for continuous project" do
      it "returns 'not_verified' when not permitted and a permitted group requires verification in a continuous project" do
        project = create(:continuous_project, with_permissions: true)
        permission = project.permissions.find_by(action: 'commenting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        expect(service.commenting_disabled_reason_for_project(project, create(:user))).to eq 'not_verified'
        idea = create(:idea, project: project)
        expect(service.commenting_disabled_reason_for_idea(idea, user)).to eq 'not_verified'
      end
    end
  end


  describe "voting_disabled_reasons" do
    context "for a normal user" do
      let(:user) { create(:user) }

      context "timeline project" do
        it "returns 'not_verified' if it's in the current phase and voting is not permitted and a permitted group requires verification" do
          project = create(:project_with_current_phase, with_permissions: true)
          idea = create(:idea, project: project, phases: [project.phases[2]])
          permission = service.get_participation_context(project).permissions.find_by(action: 'voting')
          verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
          permission.update!(permitted_by: 'groups', 
            group_ids: [create(:group).id, verified_members.id]
            )
          expect(service.voting_disabled_reason_for_project(project, user)).to eq 'not_verified'
          expect(service.voting_disabled_reason_for_idea(idea, user)).to eq 'not_verified'
        end
      end

      context "continuous project" do
        it "returns 'not_verified' if voting is not permitted and a permitted group requires verification" do
          project = create(:continuous_project, with_permissions: true)
          idea = create(:idea, project: project)
          permission = project.permissions.find_by(action: 'voting')
          verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
          permission.update!(permitted_by: 'groups', 
            group_ids: [create(:group).id, verified_members.id]
            )
          expect(service.voting_disabled_reason_for_project(project, user)).to eq 'not_verified'
          expect(service.voting_disabled_reason_for_idea(idea, user)).to eq 'not_verified'
        end
      end
    end

    context "for an unauthenticated visitor" do
      let(:user) { nil }
      it "returns 'not_verified' if voting is not permitted and a permitted group requires verification" do
        project = create(:continuous_project, with_permissions: true)
        idea = create(:idea, project: project)
        permission = project.permissions.find_by(action: 'voting')
        group = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, group.id]
          )
        expect(service.voting_disabled_reason_for_project(project, user)).to eq 'not_verified'
        expect(service.voting_disabled_reason_for_idea(idea, user)).to eq 'not_verified'
      end
    end
  end

  describe "cancelling_votes_disabled_reasons" do

    let(:user) { create(:user) }
    let(:reasons) { ParticipationContextService::VOTING_DISABLED_REASONS }

    context "timeline project" do
      it "returns 'not_verified' if it's in the current phase and voting is not permitted and a permitted group requires verification" do
        project = create(:project_with_current_phase, 
          with_permissions: true, 
          current_phase_attrs: {voting_permitted: false} 
          )
        permission = TimelineService.new.current_phase(project).permissions.find_by(action: 'voting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        idea = create(:idea, project: project, phases: [project.phases[2]])
        expect(service.cancelling_votes_disabled_reason_for_idea(idea, idea.author)).to eq reasons[:not_verified]
      end
    end

    context "continuous project" do
      it "returns 'not_verified' if voting is not permitted and a permitted group requires verification" do
        project = create(:continuous_project, with_permissions: true)
        idea = create(:idea, project: project)
        permission = project.permissions.find_by(action: 'voting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        expect(service.cancelling_votes_disabled_reason_for_idea(idea, idea.author)).to eq reasons[:not_verified]
      end
    end
  end

  describe "taking_survey_disabled_reason" do
    it "returns `not_verified` when taking the survey is not permitted and a permitted group requires verification" do
      project = create(:continuous_survey_project, with_permissions: true)
      permission = service.get_participation_context(project).permissions.find_by(action: 'taking_survey')
      verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
      permission.update!(permitted_by: 'groups', 
        group_ids: [create(:group).id, verified_members.id]
        )
      expect(service.taking_survey_disabled_reason_for_project(project, create(:user))).to eq 'not_verified'
    end
  end

  describe "taking_poll_disabled_reason" do
    it "return `not_verified` when taking the poll is not permitted and a permitted group requires verification" do
      project = create(:continuous_poll_project, with_permissions: true)
      permission = service.get_participation_context(project).permissions.find_by(action: 'taking_poll')
      verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
      permission.update!(permitted_by: 'groups', 
        group_ids: [create(:group).id, verified_members.id]
        )
      expect(service.taking_poll_disabled_reason_for_project(project, create(:user))).to eq 'not_verified'
    end
  end

  describe "budgeting_disabled_reasons" do

    context "for timeline projects" do
      it "returns `not_verified` when the idea is in the current phase and budgeting is not permitted and a permitted group requires verification" do
        project = create(:project_with_current_phase, with_permissions: true,
          current_phase_attrs: {participation_method: 'budgeting', max_budget: 10000})
        idea = create(:idea, project: project, phases: [project.phases[2]])
        permission = service.get_participation_context(project).permissions.find_by(action: 'budgeting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        expect(service.budgeting_disabled_reason_for_idea(idea, create(:user))).to eq 'not_verified'
      end
    end

    context "continuous project" do
      it "returns 'not_verified' when budgeting is disabled in a continuous project and a permitted group requires verification" do
        project = create(:continuous_budgeting_project, with_permissions: true)
        permission = project.permissions.find_by(action: 'budgeting')
        verified_members = create(:smart_group, rules: [{ruleType: 'verified', predicate: 'is_verified'}])
        permission.update!(permitted_by: 'groups', 
          group_ids: [create(:group).id, verified_members.id]
          )
        idea = create(:idea, project: project)
        expect(service.budgeting_disabled_reason_for_idea(idea, create(:user))).to eq 'not_verified'
      end
    end
  end

end