FACEBOOK_SETUP_PROC = lambda do |env| 
  request = Rack::Request.new(env)
  tenant = Tenant.current
  if tenant.has_feature('facebook_login')
    env['omniauth.strategy'].options[:client_id] = Tenant.settings("facebook_login", "app_id")
    env['omniauth.strategy'].options[:client_secret] = Tenant.settings("facebook_login", "app_secret")
    env['omniauth.strategy'].options[:info_fields] = "first_name,last_name,middle_name,email,birthday,education,gender,interested_in,locale,location,third_party_id,timezone,age_range,picture.width(640).height(640)"
  end
end


   
Rails.application.config.middleware.use OmniAuth::Builder do
  provider :facebook, :setup => FACEBOOK_SETUP_PROC
  # provider :google, :setup => GOOGLE_SETUP_PROC
end

