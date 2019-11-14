module OmniauthMethods
  class AzureActiveDirectory

    def omniauth_setup tenant, env
      if tenant.has_feature?('azure_ad_login')
        env['omniauth.strategy'].options[:client_id] = Tenant.settings("azure_ad_login", "client_id")
        env['omniauth.strategy'].options[:tenant] = Tenant.settings("azure_ad_login", "tenant")
      end
    end

    def profile_to_user_attrs auth
      {
        first_name: auth.info['first_name'],
        last_name: auth.info['last_name'],
        email: auth.info['email'],
        remote_avatar_url: auth.info['image'],
        locale: Tenant.current.closest_locale_to(auth.extra.raw_info.locale)
      }
    end
  end

  def updateable_user_attrs
    [:remote_avatar_url]
  end
end