FactoryBot.define do
  factory :campaign, :class => EmailCampaigns::Campaign do
    type "ManualCampaign"
    author
    sender "author"
    reply_to "author"
    subject_multiloc {{
      "en" => "We're almost done with your feedback"  
    }}
    body_multiloc {{
      "en" => "Time to check it all out!"  
    }}
  end
end
