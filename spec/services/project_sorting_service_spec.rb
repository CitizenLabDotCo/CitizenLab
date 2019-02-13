require "rails_helper"

describe ProjectSortingService do
  let(:service) { ProjectSortingService.new }

  describe "sort" do
    context "when manual sorting is enabled" do
      before do
        tenant = Tenant.current
        tenant.settings['manual_project_sorting'] = {allowed: true, enabled: true}
        tenant.save
      end

      it "respects the saved ordering" do
        p1 = create(:project, ordering: 2)
        p2 = create(:project, ordering: 1)
        p3 = create(:project, ordering: 3)
        expect(service.sort(Project.all).ids).to eq [p1, p2, p3].map(&:id)
      end
    end

    context "when manual sorting is disabled" do
      before do
        tenant = Tenant.current
        tenant.settings['manual_project_sorting'] = {allowed: true, enabled: false}
        tenant.save
      end

      it "sorts the projects in the specced order" do
        t = Time.now
        projects = [
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+1.days,
                    participation_method: 'information',
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.days,
                    participation_method: 'information',
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-3.days,
                    end_at: t+2.day,
                    participation_method: 'ideation',
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'ideation'
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'budgeting',
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'survey',
                    survey_service: 'google',
                    survey_embed_url: 'https://docs.google.com/forms/d/e/abcd/viewform?embedded=true'
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'ideation',
                    posting_enabled: false
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'ideation',
                    posting_enabled: false,
                    voting_enabled: false
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'ideation',
                    posting_enabled: false,
                    commenting_enabled: false
                  }
              })},
          -> {create(:project_with_current_phase,
                phases_config: {
                  sequence: 'xcx',
                  current_phase_attrs: {
                    start_at: t-2.weeks,
                    end_at: t+2.weeks,
                    participation_method: 'information',
                  }
              })},
          -> {create(:continuous_project, participation_method: 'ideation', created_at: t-3.weeks)},
          -> {create(:continuous_project, participation_method: 'information', created_at: t-3.weeks)},
          -> {create(:project_with_future_phases)},
          -> {create(:project_with_past_phases)},
          -> {create(:continuous_project, publication_status: 'archived', created_at: t-3.year)},
          -> {create(:project_with_past_phases, publication_status: 'archived')},
          -> {create(:continuous_project, publication_status: 'archived', created_at: t-5.weeks)},
        ].map.with_index{|lambda, i| [i, lambda]}
          .shuffle
          .map{|(ordering, lambda)| [ordering, lambda.call]}
          .sort_by(&:first)
          .map(&:last)

        expect(service.sort(Project.all).ids).to eq projects.map(&:id)
      end
    end
  end
end