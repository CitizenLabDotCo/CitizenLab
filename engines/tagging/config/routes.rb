Tagging::Engine.routes.draw do
  namespace :web_api, defaults: { format: :json } do
    namespace :v1 do
      resources :tags, only: %i[index update destroy]
    end
  end
end
