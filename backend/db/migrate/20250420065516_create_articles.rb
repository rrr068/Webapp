class CreateArticles < ActiveRecord::Migration[7.2]
  def change
    create_table :articles do |t|
      t.string :title
      t.text :description
      t.integer :status, comment: "ステータス (下書き:0, 未公開: 1, 公開中: 9)"
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
