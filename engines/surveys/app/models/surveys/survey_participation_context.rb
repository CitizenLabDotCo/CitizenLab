module Surveys::SurveyParticipationContext
  extend ActiveSupport::Concern

  SURVEY_SERVICES = %w(typeform survey_monkey google_forms)

  included do
    
    with_options if: :survey?, unless: :is_timeline_project? do |survey|
      survey.validates :survey_embed_url, presence: true
      survey.validates :survey_service, presence: true, inclusion: {in: SURVEY_SERVICES}
      survey.validates :survey_embed_url, if: [:survey?, :typeform?], format: { 
        with: /\Ahttps:\/\/.*\.typeform\.com\/to\/.*\z/,
        message: "Not a valid Typeform embed URL"
      }
      survey.validates :survey_embed_url, if: [:survey?, :survey_monkey?], format: { 
        with: /\Ahttps:\/\/widget\.surveymonkey\.com\/collect\/website\/js\/.*\.js\z/,
        message: "Not a valid SurveyMonkey embed URL"
      }
      survey.validates :survey_embed_url, if: [:survey?, :google_forms?], format: { 
        with: /\Ahttps:\/\/docs.google.com\/forms\/d\/e\/.*\/viewform\?embedded=true\z/,
        message: "Not a valid Google Forms embed URL"
      }
    end
  end

  def survey?
    self.participation_method == 'survey'
  end

  private

  def typeform?
    self.survey_service == 'typeform'
  end

  def survey_monkey?
    self.survey_service == 'survey_monkey'
  end

  def google_forms?
    self.survey_service == 'google_forms'
  end
end