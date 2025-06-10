class CreateJobTypes < ActiveRecord::Migration[7.2]
  def change
    create_table :job_types do |t|
      t.string :name

      t.timestamps
    end
    add_index :job_types, :name, unique: true
  end
end
