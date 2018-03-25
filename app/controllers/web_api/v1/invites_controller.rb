class WebApi::V1::InvitesController < ApplicationController

  UNAUTHORIZED_ACCEPT_REASONS = {
    token_not_found: 'token_not_found',
    already_accepted: 'already_accepted'
  }


  skip_after_action :verify_authorized, only: [:accept]

  def index
    @invites = policy_scope(Invite)
      .includes(:invitee)
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    render json: @invites, include: ['invitee']
  end

  def bulk_create
    authorize :invite
    InvitesService.new.bulk_create(
      bulk_create_params[:emails], 
      bulk_create_params.except(:emails).stringify_keys, 
      current_user
    )
    head 200
  rescue InvitesService::InvitesFailedError => e
    render json: {errors: e.to_h}, status: :unprocessable_entity
  end

  def bulk_create_xlsx
    authorize :invite

    # Strip out data;...base64 prefix if it's there
    pure_base64 = if start = bulk_create_xlsx_params[:xlsx].index(';base64,')
      bulk_create_xlsx_params[:xlsx][(start+8)..-1]
    else
      bulk_create_xlsx_params[:xlsx]
    end

    xlsx = StringIO.new(Base64.decode64(pure_base64))
    InvitesService.new.bulk_create_xlsx(
      xlsx,
      bulk_create_params.except(:xlsx).stringify_keys, 
      current_user
    )
    head 200
  rescue InvitesService::InvitesFailedError => e
    render json: {errors: e.to_h}, status: :unprocessable_entity
  end

  def example_xlsx
    authorize :invite
    xlsx = InvitesService.new.generate_example_xlsx
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'ideas.xlsx'
  end


  def accept
    @invite = Invite.find_by(token: params[:token])
    if !@invite
      render json: { errors: { base: [{ error: UNAUTHORIZED_ACCEPT_REASONS[:token_not_found] }] } }, status: :unauthorized 
      return
    end
    if @invite.accepted_at
      render json: { errors: { base: [{ error: UNAUTHORIZED_ACCEPT_REASONS[:already_accepted] }] } }, status: :unauthorized 
      return
    end
    invitee = @invite.invitee
    begin
      ActiveRecord::Base.transaction do
        invitee.assign_attributes accept_params
        invitee.invite_status = 'accepted'
        if !invitee.save
          raise ClErrors::TransactionError.new(error_key: :unprocessable_invitee)
        end
        @invite.accepted_at = Time.now
        if !@invite.save
          raise ClErrors::TransactionError.new(error_key: :unprocessable_invite)
        end
        SideFxInviteService.new.after_accept(@invite)
        render json: @invite.reload, include: ['invitee'], status: :ok
      end
    rescue ClErrors::TransactionError => e
      if e.error_key == :unprocessable_invitee
        render json: { errors: invitee.errors.details }, status: :unprocessable_entity
      elsif e.error_key == :unprocessable_invite
        render json: { errors: @invite.errors.details }, status: :unprocessable_entity
      else
        raise e
      end
    end
  end

  def create_params
    params.require(:invite).permit(
      :email,
      :first_name, 
      :last_name, 
      :avatar, 
      :locale,
      :invite_text,
      roles: [:type, :project_id],
      group_ids: []
    )
  end

  def accept_params
    params.require(:invite).permit(
      :email,
      :first_name, 
      :last_name, 
      :password, 
      :locale, 
    )
  end

  def bulk_create_params
    params.require(:invites).permit(
      :locale,
      :invite_text,
      group_ids: [],
      roles: [:type, :project_id],
      emails: []
    )
  end

  def bulk_create_xlsx_params
    params.require(:invites).permit(
      :xlsx,
      :locale,
      :invite_text,
      group_ids: [],
      roles: [:type, :project_id]
    )
  end

  def secure_controller?
    # when accepting an invite, the user is still to be logged in;
    # hence, no user is logged in, therefore we do not want to
    # authenticate a user
    false
  end

end
