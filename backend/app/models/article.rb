class Article < ApplicationRecord
  belongs_to :User
  validates :title, :content, presence: true, if: :published?
  validate :verify_only_one_unsaved_status_is_allowed

  # unsaved:下書き、 draft:未公開, published:公開済み
  enum :status { unsaved: 0, draft: 1, published: 9 }

  private

  def verify_only_one_unsaved_status_is_allowed
    if unsaved? && user.articles.unsaved.present?
      raise StandardError, "下書き中の記事は1つまでしか保有できません。"
    end
  end
end
