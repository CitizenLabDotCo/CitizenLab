class ApplicationController < ActionController::API
  include Knock::Authenticable
  include Pundit

  before_action :set_current
  before_action :authenticate_user, if: :secure_controller?
  after_action :verify_authorized, except: :index
  after_action :verify_policy_scoped, only: :index

  rescue_from ActiveRecord::RecordNotFound, with: :send_not_found

  rescue_from ActionController::UnpermittedParameters do |pme|
    render json: { error:  { unknown_parameters: pme.params } }, 
      status: :bad_request
  end

  rescue_from ClErrors::TransactionError, :with => :transaction_error

  rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized

  # all controllers are secured by default
  def secure_controller?
    true
  end

  def send_success(data=nil, status=200)
    render json: data, status: status
  end

  def send_error(error=nil, status=400)
    render json: error, status: status
  end

  def send_not_found(error=nil)
    if error.nil?
      head 404, "content_type" => 'text/plain'
    else
      render json: error, status: 404
    end
  end

  def send_no_content(status=204)
    head status
  end

  def transaction_error(exception)
    render json: { errors: { base: [{ error: exception.error_key, message: exception.message }] } }, status: exception.code
  end

  def user_not_authorized
    render json: { errors: { base: [{ error: 'Unauthorized!' }] } }, status: :unauthorized
  end

  def set_current
    Current.tenant = Tenant.current
  rescue ActiveRecord::RecordNotFound
  end

  # Used by semantic logger to include in every log line
  def append_info_to_payload(payload)
    super
    payload[:tenant_id] = Current.tenant&.id
    payload[:user_id] = current_user&.id
    payload[:request_id] = request.request_id
    payload[:"X-Amzn-Trace-Id"] = request.headers["X-Amzn-Trace-Id"]
  end

  def basic_params
    {
      current_user: current_user
    }
  end
end
