class Api::V1::ExternalCommentSerializer < ActiveModel::Serializer
  attributes :id, :body_multiloc, :created_at
end
