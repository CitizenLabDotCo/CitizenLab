Rails.application.routes.draw do

  mount PublicApi::Engine => "/api", as: 'public_api'
  mount AdminApi::Engine => "/admin_api", as: 'admin_api', defaults: {format: :json}
  mount EmailCampaigns::Engine => "", as: 'email_campaigns'
  mount MachineTranslations::Engine => "", as: 'machine_translations'
  mount NLP::Engine => "", as: 'nlp'
  mount Onboarding::Engine => "", as: 'onboarding'
  mount Surveys::Engine => "", as: 'surveys'
  mount Frontend::Engine => "", as: 'frontend'
  mount Polls::Engine => "", as: 'polls'
  mount Verification::Engine => "", as: 'verification'

  namespace :web_api, :defaults => {:format => :json} do
    namespace :v1 do

      concern :votable do
        resources :votes, except: [:update], shallow: true do
          post :up, on: :collection
          post :down, on: :collection
        end
      end
      concern :post do
        resources :activities, only: [:index]
        resources :comments, shallow: true, 
          concerns: [:votable, :spam_reportable], 
          defaults: { votable: 'Comment', spam_reportable: 'Comment' } do
         
          get :children, on: :member
          post :mark_as_deleted, on: :member
        end
        get 'comments/as_xlsx', on: :collection, to: 'comments#index_xlsx'
        resources :official_feedback, shallow: true
      end
      concern :spam_reportable do
        resources :spam_reports, shallow: true
      end

      resources :ideas, 
        concerns: [:votable, :spam_reportable, :post], 
        defaults: { votable: 'Idea', spam_reportable: 'Idea', post: 'Idea' } do
        
        resources :images, defaults: {container_type: 'Idea'}
        resources :files, defaults: {container_type: 'Idea'}

        get :as_xlsx, on: :collection, action: 'index_xlsx'
        get 'by_slug/:slug', on: :collection, to: 'ideas#by_slug'
        get :as_markers, on: :collection, action: 'index_idea_markers'
        get :filter_counts, on: :collection
      end

      resources :initiatives, 
        concerns: [:votable, :spam_reportable, :post], 
        defaults: { votable: 'Initiative', spam_reportable: 'Initiative', post: 'Initiative' } do

        resources :images, defaults: {container_type: 'Initiative'}
        resources :files, defaults: {container_type: 'Initiative'}

        resources :initiative_status_changes, shallow: true, except: [:update, :destroy]

        get :as_xlsx, on: :collection, action: 'index_xlsx'
        get 'by_slug/:slug', on: :collection, to: 'initiatives#by_slug'
        get :as_markers, on: :collection, action: 'index_initiative_markers'
        get :filter_counts, on: :collection
        get :allowed_transitions, on: :member
      end

      resources :idea_statuses, only: [:index, :show]
      resources :initiative_statuses, only: [:index, :show]

      # auth
      post 'user_token' => 'user_token#create'


      scope :users do
        resources :custom_fields, defaults: {resource_type: 'User'} do
          patch 'reorder', on: :member
          get 'schema', on: :collection
          resources :custom_field_options do
            patch 'reorder', on: :member
          end
        end
      end

      resources :users do
        resources :comments, only: [:index], controller: 'user_comments'
        get :me, on: :collection
        post :complete_registration, on: :collection
        get :as_xlsx, on: :collection, action: 'index_xlsx'
        post "reset_password_email" => "reset_password#reset_password_email", on: :collection
        post "reset_password" => "reset_password#reset_password", on: :collection
        get 'by_slug/:slug', on: :collection, to: 'users#by_slug'
        get 'by_invite/:token', on: :collection, to: 'users#by_invite'
        get 'ideas_count', on: :member
        get 'initiatives_count', on: :member
        get 'comments_count', on: :member
      end

      resources :topics, only: [:index, :show]
      resources :areas

      resources :tenants, only: [:update] do
        get :current, on: :collection
      end
      resources :pages do
        resources :files, defaults: {container_type: 'Page'}, shallow: false
        get 'by_slug/:slug', on: :collection, to: 'pages#by_slug'
      end

      concern :participation_context do
        # :action is already used as param, so we chose :permission_action instead
        resources :permissions, param: :permission_action do
          get 'participation_conditions', on: :member
        end
      end

      # Events and phases are split in two because we cannot have a non-shallow
      # resource (i.e. files) nested in a shallow resource. File resources have
      # to be shallow so we can determine their container class. See e.g.
      # https://github.com/rails/rails/pull/24405
      resources :events, only: [:show, :edit, :update, :destroy] do
        resources :files, defaults: {container_type: 'Event'}, shallow: false
      end
      resources :phases, only: [:show, :edit, :update, :destroy], concerns: :participation_context, defaults: {parent_param: :phase_id} do
        resources :files, defaults: {container_type: 'Phase'}, shallow: false
      end
      resources :projects, concerns: :participation_context, defaults: {parent_param: :project_id} do
        resources :events, only: [:index, :new, :create]
        resources :phases, only: [:index, :new, :create]
        resources :images, defaults: {container_type: 'Project'}
        resources :files, defaults: {container_type: 'Project'}
        resources :groups_projects, shallow: true, except: [:update]
        resources :moderators, except: [:update] do
          get :users_search, on: :collection
        end
        get 'by_slug/:slug', on: :collection, to: 'projects#by_slug'
        patch 'reorder', on: :member
      end

      resources :notifications, only: [:index, :show] do
        post 'mark_read', on: :member
        post 'mark_all_read', on: :collection
      end

      resources :groups do
        resources :memberships, shallow: true, except: [:update] do
          get :users_search, on: :collection
          get 'by_user_id/:user_id', on: :collection, to: 'memberships#show_by_user_id'
          delete 'by_user_id/:user_id', on: :collection, to: 'memberships#destroy_by_user_id'
        end
        get 'by_slug/:slug', on: :collection, to: 'groups#by_slug'
      end

      resources :invites do
        post 'by_token/:token/accept', on: :collection, to: 'invites#accept'
        post :bulk_create, on: :collection
        post :bulk_create_xlsx, on: :collection
        get :example_xlsx, on: :collection
        get :as_xlsx, on: :collection, action: 'index_xlsx'
      end

      scope 'stats', controller: 'stats' do
        with_options controller: 'stats_users' do
          get 'users_count'
          get 'users_by_time'
          get 'users_by_time_cumulative'
          get 'active_users_by_time'
          get 'users_by_gender'
          get 'users_by_birthyear'
          get 'users_by_domicile'
          get 'users_by_education'
          get 'users_by_custom_field/:custom_field_id', action: :users_by_custom_field
          get 'users_engagement_scores'
        end

        with_options controller: 'stats_ideas' do
          get 'ideas_count'
          get 'ideas_by_time'
          get 'ideas_by_time_cumulative'
          get 'ideas_by_topic'
          get 'ideas_by_project'
          get 'ideas_by_area'
        end

        with_options controller: 'stats_initiatives' do
          get 'initiatives_count'
          get 'initiatives_by_time'
          get 'initiatives_by_time_cumulative'
          get 'initiatives_by_topic'
          get 'initiatives_by_area'
        end

        with_options controller: 'stats_comments' do
          get 'comments_count'
          get 'comments_by_time'
          get 'comments_by_time_cumulative'
          get 'comments_by_topic'
          get 'comments_by_project'
        end

        with_options controller: 'stats_votes' do
          get 'votes_count'
          get 'votes_by_birthyear'
          get 'votes_by_education'
          get 'votes_by_domicile'
          get 'votes_by_gender'
          get 'votes_by_custom_field'
          get 'votes_by_time'
          get 'votes_by_time_cumulative'
          get 'votes_by_topic'
          get 'votes_by_project'
        end
      end

      scope 'mentions', controller: 'mentions' do
        get 'users'
      end

      resources :baskets, except: [:index]
      resources :clusterings

      resources :avatars, only: [:index, :show]      
      resources :moderations, only: [:index] 
    end


  end

  get '/auth/:provider/callback', to: 'omniauth_callback#create'
  post '/auth/:provider/callback', to: 'omniauth_callback#create'
  get '/auth/failure', to: 'omniauth_callback#failure'
  post '/auth/failure', to: 'omniauth_callback#failure'
  get '/auth/:provider/logout', to: 'omniauth_callback#logout'

  if Rails.env.development?
    require_dependency 'sidekiq/web'
    mount Sidekiq::Web => '/sidekiq'
  end

end