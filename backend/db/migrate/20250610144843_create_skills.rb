class CreateSkills < ActiveRecord::Migration[7.2]
  def change
    create_table :skills do |t|
      t.string :name, null: false
      t.references :skill_category, null: false, foreign_key: true

      t.timestamps
    end
    add_index :skills, [:name, :skill_category_id], unique: true
  end
end
