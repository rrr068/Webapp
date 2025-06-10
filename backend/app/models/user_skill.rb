class UserSkill < ApplicationRecord
  belongs_to :user
  belongs_to :skill

  enum experience_years: {
    one_year: 1,
    three_years: 3,
    five_years_or_more: 5
  }

  validates :experience_years, presence: true
  validates :skill_id, uniqueness: { scope: :user_id }
end