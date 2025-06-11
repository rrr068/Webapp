# frozen_string_literal: true
# create_table "users", force: :cascade do |t|
#   t.string "provider", default: "email", null: false
#   t.string "uid", default: "", null: false
#   t.string "encrypted_password", default: "", null: false
#   t.string "reset_password_token"
#   t.datetime "reset_password_sent_at"
#   t.boolean "allow_password_change", default: false
#   t.datetime "remember_created_at"
#   t.string "confirmation_token"
#   t.datetime "confirmed_at"
#   t.datetime "confirmation_sent_at"
#   t.string "unconfirmed_email"
#   t.string "name"
#   t.string "image"
#   t.string "email"
#   t.string "description"
#   t.text "tokens"
#   t.datetime "created_at", null: false
#   t.datetime "updated_at", null: false
#   t.integer "job_type_id"
#   t.string "github_account"
#   t.index ["confirmation_token"], name: "index_users_on_confirmation_token", unique: true
#   t.index ["email"], name: "index_users_on_email", unique: true
#   t.index ["github_account"], name: "index_users_on_github_account", unique: true
#   t.index ["job_type_id"], name: "index_users_on_job_type_id"
#   t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
#   t.index ["uid", "provider"], name: "index_users_on_uid_and_provider", unique: true
# end

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
  include DeviseTokenAuth::Concerns::User

  belongs_to :job_type, optional: true
  has_many :articles, dependent: :destroy
  has_many :user_skills, dependent: :destroy
  has_many :skills, through: :user_skills

  validates :name, presence: true
  # validates :github_account, uniqueness: { allow_blank: true }

  accepts_nested_attributes_for :user_skills, allow_destroy: true
end
