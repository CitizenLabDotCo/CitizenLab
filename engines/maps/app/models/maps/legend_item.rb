module Maps
  class LegendItem < ApplicationRecord
    acts_as_list column: :ordering, top_of_list: 0, add_new_at: :bottom, scope: [:map_config_id]

    belongs_to :map_config, class_name: 'Maps::MapConfig'

    validates :title_multiloc, presence: true, multiloc: {presence: true}
    validates :color, format: {with: /\A#[0-9a-f]{3}([0-9a-f]{3})?\z/}
  end
end