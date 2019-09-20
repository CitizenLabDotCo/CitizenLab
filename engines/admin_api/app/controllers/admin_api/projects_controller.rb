module AdminApi
  class ProjectsController < AdminApiController

    def index
      @projects = Project.all
      # This uses default model serialization
      render json: @projects
    end

    def template_export
      project = Project.find(params[:id])
      options = template_export_params.to_h.symbolize_keys
      options[:shift_timestamps] = options[:shift_timestamps].to_i if options[:shift_timestamps]
      template = ProjectCopyService.new.export project, **options
      render json: {template_yaml: template.to_yaml}
    end

    def template_import
      begin
        template = YAML.load(template_import_params[:template_yaml])
        ProjectCopyService.new.import template
      rescue Exception => e
        raise ClErrors::TransactionError.new(error_key: :bad_template)
      end
      head :ok
    end

    def template_import_params
      params.require(:project).permit(
        :template_yaml
      )
    end

    def template_export_params
      params.require(:project).permit(
        :include_ideas,
        :anonymize_users,
        :translate_content,
        :shift_timestamps,
        :new_slug,
        :timeline_start_at,
        new_title_multiloc: CL2_SUPPORTED_LOCALES
      )
    end

  end
end
