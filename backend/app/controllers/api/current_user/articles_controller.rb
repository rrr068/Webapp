class ArticlesController < ApplicationController
  before_action :authenticate_api_user!

  def create
    create_article = current_api_user.articles.unsaved.first || current_api_user.articles.create!(status: :unsaved)
    render json: create_article
  end

  def index
    articles = current_api_user.articles.not_unsaved.order(created_at: :desc)
    render json: articles
  end

  private

  def article_params
    params.require(:article).permit(:title, :description, :status)
  end
end
