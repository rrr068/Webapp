# app/models/job_type.rb
# 今回のケースではUserからjob_typeへの参照があるため、JobTypeが削除されても
# Userが残るようにするか、Userも削除するかを検討。
# dependent: :nullify は、JobTypeが削除されたら関連するUserのjob_type_idをnullにする。
# どちらが良いかは要件によりますが、Userは残したいケースが多いので dependent: :nullify が無難です。
# その場合は、JobTypeを削除する前にUserのjob_type_idを別のJobTypeに付け替えるなどの処理が必要です。
# 今回はUserのjob_type_idをnullableにしているので dependent: :nullify を推奨します。
class JobType < ApplicationRecord
  has_many :users, dependent: :destroy

  validates :name, presence: true, uniqueness: true
end