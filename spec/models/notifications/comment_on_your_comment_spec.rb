require 'rails_helper'

RSpec.describe Notifications::CommentOnYourComment, type: :model do

  describe "make_notifications_on" do
    it "makes a notification on created comment activity" do
      parent_comment = create(:comment)
      child_comment = create(:comment, parent: parent_comment)
      activity = create(:activity, item: child_comment, action: 'created')

      Notifications::CommentOnYourComment.make_notifications_on activity
      notification = Notification.first
      expect(notification).to have_attributes(
        recipient_id: parent_comment.author_id,
        initiating_user_id: child_comment.author_id,
        idea_id: parent_comment.idea_id,
        comment_id: child_comment.id,
        project_id: parent_comment.idea.project_id
      )
    end
  end
end