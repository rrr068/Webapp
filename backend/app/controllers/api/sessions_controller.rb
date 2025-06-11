class Api::SessionsController < DeviseTokenAuth::SessionsController
  def create
    super do |resource|
      # カスタム処理可能（ログ出力など）
    end
  end
end
