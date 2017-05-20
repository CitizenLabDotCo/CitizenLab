FactoryGirl.define do
  factory :event do
    project
    title_multiloc {{
      "en" => "Info session",
      "nl" => "Info avond"
    }}
    description_multiloc {{
      "en" => "<p>Be there and learn everything about our future!</p>",
      "nl" => "<p>Kom en ontdek de toekomst!</p>"
    }}
    location_multiloc {{
      "en" => "Vogelstraat 4, around the corner",
      "nl" => "Vogelstraat 4, om de hoek"
    }}
    start_at "2017-05-01 20:00"
    end_at "2017-05-01 22:00"
  end
end

