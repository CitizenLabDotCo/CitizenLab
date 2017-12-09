FactoryGirl.define do
  factory :project do
    title_multiloc {{
      "en" => "Renew West Parc",
      "nl" => "Westpark vernieuwen"
    }}
    description_multiloc {{
      "en" => "<p>Let's renew the parc at the city border and make it an enjoyable place for young and old.</p>",
      "nl" => "<p>Laten we het park op de grend van de stad vernieuwen en er een aangename plek van maken, voor jong en oud.</p>"
    }}

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
            start_at: start_at,
            end_at: start_at += rand(120).days
          )
        end
      end
    end

    factory :private_admins_project do
      visible_to :admins
    end

    factory :private_groups_project do
      visible_to 'groups'
      transient do
        user nil
      end
      after(:create) do |project, evaluator|
        group = create(:group)
        project.groups << group
        if evaluator&.user
          group.users << evaluator&.user
        end
      end
    end
  end
end
