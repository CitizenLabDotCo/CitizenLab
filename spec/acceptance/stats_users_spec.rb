require 'rails_helper'
require 'rspec_api_documentation/dsl'


def time_boundary_parameters s
  s.parameter :start_at, "Date defining from where results should start", required: false
  s.parameter :end_at, "Date defining till when results should go", required: false
end

def time_series_parameters s
  time_boundary_parameters s
  s.parameter :interval, "Either day, week, month, year", required: true
end

def group_filter_parameter s
  s.parameter :group, "Group ID. Only return users that are a member of the given group", required: false
end

def topic_filter_parameter s
  s.parameter :topic, "Topic ID. Only returns users that have posted or commented on ideas in a given topic", required: false
end

resource "Stats - Users" do

  explanation "The various stats endpoints can be used to show how certain properties of users."

  before do
    @current_user = create(:admin)
    token = Knock::AuthToken.new(payload: { sub: @current_user.id }).token
    header 'Authorization', "Bearer #{token}"
    header "Content-Type", "application/json"
    @timezone = Tenant.settings('core','timezone')
  end

  describe "not depending on custom fields" do

    before do
      travel_to(Time.now.in_time_zone(@timezone).beginning_of_month - 1.days) do
        create(:user)
      end
      
      travel_to(Time.now.in_time_zone(@timezone).beginning_of_month + 10.days) do
        create(:user)
        create(:user)
        create(:admin)
        create(:user)
        create(:invited_user)
      end
      travel_to(Time.now.in_time_zone(@timezone).beginning_of_month + 25.days) do
        create_list(:user, 4)
      end
    end

    get "web_api/v1/stats/users_count" do
      time_boundary_parameters self

      example_request "Count all users" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:count]).to eq User.active.count
      end
    end

    get "web_api/v1/stats/users_by_time" do
      time_series_parameters self
      group_filter_parameter self
      topic_filter_parameter self
      parameter :project, "Project ID. Only return users that can access the given project.", required: false

      describe "without time range filters" do
        let(:interval) { 'day' }

        example "without filters", document: false do
          do_request
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.values.inject(&:+)).to eq 11
        end
      end

      describe "with time filters only" do
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }

        example_request "Users by time" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 10
        end
      end

      describe "with project filter" do
        before do
          create_list(:admin, 2)
        end
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:project) { create(:private_admins_project).id }

        example_request "Users by time filtered by project" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 4
        end
      end

      describe "with group filter" do
        before do
          @group1 = create(:group)
          @group2 = create(:group)
          @user1 = create(:user, manual_groups: [@group1])
          @user2 = create(:user, manual_groups: [@group2])
        end
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:group) { @group1.id }

        example_request "Users by time filtered by group" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 1
        end
      end

      describe "with topic filter" do
        before do
          @topic1 = create(:topic)
          @topic2 = create(:topic)
          @user1 = create(:user)
          @user2 = create(:user)
          @idea1 = create(:idea, author: @user1, topics: [@topic1])
          @idea2 = create(:idea, topics: [@topic2])
          @idea3 = create(:idea)
          @comment1 = create(:comment, author: @user2, idea: @idea1)
          @comment2 = create(:comment, idea: @idea2)
          create(:vote, votable: @idea1)
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:topic) { @topic1.id }

        example_request "Users by time filtered by topic" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 3
        end
      end

    end

    get "web_api/v1/stats/users_by_time_cumulative" do
      time_series_parameters self
      group_filter_parameter self
      topic_filter_parameter self
      parameter :project, "Project ID. Only return users that can access the given project.", required: false

      describe "with time filters only" do
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }

        example_request "Users by time (cumulative)" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          # monotonically increasing
          expect(json_response.values.uniq).to eq json_response.values.uniq.sort
          expect(json_response.values.last).to eq 11
        end
      end

      describe "with project filter" do
        before do
          create_list(:admin, 4)
        end
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:project) { create(:private_admins_project).id }

        example_request "Users by time (cumulative) filtered by project" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          # monotonically increasing
          expect(json_response.values.uniq).to eq json_response.values.uniq.sort
          expect(json_response.values.last).to eq 6
        end
      end

      describe "with group filter" do
        before do
          @group1 = create(:group)
          @group2 = create(:group)
          @user1 = create(:user, manual_groups: [@group1])
          @user2 = create(:user, manual_groups: [@group2])
        end
        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:group) { @group1.id }

        example_request "Users by time (cumulative) filtered by group" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          # monotonically increasing
          expect(json_response.values.uniq).to eq json_response.values.uniq.sort
          expect(json_response.values.last).to eq 1
        end
      end

      describe "with topic filter" do
        before do
          @topic1 = create(:topic)
          @topic2 = create(:topic)
          @user1 = create(:user)
          @user2 = create(:user)
          @idea1 = create(:idea, author: @user1, topics: [@topic1])
          @idea2 = create(:idea, topics: [@topic2])
          @idea3 = create(:idea)
          @comment1 = create(:comment, author: @user2, idea: @idea1)
          @comment2 = create(:comment, idea: @idea2)
          create(:vote, votable: @idea1)
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:topic) { @topic1.id }

        example_request "Users by time (cumulative) filtered by topic" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          # monotonically increasing
          expect(json_response.values.uniq).to eq json_response.values.uniq.sort
          expect(json_response.values.last).to eq 3
        end
      end
    end

    get "web_api/v1/stats/active_users_by_time" do
      explanation "Active users are that have generated some activity within the given interval window"
      time_series_parameters self
      group_filter_parameter self
      parameter :project, "Project ID. Only return users that have participated in the given project.", required: false

      describe "with time filters only" do
        before do
          travel_to(Time.now.in_time_zone(@timezone).beginning_of_month + 3.days) do
            user = create(:user)
            create_list(:activity, 2, user: user)
            create(:activity)
          end
          travel_to(Time.now.in_time_zone(@timezone).beginning_of_month + 8.days) do
            create_list(:activity, 2)
          end
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }

        example_request "Active users by time" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 4
        end
      end

      describe "with project filter" do
        before do
          @project = create(:project)
          @idea1 = create(:idea, project: @project)
          create(:idea_published_activity, item: @idea1, user: @idea1.author)
          @idea2 = create(:idea)
          create(:idea_published_activity, item: @idea2, user: @idea2.author)
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:project) { @project.id }

        example_request "Active users by time filtered by project" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 1
        end
      end

      describe "with group filter" do
        before do
          @group1 = create(:group)
          @group2 = create(:group)
          @user1 = create(:user, manual_groups: [@group1])
          @user2 = create(:user, manual_groups: [@group2])
          create(:activity, user: @user1)
          create(:activity, user: @user2)
          create(:activity)
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:group) { @group1.id }

        example_request "Active users by time filtered by group" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 1
        end
      end

      describe "with topic filter" do
        before do
          @topic1 = create(:topic)
          @topic2 = create(:topic)
          @user1 = create(:user)
          @user2 = create(:user)
          @idea1 = create(:idea, author: @user1, topics: [@topic1])
          @idea2 = create(:idea, topics: [@topic2])
          @idea3 = create(:idea)
          @comment1 = create(:comment, author: @user2, idea: @idea1)
          @comment2 = create(:comment, idea: @idea2)
          create(:vote, votable: @idea1)
          create(:activity, user: @user1)
          create(:activity, user: @user2)
        end

        let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
        let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
        let(:interval) { 'day' }
        let(:topic) { @topic1.id }

        example_request "Active users by time filtered by topic" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response.size).to eq start_at.end_of_month.day
          expect(json_response.values.map(&:class).uniq).to eq [Integer]
          expect(json_response.values.inject(&:+)).to eq 2
        end
      end
    end

    get "web_api/v1/stats/users_engagement_scores" do
      time_boundary_parameters self
      group_filter_parameter self

      before do
        @group = create(:group)
        @u1 = create(:user)
        create(:membership, user: @u1, group: @group)
        @u2 = create(:user)
        create(:membership, user: @u2, group: @group)
        @u3 = create(:user)

        create(:comment_created_activity, user: @u1)
        create(:idea_upvoted_activity, user: @u1)
        create(:idea_published_activity, user: @u2)
        create(:idea_downvoted_activity, user: @u2)
        create(:comment_created_activity, user: @u3)

        travel_to(Time.now.in_time_zone(@timezone).beginning_of_month - 1.day) do
          create(:idea_published_activity, user: @u2)
        end
      end

      let(:start_at) { Time.now.in_time_zone(@timezone).beginning_of_month }
      let(:end_at) { Time.now.in_time_zone(@timezone).end_of_month }
      let(:group) { @group.id }

      example_request "List 10 best user engagement scores" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response[:data].map{|d| d[:attributes][:sum_score]}).to eq([6, 4])
        expect(json_response[:data].map{|d| d[:relationships][:user][:data][:id]}).to eq([@u2.id, @u1.id])
        expect(json_response[:included].size).to eq 2
      end
    end
  end


  describe "depending on custom fields" do

    before do
      # we need the built in custom fields first, so lets run the base tenant template
      TenantTemplateService.new.apply_template('base')
      CustomField.find_by(code: 'education').update(enabled: true)
      travel_to(start_at - 1.day) { create(:user) }
      travel_to(end_at + 1.day) { create(:user) }
    end

    let (:start_at) { Time.now.in_time_zone(@timezone).beginning_of_year }
    let (:end_at) { Time.now.in_time_zone(@timezone).end_of_year }

    get "web_api/v1/stats/users_by_gender" do
      time_boundary_parameters self
      group_filter_parameter self

      before do
        create_list(:user, 2, gender: 'female')
        create(:user, gender: 'unspecified')
        @group = create(:group)
        User.all.each{|u| create(:membership, user: u, group: @group)}
        create(:user)
      end

      let(:group) { @group.id }

      example_request "Users by gender" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response).to match({
          female: 2,
          unspecified: 1,
          _blank: 1,
        })
      end
    end

    get "web_api/v1/stats/users_by_birthyear" do
      time_boundary_parameters self
      group_filter_parameter self

      before do
        create_list(:user, 2, birthyear: 1980)
        create(:user, birthyear: 1976)
        @group = create(:group)
        User.all.each{|u| create(:membership, user: u, group: @group)}
        create(:user, birthyear: 1980)
      end

      let(:group) { @group.id }

      example_request "Users by birthyear" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response).to match({
          '1980': 2,
          '1976': 1,
          _blank: 1,
        })
      end
    end

    get "web_api/v1/stats/users_by_domicile" do
      time_boundary_parameters self
      group_filter_parameter self

      before do
        @area1, @area2, @area3 = create_list(:area, 3)
        create_list(:user, 2, domicile: @area1.id)
        create(:user, domicile: @area2.id)
        @group = create(:group)
        User.all.each{|u| create(:membership, user: u, group: @group)}
        create(:user, birthyear: 1980)
      end

      let(:group) { @group.id }

      example_request "Users by domicile" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response).to match({
          :areas => {
            @area1.id.to_sym => { title_multiloc: @area1.title_multiloc.symbolize_keys },
            @area2.id.to_sym => { title_multiloc: @area2.title_multiloc.symbolize_keys }
          },
          :data => {
            @area1.id.to_sym => 2,
            @area2.id.to_sym  => 1,
            _blank: 1
          }
        })
      end
    end

    get "web_api/v1/stats/users_by_education" do
      time_boundary_parameters self
      group_filter_parameter self

      before do
        create_list(:user, 2, education: '3')
        create(:user, education: '5')
        @group = create(:group)
        User.all.each{|u| create(:membership, user: u, group: @group)}
        create(:user, education: '3')
      end

      let(:group) { @group.id }

      example_request "Users by education" do
        expect(response_status).to eq 200
        json_response = json_parse(response_body)
        expect(json_response).to match({
          '3': 2,
          '5': 1,
          _blank: 1,
        })
      end
    end

    get "web_api/v1/stats/users_by_custom_field/:custom_field_id" do
      time_boundary_parameters self
      group_filter_parameter self

      describe "with select field" do
        before do
          @group = create(:group)
          @custom_field = create(:custom_field_select)
          @option1, @option2, @option3 = create_list(:custom_field_option, 3, custom_field: @custom_field)
          travel_to(start_at - 1.day) do
            create(:user, custom_field_values: { @custom_field.key => @option1.key}, manual_groups: [@group])
          end

          create(:user, custom_field_values: { @custom_field.key => @option1.key}, manual_groups: [@group])
          create(:user, custom_field_values: { @custom_field.key => @option2.key}, manual_groups: [@group])
          create(:user, manual_groups: [@group])
          create(:user, custom_field_values: { @custom_field.key => @option3.key})

          travel_to(end_at + 1.day) do
            create(:user, custom_field_values: { @custom_field.key => @option1.key}, manual_groups: [@group])
          end

        end

        let(:group) { @group.id }
        let(:custom_field_id) { @custom_field.id }

        example_request "Users by custom field (select)" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response).to match({
            options: {
              @option1.key.to_sym => { title_multiloc: @option1.title_multiloc.symbolize_keys },
              @option2.key.to_sym => { title_multiloc: @option2.title_multiloc.symbolize_keys },
            },
            data: {
              @option1.key.to_sym => 1,
              @option2.key.to_sym => 1,
              _blank: 1
            }
          })
        end

      end


      describe "with multiselect field" do
        before do
          @group = create(:group)
          @custom_field = create(:custom_field_multiselect)
          @option1, @option2, @option3 = create_list(:custom_field_option, 3, custom_field: @custom_field)
          travel_to(start_at - 1.day) do
            create(:user, custom_field_values: { @custom_field.key => [@option1.key]}, manual_groups: [@group])
          end

          create(:user, custom_field_values: { @custom_field.key => [@option1.key]}, manual_groups: [@group])
          create(:user, custom_field_values: { @custom_field.key => [@option1.key, @option2.key]}, manual_groups: [@group])
          create(:user, manual_groups: [@group])
          create(:user, custom_field_values: { @custom_field.key => [@option3.key]})

          travel_to(end_at + 1.day) do
            create(:user, custom_field_values: { @custom_field.key => [@option1.key]}, manual_groups: [@group])
          end

        end

        let(:group) { @group.id }
        let(:custom_field_id) { @custom_field.id }

        example_request "Users by custom field (multiselect)" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response).to match({
            options: {
              @option1.key.to_sym => { title_multiloc: @option1.title_multiloc.symbolize_keys },
              @option2.key.to_sym => { title_multiloc: @option2.title_multiloc.symbolize_keys },
            },
            data: {
              @option1.key.to_sym => 2,
              @option2.key.to_sym => 1,
              _blank: 1
            }
          })
        end
      end

      describe "with checkbox field" do
        before do
          @group = create(:group)
          @custom_field = create(:custom_field_checkbox)
          travel_to(start_at - 1.day) do
            create(:user, custom_field_values: { @custom_field.key => false}, manual_groups: [@group])
          end
          create(:user, custom_field_values: { @custom_field.key => true}, manual_groups: [@group])
          create(:user, custom_field_values: { @custom_field.key => false}, manual_groups: [@group])
          create(:user, manual_groups: [@group])

          travel_to(end_at + 1.day) do
            create(:user, custom_field_values: { @custom_field.key => true}, manual_groups: [@group])
          end
        end

        let(:group) { @group.id }
        let(:custom_field_id) { @custom_field.id }

        example_request "Users by custom field (checkbox)" do
          expect(response_status).to eq 200
          json_response = json_parse(response_body)
          expect(json_response).to match({
            true: 1,
            false: 1,
            _blank: 1
          })
        end
      end
    end

  end
end
