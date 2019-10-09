class SmartGroupsService

  RULE_TYPE_TO_CLASS = [
    SmartGroupRules::CustomFieldText,
    SmartGroupRules::CustomFieldSelect,
    SmartGroupRules::CustomFieldCheckbox,
    SmartGroupRules::CustomFieldDate,
    SmartGroupRules::CustomFieldNumber,
    SmartGroupRules::Role,
    SmartGroupRules::Email,
    SmartGroupRules::LivesIn,
    SmartGroupRules::RegistrationCompletedAt,
    SmartGroupRules::ParticipatedInProject,
    SmartGroupRules::ParticipatedInTopic,
    SmartGroupRules::ParticipatedInIdeaStatus,
    SmartGroupRules::Verified,
  ].map do |smart_group_class|
    [smart_group_class::RULE_TYPE, smart_group_class]
  end.to_h

  def filter users_scope, json_rules
    rules = parse_json_rules json_rules
    result = rules.inject(users_scope) do |memo, rule|
      rule.filter(memo)
    end
  end

  # This method is very carefully written to do it all in
  # 2 queries, so beware when editing
  def groups_for_user user
    Group.where(membership_type: 'rules').map do |group|
      # We're using `id: [user.id]` instead of `id: user.id` to
      # workaround this rails/arel issue:
      # https://github.com/rails/rails/issues/20077
      Group
        .where(id: group.id)
        .where(filter(User.where(id: [user.id]), group.rules).arel.exists)
    end.inject(:or) || Group.none
  end

  def generate_rules_json_schema
    {
      "description" => "Schema for validating the rules used in smart groups",
      "type" => "array",
      "items" => {
        "anyOf" => each_rule.flat_map do |rule_claz|
          rule_claz.to_json_schema
        end
      },
      "definitions" => {
        "uuid" => {
          "type" => "string",
          "pattern" => "^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{4}-[a-fA-F0-9]{12}$"
        },
        "customFieldId" => {
          "description" => "The ID of a custom field",
          "$ref" => "#/definitions/uuid"
        },
        "customFieldOptionId" => {
          "description" => "The ID of a custom field option",
          "$ref" => "#/definitions/uuid"
        }
      }
    }
  end

  def parse_json_rules json_rules
    json_rules.map do |json_rule|
      parse_json_rule json_rule
    end
  end

  def parse_json_rule json_rule
    rule_class = rule_type_to_class(json_rule['ruleType'])
    rule_class.from_json(json_rule)
  end


  private

  def each_rule
    RULE_TYPE_TO_CLASS.values.each
  end

  def rule_type_to_class rule_type
    RULE_TYPE_TO_CLASS[rule_type]
  end

end