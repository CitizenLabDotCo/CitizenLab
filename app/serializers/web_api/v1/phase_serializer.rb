class WebApi::V1::PhaseSerializer < ActiveModel::Serializer
  attributes :id, :title_multiloc, :description_multiloc, :participation_method, :start_at, :end_at, :created_at, :updated_at

  #ParticipationContext attributes
  attributes :participation_method, :voting_method, :voting_limited_max, :presentation_mode, :survey_embed_url, :survey_service
  
  belongs_to :project
end
