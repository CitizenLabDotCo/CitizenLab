FactoryBot.define do
  factory :activity do
    association :item, factory: :idea
    action { "published" }
    acted_at {Time.now}
    user

    factory :idea_published_activity do
      action { "published" }
    end

    factory :idea_changed_title_activity do
      action { "changed_title" }
      payload {{
        "change" => [
          {"en" => "old title"},
          {"en" => "new title"}
        ]
      }}
    end

    factory :idea_changed_body_activity do
      action { "changed_body" }
      payload {{
        "change" => [
          {"en" => "old body"},
          {"en" => "new body"}
        ]
      }}
    end

    factory :idea_changed_status_activity do
      action { "changed_status" }
      payload {{
        "change" => [
          "somepreviousstatusid",
          "somenewstatusid"
        ]
      }}
    end

    factory :comment_created_activity do
      association :item, factory: :comment
      action { "created" }
    end

    factory :idea_upvoted_activity do
      association :item, factory: :vote
      action { "idea_upvoted" }
    end

    factory :idea_downvoted_activity do
      association :item, factory: :downvote
      action { "idea_downvoted" }
    end

    factory :comment_upvoted_activity do
      association :item, factory: :comment_vote
      action { "comment_upvoted" }
    end
  end



end
