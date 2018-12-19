FACEBOOK_SETUP_PROC = lambda do |env| 
  tenant = Tenant.current
  if tenant.has_feature('facebook_login')
    env['omniauth.strategy'].options[:client_id] = Tenant.settings("facebook_login", "app_id")
    env['omniauth.strategy'].options[:client_secret] = Tenant.settings("facebook_login", "app_secret")
    env['omniauth.strategy'].options[:info_fields] = "first_name,last_name,email,birthday,education,gender,locale,third_party_id,timezone,age_range,picture.width(640).height(640)"
  end
end

GOOGLE_SETUP_PROC = lambda do |env|
  tenant = Tenant.current
  if tenant.has_feature('google_login')
    env['omniauth.strategy'].options[:client_id] = Tenant.settings("google_login", "client_id")
    env['omniauth.strategy'].options[:client_secret] = Tenant.settings("google_login", "client_secret")
    env['omniauth.strategy'].options[:image_size] = 640
    env['omniauth.strategy'].options[:image_aspect_ratio] = "square"
  end
end

AZURE_AD_SETUP_PROC = lambda do |env|
  tenant = Tenant.current
  if tenant.has_feature('azure_ad_login')
    env['omniauth.strategy'].options[:client_id] = Tenant.settings("azure_ad_login", "client_id")
    env['omniauth.strategy'].options[:tenant] = Tenant.settings("azure_ad_login", "tenant")
  end
end

FRANCECONNECT_SETUP_PROC = lambda do |env|
  tenant = Tenant.current
  if tenant.has_feature('franceconnect_login')

    host = SingleSignOnService.new.franceconnect_host

    options = env['omniauth.strategy'].options
    options[:scope] = [:openid, :profile, :email, :address]
    options[:response_type] = :code
    options[:state] = true # Requis par France connect
    options[:nonce] = true # Requis par France connect
    options[:issuer] = "https://#{host}" # L'environnement d'intégration utilise à présent 'https'
    options[:client_auth_method] = 'Custom' # France connect n'utilise pas l'authent "BASIC".
    options[:client_signing_alg] = :HS256   # Format de hashage France Connect
    options[:client_options] = {
      identifier: Tenant.settings("franceconnect_login", "identifier"),
      secret: Tenant.settings("franceconnect_login", "secret"),
      port: 443,
      scheme: 'https',
      host: host,
      redirect_uri: "#{tenant.base_backend_uri}/auth/franceconnect/callback",
      authorization_endpoint: '/api/v1/authorize',
      token_endpoint: '/api/v1/token',
      userinfo_endpoint: '/api/v1/userinfo'
    }

  end
end


# TWITTER_SETUP_PROC = lambda do |env|
#   tenant = Tenant.current
#   if tenant.has_feature('twitter_login')
#     env['omniauth.strategy'].options[:client_id] = Tenant.settings("twitter_login", "api_key")
#     env['omniauth.strategy'].options[:client_secret] = Tenant.settings("twitter_login", "api_secret")
#   end
# end

   
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, :setup => FACEBOOK_SETUP_PROC
  provider :google_oauth2, :setup => GOOGLE_SETUP_PROC, name: 'google'
  provider :azure_activedirectory, :setup => AZURE_AD_SETUP_PROC
  provider :openid_connect, :setup => FRANCECONNECT_SETUP_PROC, name: 'franceconnect'

  # provider :twitter, :setup => TWITTER_SETUP_PROC
end


OmniAuth.config.full_host = -> (env) {
  Tenant.current&.base_backend_uri
}
