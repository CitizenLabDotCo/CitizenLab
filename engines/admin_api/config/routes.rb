AdminApi::Engine.routes.draw do
  resources :tenants do
    get :settings_schema, on: :collection
    get :style_schema, on: :collection
    get :templates, on: :collection
  end

  resources :projects, only: [:index] do
    get :template_export, on: :member
    post :template_import, on: :collection
    resources :phases, only: [:index]
  end

  resources :areas, only: [:index]

  post "/graphql", to: "graphql#execute"

end
