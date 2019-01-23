class SideFxParticipationContextService

  include SideFxHelper

  def initialize permissions_service=PermissionsService.new
    @permissions_service = permissions_service
  end

  def before_create pc, user
  end

  def after_create pc, user
    @permissions_service.update_permissions_for pc
    Surveys::WebhookManagerJob.perform_later('participation_context_created',
      pc.id,
      pc.participation_method,
      pc.survey_service,
      pc.survey_embed_url
    )
  end

  def before_update pc, user
  end

  def after_update pc, user
    @permissions_service.update_permissions_for pc
    Surveys::WebhookManagerJob.perform_later('participation_context_changed',
      pc.id,
      pc.participation_method_previous_change&.dig(0) || pc.participation_method,
      pc.participation_method,
      pc.survey_service_previous_change&.dig(0) || pc.survey_service,
      pc.survey_service,
      pc.survey_embed_url_previous_change&.dig(0) || pc.survey_embed_url,
      pc.survey_embed_url
    )
  end

  def before_destroy pc, user
    Surveys::WebhookManagerJob.perform_later('participation_context_to_be_deleted',
      pc.id,
      pc.participation_method,
      pc.survey_service,
      pc.survey_embed_url
    )
  end

  def after_destroy frozen_pc, user

  end

end
