class WebApi::V1::CustomFieldSerializer < WebApi::V1::BaseSerializer
  attributes :key, :input_type, :title_multiloc, :description_multiloc, :required, :ordering, :enabled, :code, :created_at, :updated_at
end