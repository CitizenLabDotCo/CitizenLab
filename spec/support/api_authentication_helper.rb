module ApiAuthenticationHelper
  def admin_authentication_header
    header_token_for create(:admin)
  end

  def user_authentication_header
    header_token_for create(:user)
  end

  def header_token_for(user)
    token = Knock::AuthToken.new(payload: user.to_token_payload).token
    header 'Authorization', "Bearer #{token}"
  end
end
