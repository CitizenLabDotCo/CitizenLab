module Maps
  class MapsController < ::ApplicationController
    before_action :set_project
    skip_before_action :authenticate_user, only: %i[show]

    private

    def set_project
      @project = Project.find(params[:project_id])
      authorize @project
    end
  end
end
