class CreateSkillCategories < ActiveRecord::Migration[7.2]
  def change
    create_table :skill_categories do |t|
      t.string :name, null: false

      t.timestamps
    end
    add_index :skill_categories, :name, unique: true
  end
end
