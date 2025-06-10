class Api::UsersController < ApplicationController
  before_action :set_user_by_token

  def resource_name
    :user
  end

  def get_user
    if current_api_user
      render json: current_api_user.as_json(only: [:id, :name])
    else
      render json: { error: '認証が必要です' }, status: :unauthorized
    end
  end
end
