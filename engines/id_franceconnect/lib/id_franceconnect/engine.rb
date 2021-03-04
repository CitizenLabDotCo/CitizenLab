# frozen_string_literal: true

module IdFranceconnect
  class Engine < ::Rails::Engine
    isolate_namespace IdFranceconnect

    config.to_prepare do
      fc = FranceconnectOmniauth.new
      AuthenticationService.add_method('franceconnect', fc)
      Verification::VerificationService.add_method(fc)
    end
  end
end
