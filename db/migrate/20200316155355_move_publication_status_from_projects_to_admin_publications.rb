class MovePublicationStatusFromProjectsToAdminPublications < ActiveRecord::Migration[6.0]
  def change
    add_column :admin_publications, :publication_status, :string, null: false, default: 'published'

    Project.where.not(publication_status: 'published').includes(:admin_publication).each do |project|
      project.admin_publication&.update_column :publication_status, project.publication_status
    end

    drop_view :project_sort_scores
    remove_column :projects, :publication_status
  end
end
