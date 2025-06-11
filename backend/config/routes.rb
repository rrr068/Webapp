Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  get "up" => "rails/health#show", as: :rails_health_check

  namespace :api do
    mount_devise_token_auth_for 'User', at: 'auth', controllers: {
      registrations: 'api/registrations',
      sessions: 'api/sessions'
    }
    namespace :current_user do
      resource :article, only: [:index, :create, :update]
    end
    resources :users, only: [:show, :update] do
      collection do
        get :get_user
        resources :job_types, only: [:index]
        resources :skill_categories, only: [:index]
        resources :skills, only: [:index]
      end
    end
  end
end
