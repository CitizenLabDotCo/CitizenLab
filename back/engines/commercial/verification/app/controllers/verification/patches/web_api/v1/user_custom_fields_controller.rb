# frozen_string_literal: true

module Verification
  module Patches
    module WebApi
      module V1
        module UserCustomFieldsController
          def get_ui_schema_multiloc(fields)
            super.tap do |ui_schema_multiloc|
              mark_locked_fields(ui_schema_multiloc) if current_user
            end
          end
          
          private

          def mark_locked_fields(ui_schema_multiloc)
            locked_custom_fields = verification_service.locked_custom_fields(current_user).map(&:to_s)
            ui_schema_multiloc.each do |_locale, ui_schema|
              ui_schema.keys
                       .select { |key| locked_custom_fields.include?(key) }
                       .each do |key|
                ui_schema[key]['ui:disabled'] = true
                ui_schema[key]['ui:options'] = ui_schema[key]['ui_options'].to_h.merge(verificationLocked: true)
              end
            end
          end

          def verification_service
            @verification_service ||= VerificationService.new
          end
        end
      end
    end
  end
end
