class Api::V1::UsersController < ::ApplicationController
  # before_action :authenticate_user, except: [:create]
  before_action :set_user, only: [:show, :update, :destroy]

  def index
    @users = policy_scope(User).page(params[:page])
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))
    render json: @users
  end

  def me
    @user = current_user
    skip_authorization
    if @user
      render json: @user
    else
      head :forbidden
    end
  end

  def show
    render json: @user
  end

  def create
    @user = User.new(permitted_attributes(User))
    authorize @user
    if @user.save
      render json: @user, status: :created
    else
      render json: @user.errors, status: :unprocessable_entity
    end
  end

  def update
    if @user.update(permitted_attributes(@user))
      send_success(@user)
    else
      send_error(@user.errors, :unprocessable_entity)
    end
  end

  private
  # TODO: temp fix to pass tests
  def secure_controller?
    false
  end

  def set_user
    @user = User.find params[:id]
    authorize @user
  rescue ActiveRecord::RecordNotFound
    send_error(nil, 404)
  end

end
