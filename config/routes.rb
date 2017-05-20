Rails.application.routes.draw do

  namespace :api, :defaults => {:format => :json} do
    namespace :v1 do
      resources :ideas do
        resources :comments, shallow: true
        resources :votes, except: [:update], shallow: true, defaults: { votable: 'Idea' } do
          post :up, on: :collection
          post :down, on: :collection
        end
      end

      # auth
      post 'user_token' => 'user_token#create'
      post 'social_login' => 'social_login#create'
      post 'social_registration' => 'social_registration#create'

      resources :users do
        get :me, on: :collection
      end

      resources :topics, only: [:index, :show]
      resources :areas, only: [:index, :show]

      resources :tenants, only: [:update] do
        get :current, on: :collection
      end
      resources :pages do
        get 'by_slug/:slug', on: :collection, to: 'pages#by_slug'
      end

      resources :projects do
        resources :phases, shallow: true
        resources :events, shallow: true
      end

      scope 'stats', controller: 'stats' do
        get 'users_by_time'
        get 'users_by_gender'
        get 'users_by_birthyear'
        get 'users_by_domicile'
        get 'users_by_education'
        get 'ideas_by_time'
        get 'ideas_by_topic'
        get 'ideas_by_area'
        get 'comments_by_time'
        get 'votes_by_time'
      end

    end
  end
end
