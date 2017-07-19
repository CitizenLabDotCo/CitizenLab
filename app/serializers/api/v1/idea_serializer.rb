class Api::V1::IdeaSerializer < ActiveModel::Serializer
  attributes :id, :title_multiloc, :body_multiloc, :author_name, :publication_status, :upvotes_count, :downvotes_count, :comments_count, :location_point_geojson, :location_description, :created_at, :updated_at, :published_at

  has_many :topics
  has_many :areas
  has_many :idea_images, serializer: Api::V1::ImageSerializer

  belongs_to :author
  belongs_to :project
  belongs_to :idea_status

  has_one :user_vote, if: :signed_in? do |serializer|
    serializer.cached_user_vote
  end

  def location_point_geojson
    RGeo::GeoJSON.encode(object.location_point)
  end

  def signed_in?
    scope
  end

  def cached_user_vote
    @instance_options.dig(:vbii, object.id)# || object.votes.where(user_id: scope.id).first
  end
end
