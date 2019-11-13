class OmniauthCallbackController < ApplicationController
  include ActionController::Cookies
  skip_after_action :verify_authorized

  def create
    byebug
    auth = request.env['omniauth.auth']
    provider = auth['provider']
    auth_method = AuthenticationService.new.method_by_provider(provider)
    verification_method = Verification::VerificationService.new.method_by_name(provider)
    if auth_method
      auth_callback verify: !!verification_method
    elsif verification_method
      verification_callback verification_method
    else
      raise "#{provider} not supported"
    end
  end

  def verification_callback verification_method
    auth = request.env['omniauth.auth']
    omniauth_params = request.env['omniauth.params'].except('token')
    @user = current_user

    if @user&.active?
      @user.update!(verification_method.profile_to_user_attrs(auth))
      begin
        handle_verification(auth, @user)
        redirect_to(add_uri_params(Frontend::UrlService.new.verification_success_url(locale: @user.locale), omniauth_params))
      rescue VerificationService::VerificationTakenError => e
        redirect_to(add_uri_params(Frontend::UrlService.new.verification_error_url(locale: @user.locale), omniauth_params.merge(error: 'taken')))
      rescue VerificationService::NotEntitledError => e
        redirect_to(add_uri_params(Frontend::UrlService.new.verification_error_url(locale: @user.locale), omniauth_params.merge(error: 'not_entitled')))
      end
    end
  end

  def auth_callback verify:
    auth_service = AuthenticationService.new

    auth = request.env['omniauth.auth']
    omniauth_params = request.env['omniauth.params']
    provider = auth['provider']

    @identity = Identity.find_with_omniauth(auth) || Identity.create_with_omniauth(auth)

    @user = @identity.user || User.find_by_cimail(auth.info.email)

    if @user
      @identity.update(user: @user) unless @identity.user

      if @user.invite_pending?
        @invite = @user.invitee_invite
        if !@invite || @invite.accepted_at
          failure
          return
        end
        @user.assign_attributes(auth_service.profile_to_user_attrs(auth).merge(invite_status: 'accepted'))
        ActiveRecord::Base.transaction do
          SideFxInviteService.new.before_accept @invite
          @user.save!
          @invite.save!
          SideFxInviteService.new.after_accept @invite
        rescue ActiveRecord::RecordInvalid => e
          Raven.capture_exception e
          failure
          return
        end

      else # !@user.invite_pending?
        if auth_service.update_on_sign_in?(provider)
          begin
            @user.update!(auth_service.profile_to_user_attrs(auth))
          rescue ActiveRecord::RecordInvalid => e
            Raven.capture_exception e
            failure
            return
          end
        end
      end

      set_auth_cookie(provider: provider)
      handle_verification(auth, @user) if verify
      redirect_to(add_uri_params(Frontend::UrlService.new.signin_success_url(locale: @user.locale), omniauth_params))

    else # New user
      @user = User.new(auth_service.profile_to_user_attrs(auth))
      SideFxUserService.new.before_create(@user, nil)
      @user.identities << @identity
      begin
        @user.save!
        SideFxUserService.new.after_create(@user, nil)
        set_auth_cookie(provider: provider)
        handle_verification(auth, @user) if verify
        redirect_to(add_uri_params(Frontend::UrlService.new.signup_success_url(locale: @user.locale), omniauth_params))

      rescue ActiveRecord::RecordInvalid => e
        Rails.logger.info "Social signup failed: #{e.message}"
        redirect_to(add_uri_params(Frontend::UrlService.new.signin_failure_url, omniauth_params))
      end
    end

  end

  def failure
    omniauth_params = request.env['omniauth.params']
    redirect_to(add_uri_params(Frontend::UrlService.new.signin_failure_url, omniauth_params))
  end

  def logout
    provider = params[:provider]
    user_id = params[:user_id]
    user = User.find(user_id)
    auth_service = AuthenticationService.new

    url = auth_service.logout_url(provider, user)

    redirect_to url
  rescue ActiveRecord::RecordNotFound => e
    redirect_to Frontend::UrlService.new.home_url
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
      logout_supported: AuthenticationService.new.supports_logout?(provider)
    })
  end

  def set_auth_cookie provider: nil
    cookies[:cl2_jwt] = {
      value: auth_token(@user, provider).token,
      expires: 1.month.from_now
    }
  end

  def handle_verification auth, user
    if Tenant.current.has_feature? 'verification'
      verification_service = Verification::VerificationService.new
      if verification_service.is_active? Tenant.current, auth.provider
        verification_service.verify_omniauth(
          auth: auth,
          user: user
        )
      end
    end
  end

end
