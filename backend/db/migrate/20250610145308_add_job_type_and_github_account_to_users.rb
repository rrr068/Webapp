class AddJobTypeAndGithubAccountToUsers < ActiveRecord::Migration[7.2]
  def change
    add_reference :users, :job_type, foreign_key: true
    add_column :users, :github_account, :string
    add_index :users, :github_account, unique: true
  end
end
