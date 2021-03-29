module UserCustomFields
  module WebApi
    module V1
      class StatsUsersController < ::WebApi::V1::StatsController

        @@multiloc_service = MultilocService.new
        

        def users_by_custom_field_serie
          users = StatUserPolicy::Scope.new(current_user, User.active).resolve

          if params[:group]
            group = Group.find(params[:group])
            users = users.merge(group.members)
          end


          ps = ParticipantsService.new

          if params[:project]
            project = Project.find(params[:project])
            participants = ps.project_participants(project)
            users = users.where(id: participants)
          end


          case @custom_field.input_type
          when 'select'
            serie = users
              .where(registration_completed_at: @start_at..@end_at)
              .group("custom_field_values->'#{@custom_field.key}'")
              .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
              .count
            serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
            serie
          when 'multiselect'
            serie = users
              .joins("LEFT OUTER JOIN (SELECT jsonb_array_elements(custom_field_values->'#{@custom_field.key}') as field_value, id FROM users) as cfv ON users.id = cfv.id")
              .where(registration_completed_at: @start_at..@end_at)
              .group("cfv.field_value")
              .order("cfv.field_value")
              .count
            serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
            serie
          when 'checkbox'
            serie = users
              .where(registration_completed_at: @start_at..@end_at)
              .group("custom_field_values->'#{@custom_field.key}'")
              .order(Arel.sql("custom_field_values->'#{@custom_field.key}'"))
              .count
            serie['_blank'] = serie.delete(nil) || 0 unless serie.empty?
            serie
          else
            head :not_implemented
          end
        end

        def users_by_custom_field
          @custom_field = CustomField.find(params[:custom_field_id])
          serie = users_by_custom_field_serie
          if ['select', 'multiselect'].include?(@custom_field.input_type)
            options = @custom_field.custom_field_options.select(:key, :title_multiloc)
            render json: {series: {users: serie}, options: options.map{|o| [o.key, o.attributes.except('key', 'id')]}.to_h}
          else
            render json: {series: {users: serie}}
          end
        end

        def users_by_custom_field_as_xlsx
          @custom_field = CustomField.find(params[:custom_field_id])

          if ['select', 'multiselect'].include?(@custom_field.input_type)
            serie = users_by_custom_field_serie
            options = @custom_field.custom_field_options.select(:key, :title_multiloc)

            res = options.map { |option|
              {
                "option_id" => option.key,
                "option" => @@multiloc_service.t(option.title_multiloc),
                "users" => serie[option.key] || 0
              }
            }
            res.push({
              "option_id" => "_blank",
              "option" =>"unknown",
              "users" => serie["_blank"] || 0
              })
            xlsx = XlsxService.new.generate_res_stats_xlsx res, 'users', 'option'
            send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_custom_field.xlsx'
          else
            xlsx = XlsxService.new.generate_field_stats_xlsx users_by_custom_field_serie, 'option', 'users'
            send_data xlsx, type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', filename: 'users_by_custom_field.xlsx'
          end
        end
      end

      private

      def do_authorize
        authorize :stat_user
      end

    end
  end
end
