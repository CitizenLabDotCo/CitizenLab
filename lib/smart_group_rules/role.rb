module SmartGroupRules
  class Role
    include ActiveModel::Validations

    PREDICATE_VALUES = %w(
      is_admin
      not_is_admin
      is_project_moderator
      not_is_project_moderator
      is_normal_user
      not_is_normal_user
    )
    RULE_TYPE = "role"

    attr_accessor :predicate

    validates :predicate, presence: true
    validates :predicate, inclusion: { in: PREDICATE_VALUES }

    def self.to_json_schema
      {
        "type" => "object",
        "additionalProperties" => false,
        "required" => ["ruleType", "predicate"],
        "properties" => {
          "ruleType" => {
            "type" => "string",
            "enum" => [RULE_TYPE]
          },
          "predicate" => {
            "type" => "string",
            "enum" => PREDICATE_VALUES
          }
        }
      }
    end

    def self.from_json json
      self.new(json['predicate'])
    end

    def initialize predicate
      self.predicate = predicate
    end

    def filter users_scope
      @predicate
      case predicate
      when 'is_admin'
        users_scope.admin
      when 'not_is_admin'
        users_scope.not_admin
      when 'is_project_moderator'
        users_scope.project_moderator
      when 'not_is_project_moderator'
        users_scope.not_project_moderator
      when 'is_normal_user'
        users_scope.normal_user
      when 'not_is_normal_user'
        users_scope.not_normal_user
      else
        raise "Unsupported predicate #{predicate}"
      end
    end

  end
end