class WebApi::V1::MachineTranslationSerializer < WebApi::V1::Fast::BaseSerializer
  attributes :attribute_name, :locale_to, :translation

  belongs_to :translatable, polymorphic: true
end
