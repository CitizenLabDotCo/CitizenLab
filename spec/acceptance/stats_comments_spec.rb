require 'rails_helper'
require 'rspec_api_documentation/dsl'


def time_boundary_parameters s
  s.parameter :start_at, "Date defining from where results should start", required: false
  s.parameter :end_at, "Date defining till when results should go", required: false
end

def time_series_parameters s
  time_boundary_parameters s
  s.parameter :interval, "Either day, week, month, year"
end

def project_filter_parameter s
  s.parameter :project, "Project ID. Only count comments on ideas in the given project", required: false
end

def group_filter_parameter s
  s.parameter :group, "Group ID. Only count comments posted by users in the given group", required: false
end

def topic_filter_parameter s
  s.parameter :topic, "Topic ID. Only count comments on ideas that have the given topic assigned", required: false
end


resource "Stats - Comments" do

  explanation "The various stats endpoints can be used to show certain properties of comments."

  let!(:now) { Time.now.in_time_zone(@timezone) }

  before do
    @current_user = create(:admin)
    token = Knock::AuthToken.new(payload: { sub: @current_user.id }).token
    header 'Authorization', "Bearer #{token}"
    header "Content-Type", "application/json"
    @timezone = Tenant.settings('core','timezone')
    Tenant.update(created_at: now - 3.month)
    create(:comment, publication_status: 'deleted')
  end


  get "web_api/v1/stats/comments_count" do
    time_boundary_parameters self

    example_request "Count all comments" do
      expect(response_status).to eq 200
      json_response = json_parse(response_body)
      expect(json_response[:count]).to eq Comment.published.count
    end
  end

  context "with activity over time" do
    before do
      travel_to((now-1.month).in_time_zone(@timezone).beginning_of_month - 1.day) do
        create(:comment)
      end
      travel_to((now-1.month).in_time_zone(@timezone).beginning_of_month + 1.day) do
        create_list(:comment, 3)
      end

      travel_to((now-1.month).in_time_zone(@timezone).end_of_month - 1.day) do
        create_list(:comment, 2)
      end
      travel_to((now-1.month).in_time_zone(@timezone).end_of_month + 1.day) do
        create(:comment)
      end
    end

    get "web_api/v1/stats/comments_by_time" do
      time_series_parameters self

      let(:interval) { 'day' }

      describe "with time filter" do
        let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

        example_request "Comments by time" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.in_time_zone(@timezone).end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 5
        end
      end

      describe "with time filter outside of platform lifetime" do
        let(:start_at) { now - 1.year }
        let(:end_at) { now - 1.year + 1.day}

        it "returns no entries" do
          do_request
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response).to eq({})
        end
      end
    end

    get "web_api/v1/stats/comments_by_time_cumulative" do
      time_series_parameters self
      let(:interval) { 'day' }

      describe "with time filter" do
        let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

        example_request "Comments by time (cumulative)" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.in_time_zone(@timezone).end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.uniq).to eq json_response.values.uniq.sort
          expect(json_response.values.last).to eq 6
        end
      end

      describe "with time filter outside of platform lifetime" do
        let(:start_at) { now - 1.year }
        let(:end_at) { now - 1.year + 1.day}

        it "returns no entries" do
          do_request
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response).to eq({})
        end
      end
    end
  end


  get "web_api/v1/stats/comments_by_topic" do
    time_boundary_parameters self
    project_filter_parameter self
    group_filter_parameter self

    describe "without time filters" do

      example "Comments by topic", document: false do
        do_request
        expect(response_status).to eq 200
      end
    end

    describe "with time filtering only" do
      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

      before do
        travel_to start_at + 1.day do
          @topic1 = create(:topic)
          @topic2 = create(:topic)
          topic3 = create(:topic)
          idea1 = create(:idea, topics: [@topic1])
          idea2 = create(:idea, topics: [@topic2])
          idea3 = create(:idea, topics: [@topic1, @topic2])
          idea4 = create(:idea)
          comment1 = create(:comment, idea: idea1)
          comment2 = create(:comment, idea: idea1)
          comment3 = create(:comment, idea: idea2)
          comment4 = create(:comment, idea: idea3)
        end
        comment5 = create(:comment)
      end

      example_request "Comments by topic" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].stringify_keys).to match({
          @topic1.id => 3,
          @topic2.id => 2
        })
        expect(json_response[:topics].keys.map(&:to_s)).to match_array [@topic1.id, @topic2.id]
      end

    end

    describe "filtered by project" do
      before do
        travel_to start_at + 5.day do
          @project = create(:project)
          idea = create(:idea_with_topics, topics_count: 2, project: @project)
          create(:comment, idea: idea)
          create(:comment, idea: create(:idea_with_topics))
        end
      end

      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }
      let(:project) { @project.id }

      example_request "Comments by topic filtered by project" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].values.inject(&:+)).to eq 2
      end
    end

    describe "filtered by group" do
      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

      before do
        travel_to start_at + 3.day do
          @group = create(:group)
          idea = create(:idea_with_topics, topics_count: 2)
          create(:comment, idea: idea, author: create(:user, manual_groups: [@group]))
          create(:comment, idea: create(:idea_with_topics))
        end
      end

      let(:group) { @group.id }

      example_request "Comments by topic filtered by group" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].values.inject(&:+)).to eq 2
      end
    end
    
  end

  get "web_api/v1/stats/comments_by_project" do
    time_boundary_parameters self
    topic_filter_parameter self
    group_filter_parameter self

    describe "with time filtering only" do
      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

      before do
        travel_to start_at + 14.day do
          @project1 = create(:project)
          @project2 = create(:project)
          idea1 = create(:idea, project: @project1)
          idea2 = create(:idea, project: @project1)
          idea3 = create(:idea, project: @project2)
          idea4 = create(:idea)
          comment1 = create(:comment, idea: idea1)
          comment2 = create(:comment, idea: idea1)
          comment3 = create(:comment, idea: idea2)
          comment4 = create(:comment, idea: idea3)
        end
      end

      example_request "Comments by project" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].stringify_keys).to match({
          @project1.id => 3,
          @project2.id => 1
        })
        expect(json_response[:projects].keys.map(&:to_s)).to match_array [@project1.id, @project2.id]
      end

    end

    describe "filtered by topic" do
      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

      before do
        travel_to start_at + 17.day do
          @topic = create(:topic)
          idea1 = create(:idea, topics: [@topic])
          idea2 = create(:idea_with_topics)
          create(:comment, idea: idea1)
          create(:comment, idea: idea2)
        end
      end

      let(:topic) { @topic.id }

      example_request "Comments by project filtered by topic" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].values.inject(&:+)).to eq 1
      end
    end

    describe "filtered by group" do
      let(:start_at) { (now-1.month).in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { (now-1.month).in_time_zone(@timezone).end_of_month }

      before do
        travel_to start_at + 12.day do
          @group = create(:group)
          project = create(:project)
          idea = create(:idea, project: project)
          create(:comment, idea: idea, author: create(:user, manual_groups: [@group]))
          create(:comment, idea: idea)
        end
      end

      let(:group) { @group.id }

      example_request "Comments by project filtered by group" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].values.inject(&:+)).to eq 1
      end
    end

  end
    
end
