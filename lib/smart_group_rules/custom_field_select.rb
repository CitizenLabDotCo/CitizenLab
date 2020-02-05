module SmartGroupRules
  class CustomFieldSelect

    PREDICATE_VALUES = %w(has_value not_has_value is_empty not_is_empty)
    VALUELESS_PREDICATES = %w(is_empty not_is_empty)

    include CustomFieldRule

    validates :custom_field_id, inclusion: { in: proc { CustomField.with_resource_type('User').where(input_type: ['select', 'multiselect']).map(&:id) } }
    validates :value, inclusion: { in: -> (record) { CustomFieldOption.where(custom_field_id: record.custom_field_id).map(&:id) } }, if: :needs_value?

    def self.to_json_schema
      [   
        {
          "type": "object",
          "required" => ["ruleType", "customFieldId", "predicate", "value"],
          "additionalProperties" => false,
          "properties" => {
            "ruleType" => {
              "type" => "string",
              "enum" => [rule_type],
            },
            "customFieldId" => {
              "$ref": "#/definitions/customFieldId"
            },
            "predicate" => {
              "type": "string",
              "enum": PREDICATE_VALUES - VALUELESS_PREDICATES,
            },
            "value" => {
              "description" => "The id of one of the options of the custom field",
              "$ref": "#/definitions/customFieldOptionId"
            }
          },
        },
        {
          "type" => "object",
          "required" => ["ruleType", "customFieldId", "predicate"],
          "additionalProperties" => false,
          "properties" => {
            "ruleType" => {
              "type" => "string",
              "enum" => [rule_type],
            },
            "customFieldId" => {
              "$ref": "#/definitions/customFieldId"
            },
            "predicate" => {
              "type" => "string",
              "enum" => VALUELESS_PREDICATES
            }
          }
        }
      ]
    end

    def self.rule_type
      'custom_field_select'
    end

    def initialize custom_field_id, predicate, value=nil
      self.custom_field_id = custom_field_id
      self.predicate = predicate
      self.value = value
    end

    def filter users_scope
      custom_field = CustomField.find(custom_field_id)
      key = custom_field.key
      if custom_field.input_type == 'select'
        case predicate
        when 'has_value'
          option_key = CustomFieldOption.find(value).key
          users_scope.where("custom_field_values->>'#{key}' = ?", option_key)
        when 'not_has_value'
          option_key = CustomFieldOption.find(value).key
          users_scope.where("custom_field_values->>'#{key}' IS NULL or custom_field_values->>'#{key}' != ?", option_key)
        when 'is_empty'
          users_scope.where("custom_field_values->>'#{key}' IS NULL")
        when 'not_is_empty'
          users_scope.where("custom_field_values->>'#{key}' IS NOT NULL")
        else
          raise "Unsupported predicate #{predicate}"
        end
      elsif custom_field.input_type == 'multiselect'
        case predicate
        when 'has_value'
          option_key = CustomFieldOption.find(value).key
          users_scope.where("(custom_field_values->>'#{key}')::jsonb ? :value", value: option_key)
        when 'not_has_value'
          option_key = CustomFieldOption.find(value).key
          users_scope.where("custom_field_values->>'#{key}' IS NULL OR NOT (custom_field_values->>'#{key}')::jsonb ? :value", value: option_key)
        when 'is_empty'
          users_scope.where("custom_field_values->>'#{key}' IS NULL OR (custom_field_values->>'#{key}')::jsonb = '[]'::jsonb")
        when 'not_is_empty'
          users_scope.where("custom_field_values->>'#{key}' IS NOT NULL AND (custom_field_values->>'#{key}')::jsonb != '[]'::jsonb")
        else
          raise "Unsupported predicate #{predicate}"
        end
      end
    end

    def description_value locale
      CustomFieldOption.find(value).title_multiloc[locale]
    end

    private

    def needs_value?
      !VALUELESS_PREDICATES.include?(predicate)
    end

  end
end