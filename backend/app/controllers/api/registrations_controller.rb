class Api::RegistrationsController < DeviseTokenAuth::RegistrationsController
  private

  # サインアップ時に許可するパラメータを明示的に指定
  def sign_up_params
    registration_params = params[:registration] || params
    registration_params.permit(:name, :email, :password, :password_confirmation)
  end

  # アカウント更新時に許可するパラメータ
  def account_update_params
    params.permit(:name, :email, :password, :password_confirmation, :current_password)
  end
end