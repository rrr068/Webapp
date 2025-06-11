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

  def experience_years_text
    case experience_years
    when 1 then "1年"
    when 2 then "2年"
    when 3 then "3年"
    when 4 then "4年"
    when 5 then "5年以上"
    else "#{experience_years}年"
    end
  end
end