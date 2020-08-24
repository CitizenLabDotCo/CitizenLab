class WebApi::V1::StatsUsersController < WebApi::V1::StatsController

  # class StatUserQuery < OpenStruct
  #   attr_accesor :group, :project, :topic, :start_at, :end_at
  # end

  before_action :render_no_data, only: [
    :users_by_time,
    :users_by_time_cumulative,
    :active_users_by_time,
  ]

  def users_count
    count = User.active
      .where(registration_completed_at: @start_at..@end_at)
      .active
      .count
    render json: { count: count }
  end

  def users_by_time_serie
    users_scope = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:project]
      project = Project.find(params[:project])
      users_scope = ProjectPolicy::InverseScope.new(project, users_scope).resolve
    end

    if params[:group]
      group = Group.find(params[:group])
      users_scope = users_scope.merge(group.members)
    end

    if params[:topic]
      users_scope = @@stats_service.filter_users_by_topic(users_scope, params[:topic])
    end

    @@stats_service.group_by_time(
      users_scope,
      'registration_completed_at',
      @start_at,
      @end_at,
      params[:interval]
    )
  end

  def users_by_time
    render json: {series: {users: users_by_time_serie}}
  end

  def users_by_time_as_xlsx
    xlsx = XlsxService.new.generate_time_stats_xlsx users_by_time_serie, 'users_by_time'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_time.xlsx'
  end


  def users_by_time_cumulative_serie
    users_scope = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:project]
      project = Project.find(params[:project])
      users_scope = ProjectPolicy::InverseScope.new(project, users_scope).resolve
    end

    if params[:group]
      group = Group.find(params[:group])
      users_scope = users_scope.merge(group.members)
    end

    if params[:topic]
      users_scope = @@stats_service.filter_users_by_topic(users_scope, params[:topic])
    end

    @@stats_service.group_by_time_cumulative(
      users_scope,
      'registration_completed_at',
      @start_at,
      @end_at,
      params[:interval]
    )
  end

  def users_by_time_cumulative
    render json: {series: {users: users_by_time_cumulative_serie}}
  end

  def users_by_time_cumulative_as_xlsx
    xlsx = XlsxService.new.generate_time_stats_xlsx users_by_time_cumulative_serie, 'users_by_time_cumulative'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_time_cumulative.xlsx'
  end

  def active_users_by_time_serie
    activities_scope = Activity
      .select(:user_id).distinct
      .where(user_id: StatUserPolicy::Scope.new(current_user, User.active).resolve)

    ps = ParticipantsService.new
    activities_scope = ps.filter_engaging_activities(activities_scope)

    if params[:project]
      project = Project.find(params[:project])
      participants = ps.projects_participants([project])
      activities_scope = activities_scope.where(user_id: participants)
    end

    if params[:group]
      group = Group.find(params[:group])
      activities_scope = activities_scope.where(user_id: group.members)
    end

    if params[:topic]
      users_scope = @@stats_service.filter_users_by_topic(User, params[:topic])
      activities_scope = activities_scope.where(user_id: users_scope)
    end

    @@stats_service.group_by_time(
      activities_scope,
      'acted_at',
      @start_at,
      @end_at,
      params[:interval]
    )
  end

  def active_users_by_time
    render json: {series: {users: active_users_by_time_serie}}
  end

  def active_users_by_time_as_xlsx
    xlsx = XlsxService.new.generate_time_stats_xlsx active_users_by_time_serie, 'active_users_by_time'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'active_users_by_time.xlsx'
  end

  def users_by_gender_serie
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'gender'")
      .order(Arel.sql("custom_field_values->'gender'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?

    serie
  end

  def users_by_gender
    render json: {series: {users: users_by_gender_serie}}
  end

  def users_by_gender_as_xlsx
    xlsx = XlsxService.new.generate_field_stats_xlsx users_by_gender_serie, 'users_by_gender'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'active_users_by_time.xlsx'
  end

  def users_by_birthyear_serie
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'birthyear'")
      .order(Arel.sql("custom_field_values->'birthyear'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?

    serie
  end

  def users_by_birthyear
    render json: {series: {users: users_by_birthyear_serie}}
  end

  def users_by_birthyear_as_xlsx
    xlsx = XlsxService.new.generate_field_stats_xlsx users_by_birthyear_serie, 'users_by_birthyear'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'active_users_by_time.xlsx'
  end

  def users_by_domicile
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'domicile'")
      .order(Arel.sql("custom_field_values->'domicile'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
    areas = Area.where(id: serie.keys).select(:id, :title_multiloc)
    render json: {series: {users: serie}, areas: areas.map{|a| [a.id, a.attributes.except('id')]}.to_h}
  end

  def users_by_domicile_as_xlsx
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'domicile'")
      .order(Arel.sql("custom_field_values->'domicile'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
    areas = Area.where(id: serie.keys).select(:id, :title_multiloc)
    #TODO : show domicile title instead of id in XLSX file
    xlsx = XlsxService.new.generate_field_stats_xlsx @serie, 'users_by_domicile'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_domicile.xlsx'
  end

  def users_by_education
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'education'")
      .order(Arel.sql("custom_field_values->'education'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
    render json: {series: {users: serie}}
  end

  def users_by_education_as_xlsx
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    serie = users
      .where(registration_completed_at: @start_at..@end_at)
      .group("custom_field_values->'education'")
      .order(Arel.sql("custom_field_values->'education'"))
      .count
    serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
    xlsx = XlsxService.new.generate_field_stats_xlsx @serie, 'users_by_education'
    send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_education.xlsx'
  end

  def users_by_custom_field
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    @custom_field = CustomField.find(params[:custom_field_id])

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    case @custom_field.input_type
    when 'select'
      serie = users
        .where(registration_completed_at: @start_at..@end_at)
        .group("custom_field_values->'#{@custom_field.key}'")
        .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      options = @custom_field.custom_field_options.where(key: serie.keys).select(:key, :title_multiloc)
      render json: {series: {users: serie}, options: options.map{|o| [o.key, o.attributes.except('key', 'id')]}.to_h}
    when 'multiselect'
      serie = users
        .joins("LEFT OUTER JOIN (SELECT jsonb_array_elements(custom_field_values->'#{@custom_field.key}') as field_value, id FROM users) as cfv ON users.id = cfv.id")
        .where(registration_completed_at: @start_at..@end_at)
        .group("cfv.field_value")
        .order("cfv.field_value")
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      options = @custom_field.custom_field_options.where(key: serie.keys).select(:key, :title_multiloc)
      render json: {series: {users: serie}, options: options.map{|o| [o.key, o.attributes.except('key', 'id')]}.to_h}
    when 'checkbox'
      serie = users
        .where(registration_completed_at: @start_at..@end_at)
        .group("custom_field_values->'#{@custom_field.key}'")
        .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      render json: {series: {users: serie}}
    else
      head :not_implemented
    end
  end

  def users_by_custom_field_as_xlsx
    users = StatUserPolicy::Scope.new(current_user, User.active).resolve

    @custom_field = CustomField.find(params[:custom_field_id])

    if params[:group]
      group = Group.find(params[:group])
      users = users.merge(group.members)
    end

    case @custom_field.input_type
    when 'select'
      serie = users
        .where(registration_completed_at: @start_at..@end_at)
        .group("custom_field_values->'#{@custom_field.key}'")
        .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      options = @custom_field.custom_field_options.where(key: serie.keys).select(:key, :title_multiloc)
      render json: {series: {users: serie}, options: options.map{|o| [o.key, o.attributes.except('key', 'id')]}.to_h}
    when 'multiselect'
      serie = users
        .joins("LEFT OUTER JOIN (SELECT jsonb_array_elements(custom_field_values->'#{@custom_field.key}') as field_value, id FROM users) as cfv ON users.id = cfv.id")
        .where(registration_completed_at: @start_at..@end_at)
        .group("cfv.field_value")
        .order("cfv.field_value")
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      options = @custom_field.custom_field_options.where(key: serie.keys).select(:key, :title_multiloc)
      render json: {series: {users: serie}, options: options.map{|o| [o.key, o.attributes.except('key', 'id')]}.to_h}
    when 'checkbox'
      serie = users
        .where(registration_completed_at: @start_at..@end_at)
        .group("custom_field_values->'#{@custom_field.key}'")
        .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
        .count
      serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
      xlsx = XlsxService.new.generate_field_stats_xlsx @serie, 'users_by_custom_field'
      send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_custom_field.xlsx'
    else
      head :not_implemented
    end
  end

  def users_engagement_scores
    ps = ParticipantsService.new
    activities = Activity
      .where(user_id: StatUserPolicy::Scope.new(current_user, User.active).resolve)

    if params[:group]
      group = Group.find(params[:group])
      activities = activities.where(user_id: group.members)
    end

    engaging_activities = ps.filter_engaging_activities(activities)
    scored_activities = ps.with_engagement_scores(engaging_activities)

    serie = Activity
      .from(scored_activities.select(:user_id).where(acted_at: @start_at..@end_at))
      .group(:user_id)
      .includes(:user)
      .select("user_id, SUM(score) as sum_score")
      .order("sum_score DESC")
      .limit(10)

    render json: WebApi::V1::EngagementScoreSerializer.new(
      serie,
      params: fastjson_params,
      include: [:user]
      ).serialized_json
  end

  #TODO users_engagement_scores as xlsx ? is it really needed ?

  private

  def render_no_data
    if @no_data
      render json: {series: {users: {}}}
    end
  end

  def do_authorize
    authorize :stat_user
  end

end
