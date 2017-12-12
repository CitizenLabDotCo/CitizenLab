class WebApi::V1::SpamReportsController < ApplicationController

  before_action :set_spam_report, only: [:show, :update, :destroy]
  before_action :set_spam_reportable_type_and_id, only: [:index, :create]


  def index
    @spam_reports = policy_scope(SpamReport)
      .where(spam_reportable_type: @spam_reportable_type, spam_reportable_id: @spam_reportable_id)
      .includes(:user)
    render json: @spam_reports, include: ['user']
  end

  def show
    render json: @spam_report, include: ['user']
  end

  def create
    @spam_report = SpamReport.new(spam_report_params)
    @spam_report.spam_reportable_type = @spam_reportable_type
    @spam_report.spam_reportable_id = @spam_reportable_id
    @spam_report.user ||= current_user
    authorize @spam_report

    if @spam_report.save
      SideFxSpamReportService.new.after_create(@spam_report, current_user)
      render json: @spam_report, status: :created
    else
      render json: { errors: @spam_report.errors.details }, status: :unprocessable_entity
    end
  end

  # patch
  def update
    ActiveRecord::Base.transaction do
      if spam_report_params['reason_code'] != 'other'
        @spam_report.other_reason = nil
      end
      if @spam_report.update(spam_report_params)
        SideFxSpamReportService.new.after_update(@spam_report, current_user)
        render json: @spam_report.reload, status: :ok, include: ['user']
      else
        render json: { errors: @spam_report.errors.details }, status: :unprocessable_entity
      end
    end 
  end

  # delete
  def destroy
    spam_report = @spam_report.destroy
    if spam_report.destroyed?
      SideFxSpamReportService.new.after_destroy(spam_report, current_user)
      head :ok
    else
      head 500
    end
  end


  private

  def set_spam_reportable_type_and_id
    @spam_reportable_type = params[:spam_reportable]
    @spam_reportable_id = params[:"#{@spam_reportable_type.underscore}_id"]
    raise RuntimeError, "must not be blank" if @spam_reportable_type.blank? or @spam_reportable_id.blank?
  end

  def set_spam_report
    @spam_report = SpamReport.find params[:id]
    authorize @spam_report
  end

  def spam_report_params
    params.require(:spam_report).permit(
      :reason_code,
      :other_reason,
      :user_id
    )
  end

end
