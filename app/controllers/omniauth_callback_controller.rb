class OmniauthCallbackController < ApplicationController
  include ActionController::Cookies
  skip_after_action :verify_authorized


  def create
    sso_service = SingleSignOnService.new

    auth = request.env['omniauth.auth']
    omniauth_params = request.env['omniauth.params']
    provider = auth['provider']

    @identity = Identity.find_with_omniauth(auth) || Identity.create_with_omniauth(auth)

    @user = @identity.user || User.find_by_cimail(auth.info.email)

    if @user
      @identity.update(user: @user) unless @identity.user
      if sso_service.update_on_sign_in?(provider)
        @user.update(sso_service.profile_to_user_attrs(auth))
      end
      set_auth_cookie(provider: provider)
      redirect_to(add_uri_params(FrontendService.new.signin_success_url(locale: @user.locale), omniauth_params))
    else
      @user = User.new(sso_service.profile_to_user_attrs(auth))
      SideFxUserService.new.before_create(@user, nil)
      @user.identities << @identity
      begin
        @user.save!
        SideFxUserService.new.after_create(@user, nil)
        set_auth_cookie(provider: provider)
        redirect_to(add_uri_params(FrontendService.new.signup_success_url(locale: @user.locale), omniauth_params))

      rescue ActiveRecord::RecordInvalid => e
        Rails.logger.info "Social signup failed: #{e.message}"
        redirect_to(add_uri_params(FrontendService.new.signin_failure_url, omniauth_params))
      end
    end

  end

  def failure
    omniauth_params = request.env['omniauth.params']
    redirect_to(add_uri_params(FrontendService.new.signin_failure_url, omniauth_params))
  end

  def logout
    provider = params[:provider]
    user_id = params[:user_id]
    user = User.find(user_id)
    sso_service = SingleSignOnService.new

    url = sso_service.logout_url(provider, user)

    redirect_to url
  rescue ActiveRecord::RecordNotFound => e
    redirect_to FrontendService.new.home_url
  end


  def secure_controller?
    false
  end

  def add_uri_params uri, params={}
    uri =  URI.parse(uri)
    new_query_ar = URI.decode_www_form(String(uri.query))
    params&.each do |key, value|
      new_query_ar << [key, value]
    end
    uri.query = URI.encode_www_form(new_query_ar)
    uri.to_s
  end

  def auth_token entity, provider
    payload = if entity.respond_to? :to_token_payload
      entity.to_token_payload
    else
      { sub: entity.id }
    end

    Knock::AuthToken.new payload: payload.merge({
      provider: provider,
      logout_supported: SingleSignOnService.new.supports_logout?(provider)
    })
  end

  def set_auth_cookie provider: nil
    cookies[:cl2_jwt] = {
      value: auth_token(@user, provider).token,
      expires: 1.month.from_now
    }
  end

end
