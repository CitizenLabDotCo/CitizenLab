class WebApi::V1::Fast::BasketSerializer < WebApi::V1::Fast::BaseSerializer
  attributes :submitted_at, :total_budget, :budget_exceeds_limit?

  belongs_to :participation_context, polymorphic: true
  belongs_to :user


  has_many :ideas do |object|
    object.ideas.order('baskets_ideas.created_at DESC')
  end

end
