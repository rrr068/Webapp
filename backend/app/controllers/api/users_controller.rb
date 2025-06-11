class Api::UsersController < ApplicationController
  before_action :authenticate_api_user!

  def resource_name
    :user
  end

  def get_user
    if current_api_user
      render json: current_api_user.as_json(only: [:id, :name])
    else
      render json: { error: '認証が必要です' }, status: :unauthorized
    end
  end

  def show
    render json: current_api_user.as_json(include: {
      job_type: { only: [:id, :name] },
      user_skills: {
        include: { skill: { include: :skill_categories } },
        methods: [:experience_years_text]
      }
    })
  end

  def update
    if current_api_user.update(user_params.except(:skills))
      update_user_skills(params[:user][:skills]) if params[:user][:skills].present?
      render json: current_api_user.as_json(include: {
        job_type: { only: [:id, :name] },
        user_skills: {
          include: { skill: { include: :skill_category } },
          methods: [:experience_years_text]
        }
      }), status: :ok
    else
      render json: current_api_user.errors, status: :unprocessable_entity
    end
  end

  private

  def user_params
    params.require(:user).permit(
      :name,
      :introduction,
      :job_type_id,
      # :github_account,
      # スキルは配列として受け取る想定
      skills: [
        :skill_id,
        :experience_years
      ]
    )
  end

  def update_user_skills(skills_attributes)
    # シンプルにするため、ここでは既存のものを削除し、新しいもので再作成する
    current_api_user.user_skills.destroy_all

    skills_attributes.each do |skill_attr|
      current_api_user.user_skills.create(
        skill_id: skill_attr[:skill_id],
        experience_years: skill_attr[:experience_years]
      )
    rescue ActiveRecord::RecordInvalid => e
      Rails.logger.error("Failed to create UserSkill: #{e.message}")
    end
  end
end
