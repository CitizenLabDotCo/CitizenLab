module Maps
  class Layer < ApplicationRecord
    acts_as_list column: :ordering, top_of_list: 0, add_new_at: :bottom, scope: [:map_config_id]

    belongs_to :map_config, class_name: 'Maps::MapConfig'

    validates :title_multiloc, presence: true, multiloc: {presence: true}
    validates :default_enabled, inclusion: {in: [true, false]}
    GEOJSON_SCHEMA = Maps::Engine.root.join('config','schemas','geojson.json_schema').to_s
    validates :geojson, presence: true, json: {schema: GEOJSON_SCHEMA, message: ->(errors) { errors }}

  end
end