# app/models/skill_category.rb
class SkillCategory < ApplicationRecord
  has_many :skills, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end