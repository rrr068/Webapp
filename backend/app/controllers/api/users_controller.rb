class Api::UsersController < ApplicationController
  before_action :authenticate_user!

  def get_user_id
    user = current_user
    render json: user.as_json(only: [:id, :name])
  end
end
