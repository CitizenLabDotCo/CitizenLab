module Roles
  module Authorizable
    extend ActiveSupport::Concern

    included do
      skip_after_action :verify_authorized, unless: :policy_present?
      skip_after_action :verify_policy_scoped, unless: :policy_present?
    end

    def policy_present?
      policy_class.present?
    end

    def policy_scope_class
      policy_class::Scope
    end

    def policy_class
      role_mapping.policy
    end

    def policy_namespace
      roled_resource.classify.pluralize
    end
  end
end
