FactoryBot.define do
  factory :project do
    title_multiloc {{
      "en" => "Renew West Parc",
      "nl-BE" => "Westpark vernieuwen"
    }}
    description_multiloc {{
      "en" => "<p>Let's renew the parc at the city border and make it an enjoyable place for young and old.</p>",
      "nl-BE" => "<p>Laten we het park op de grend van de stad vernieuwen en er een aangename plek van maken, voor jong en oud.</p>"
    }}
    description_preview_multiloc {{
      "en" => "Let's renew the parc at the city border and make it an enjoyable place for young and old.",
      "nl-BE" => "Laten we het park op de grend van de stad vernieuwen en er een aangename plek van maken, voor jong en oud."
    }}
    publication_status 'published'

    factory :project_with_topics do
      transient do
        topics_count 5
      end
      after(:create) do |project, evaluator|
        evaluator.topics_count.times do |i|
          project.topics << create(:topic)
        end
      end
    end

    factory :project_with_areas do
      transient do
        areas_count 5
      end
      after(:create) do |project, evaluator|
        evaluator.areas_count.times do |i|
          project.areas << create(:area)
        end
      end
    end

    factory :project_with_phases do
      transient do
        phases_count 5
      end
      after(:create) do |project, evaluator|
        start_at = Faker::Date.between(1.year.ago, 1.year.from_now)
        evaluator.phases_count.times do |i|
          project.phases << create(:phase, 
            start_at: start_at + 1,
            end_at: start_at += (1 + rand(120)).days
          )
        end
      end
    end

    factory :project_with_active_ideation_phase do
      after(:create) do |project, evaluator|
        project.phases << create(:active_phase, participation_method: 'ideation')
      end
    end


    factory :project_with_past_phases do
      transient do
        phases_count 5
      end
      after(:create) do |project, evaluator|
        start_at = Faker::Date.between(2.year.ago, 1.year.ago)
        evaluator.phases_count.times do |i|
          project.phases << create(:phase, 
            start_at: start_at + 1,
            end_at: start_at += (1+ rand(72)).days
          )
        end
      end
    end

    factory :project_with_current_phase do
      transient do
        current_phase_attrs {{}}
        phases_config {{sequence: "xxcxx"}}
      end
      after(:create) do |project, evaluator|
        active_phase = create(:phase, 
          start_at: Faker::Date.between(6.months.ago, Time.now),
          end_at: Faker::Date.between(Time.now+1.day, 6.months.from_now),
          project: project,
          **(evaluator.current_phase_attrs.merge((evaluator.phases_config[:c] || {})))
        )
        phases_before, phases_after = evaluator.phases_config[:sequence].split('c')

        end_at = active_phase.start_at
        phases_before&.chars&.map(&:to_sym)&.reverse&.each do |sequence_char|
          project.phases << create(:phase, 
            end_at: end_at - 1,
            start_at: end_at -= (1 + rand(120)).days,
            **(evaluator.phases_config[sequence_char] || {})
          )
        end

        start_at = active_phase.end_at
        phases_after&.chars&.map(&:to_sym)&.each do |sequence_char|
          project.phases << create(:phase, 
            start_at: start_at + 1,
            end_at: start_at += (1 + rand(120)).days,
            **(evaluator.phases_config[sequence_char] || {})
          )
        end
      end
    end

    factory :project_with_future_phases do
      transient do
        phases_count 5
      end
      after(:create) do |project, evaluator|
        start_at = Faker::Date.between(Time.now, 1.year.from_now)
        evaluator.phases_count.times do |i|
          project.phases << create(:phase, 
            start_at: start_at + 1,
            end_at: start_at += (1 + rand(120)).days
          )
        end
      end
    end


    factory :project_xl do
      transient do
        ideas_count 10
        topics_count 3
        areas_count 3
        phases_count 3
        events_count 3
        pages_count 3
        images_count 3
        files_count 3
        groups_count 3
      end
      after(:create) do |project, evaluator|
        evaluator.ideas_count.times do |i|
          project.ideas << create(:idea)
        end
        evaluator.topics_count.times do |i|
          project.topics << create(:topic)
        end
        evaluator.areas_count.times do |i|
          project.areas << create(:area)
        end
        evaluator.phases_count.times do |i|
          project.phases << create(:phase_sequence)
        end
        evaluator.events_count.times do |i|
          project.events << create(:event)
        end
        evaluator.pages_count.times do |i|
          project.pages << create(:page)
        end
        evaluator.images_count.times do |i|
          project.project_images << create(:project_image)
        end
        evaluator.files_count.times do |i|
          project.project_files << create(:project_file)
        end
        evaluator.groups_count.times do |i|
          project.groups << create(:group)
        end
      end
    end


    factory :private_admins_project do
      visible_to :admins
    end

    factory :private_groups_project do
      visible_to 'groups'
      transient do
        groups_count 1
        user nil
      end
      after(:create) do |project, evaluator|
        evaluator.groups_count.times do |i|
          group = create(:group)
          project.groups << group
          if evaluator&.user
            group.members << evaluator&.user
          end
        end
      end
    end

    factory :continuous_project do
      process_type 'continuous'
      participation_method 'ideation'
      posting_enabled true
      commenting_enabled true
      voting_enabled true
      voting_method 'unlimited'
      voting_limited_max 7
    end

    factory :continuous_survey_project do
      process_type 'continuous'
      participation_method 'survey'
      survey_service 'typeform'
      survey_embed_url "https://citizenlabco.typeform.com/to/HKGaPV"
    end

    factory :continuous_budgeting_project do
      process_type 'continuous'
      participation_method 'budgeting'
      max_budget 10000
      currency 'cheeseburgers'
    end

  end
end
