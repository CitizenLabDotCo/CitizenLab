FactoryGirl.define do
  factory :page do
    title_multiloc {{
      "en" => Faker::Lorem.sentence,
      "nl" => Faker::Lorem.sentence
    }}
    body_multiloc {{
      "en" => Faker::Lorem.paragraphs.map{|p| "<p>#{p}</p>"}.join,
      "nl" => Faker::Lorem.paragraphs.map{|p| "<p>#{p}</p>"}.join
    }}
    slug { Faker::Internet.slug }
  end
end
