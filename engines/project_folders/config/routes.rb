ProjectFolders::Engine.routes.draw do
  namespace :web_api, :defaults => {:format => :json} do
    namespace :v1 do
      roles_for :users, only: %i[project_folder_moderator]

      resources :project_folders, controller: 'folders' do
        resources :images, controller: '/web_api/v1/images', defaults: {container_type: 'ProjectFolder'}
        resources :files, controller: '/web_api/v1/files', defaults: {container_type: 'ProjectFolder'}
        get 'by_slug/:slug', on: :collection, to: 'folders#by_slug'
      end
    end
  end
end

Rails.application.routes.draw do
  mount ProjectFolders::Engine => ''
end
