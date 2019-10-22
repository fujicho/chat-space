class Group < ApplicationRecord
  has_many :group_users
  has_many :users, through: :group_users
  has_many :messages
  validates :name, presence: true, uniqueness: true

  def show_last_message
    if (last_message = messages.last).present?
      # 変数定義をしつつ、条件式を記述している
      last_message.content? ? last_message.content  : '画像が投稿されています'
      # 三項演算子　条件式 ? trueの時の値 : falseの時の値
    else
      'まだメッセージはありません'
    end
  end
end
