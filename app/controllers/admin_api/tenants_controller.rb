class AdminApi::TenantsController < AdminApi::AdminApiController

  before_action :set_tenant, only: [:show, :update, :destroy]

  def index
    @tenants = Tenant.all
    render json: @tenants
  end

  def show
    render json: @tenant
  end

  def create
    @tenant = Tenant.new(tenant_params)
    if @tenant.save
      render json: @tenant, status: :created
    else
      render json: {errors: @tenant.errors.details}, status: :unprocessable_entity
    end
  end

  def update
    updated_settings = Tenant.current.settings.deep_merge(tenant_params[:settings].to_h)
    if @tenant.update(tenant_params)
      render json: @tenant, status: :ok
    else
      render json: {errors: @tenant.errors.details}, status: :unprocessable_entity
    end
  end

  def settings_schema
    render json: Tenant::SETTINGS_JSON_SCHEMA
  end

  private

  def secure_controller?
    false
  end

  def set_tenant
    @tenant = Tenant.find(params[:id])
  end

  def tenant_params
    # Not perfect, but it's hard to translate all the features/settings to
    # permitted attributes structure, at least in a general way. The json
    # schema validation, however, should be covering all settings that are not
    # allowed
    all_settings = params.require(:tenant).fetch(:settings, nil).try(:permit!)
    params.require(:tenant).permit(:name, :host).merge(:settings => all_settings)
  end

end
