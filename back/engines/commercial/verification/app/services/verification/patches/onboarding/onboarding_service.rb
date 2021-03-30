# frozen_string_literal: true

module Verification
  module Patches
    module Onboarding
      module OnboardingService
        def self.prepended(base)
          base.class_eval do
            base.singleton_class.prepend(ClassMethods)
          end
        end

        module ClassMethods
          def campaigns
            super << 'verification'
          end
        end

        def _current_campaign(user, dismissals)
          if needs_verification?(user) && dismissals.exclude?('verification')
            :verification
          else
            super
          end
        end

        private

        def needs_verification?(user)
          AppConfiguration.instance.feature_activated?('verification') && !user.verified
        end
      end
    end
  end
end
