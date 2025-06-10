# app/models/skill.rb
class Skill < ApplicationRecord
  belongs_to :skill_category

  # UserSkillはUserとSkillの中間テーブル
  has_many :user_skills, dependent: :destroy
  # Skillを介してUserにもアクセスできるようにhas_many :throughを設定
  has_many :users, through: :user_skills

  validates :name, presence: true
  validates :name, uniqueness: { scope: :skill_category_id }
end