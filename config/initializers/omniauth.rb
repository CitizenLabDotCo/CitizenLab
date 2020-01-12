FACEBOOK_SETUP_PROC = lambda do |env| 
  OmniauthMethods::Facebook.new.omniauth_setup(Tenant.current, env)
end

GOOGLE_SETUP_PROC = lambda do |env|
  OmniauthMethods::Google.new.omniauth_setup(Tenant.current, env)
end

AZURE_AD_SETUP_PROC = lambda do |env|
  OmniauthMethods::AzureActiveDirectory.new.omniauth_setup(Tenant.current, env)
end

FRANCECONNECT_SETUP_PROC = lambda do |env|
  OmniauthMethods::FranceConnect.new.omniauth_setup(Tenant.current, env)
end

BOSA_FAS_SETUP_PROC = lambda do |env|
  OmniauthMethods::BosaFas.new.omniauth_setup(Tenant.current, env)
end
 
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, :setup => FACEBOOK_SETUP_PROC
  provider :google_oauth2, :setup => GOOGLE_SETUP_PROC, name: 'google'
  provider :azure_activedirectory, :setup => AZURE_AD_SETUP_PROC
  provider :openid_connect, :setup => FRANCECONNECT_SETUP_PROC, name: 'franceconnect'
  provider :openid_connect, :setup => BOSA_FAS_SETUP_PROC, name: 'bosa_fas'
end


OmniAuth.config.full_host = -> (env) {
  Tenant.current&.base_backend_uri
}
