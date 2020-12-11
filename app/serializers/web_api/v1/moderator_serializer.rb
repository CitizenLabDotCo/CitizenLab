class WebApi::V1::ModeratorSerializer < WebApi::V1::BaseSerializer
  attributes :first_name, :last_name, :slug, :roles

  attribute :email, if: Proc.new { |object, params|
    view_private_attributes? object, params
  }

  attribute :avatar, if: Proc.new { |object|
    object.avatar
  } do |object|
    object.avatar.versions.map{|k, v| [k.to_s, v.url]}.to_h
  end

  attribute :is_moderator, if: Proc.new { |object, params|
    params[:project_id]
  } do |object, params|
    object.project_moderator? params[:project_id]
  end

  attribute :is_folder_moderator, if: Proc.new { |object, params|
    params[:project_id]
  } do |object, params|
    object.project_folder_moderator? params[:folder_id]
  end

  def self.view_private_attributes? object, params={}
    Pundit.policy!(current_user(params), object).view_private_attributes?
  end
end
