class WebApi::V1::UserCommentsController < ApplicationController
  skip_after_action :verify_policy_scoped
  

  def index
    # Get the posts the user is allowed to see
    comment_allowed_ideas = IdeaCommentPolicy::Scope.new(current_user, Comment).resolve
      .published
      .where(author_id: params[:user_id])
    comment_allowed_initiatives = InitiativeCommentPolicy::Scope.new(current_user, Comment).resolve
      .published
      .where(author_id: params[:user_id])

    # Apply pagination to the posts, using the union_posts
    # view and ordering by publication date.
    joined_posts = UnionPost.joins('INNER JOIN comments ON comments.post_id = union_posts.id')
    paged_posts = joined_posts.where(comments: {id: comment_allowed_ideas})
      .or(joined_posts.where(comments: {id: comment_allowed_initiatives}))
      .order(published_at: :desc)
      .group('union_posts.id, union_posts.published_at')  # Remove union_post duplicates
      .select('union_posts.id')
      .page(params.dig(:page, :number))
      .per(params.dig(:page, :size))

    # Get the comments, grouped by the corresponding posts
    # page.
    comments = Comment.where(post_id: paged_posts)
      .includes(:post)
      .joins('LEFT OUTER JOIN union_posts ON comments.post_id = union_posts.id')
      .order('union_posts.published_at DESC, union_posts.id DESC, comments.created_at DESC')

    render json: comments, include: ['post'], meta: { total_count: paged_posts.total_count, total_pages: paged_posts.total_pages, current_page: paged_posts.current_page }
  end


  private

  def secure_controller?
    false
  end

end
