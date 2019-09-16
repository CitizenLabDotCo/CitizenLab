import { defineMessages } from 'react-intl';

export default defineMessages({
  official: {
    id: 'app.components.Comments.official',
    defaultMessage: 'Official',
  },
  addCommentError: {
    id: 'app.containers.Comments.addCommentError',
    defaultMessage: 'Something went wrong. Please try again later.',
  },
  replyToComment: {
    id: 'app.components.Comments.replyToComment',
    defaultMessage: 'Reply to comment',
  },
  childCommentBodyPlaceholder: {
    id: 'app.containers.Comments.childCommentBodyPlaceholder',
    defaultMessage: 'Write a reply...',
  },
  publishComment: {
    id: 'app.containers.Comments.publishComment',
    defaultMessage: 'Post comment',
  },
  commentDeletedPlaceholder: {
    id: 'app.containers.Comments.commentDeletedPlaceholder',
    defaultMessage: 'This comment has been deleted.',
  },
  saveCommentEdit: {
    id: 'app.containers.Comments.saveComment',
    defaultMessage: 'Save',
  },
  cancelCommentEdit: {
    id: 'app.containers.Comments.cancelCommentEdit',
    defaultMessage: 'Cancel',
  },
  commentingDisabledProjectInactive: {
    id: 'app.components.Comments.commentingDisabledProjectInactive',
    defaultMessage: "Commenting on this idea is not possible because '{projectName}' is currently not active.",
  },
  commentingDisabledInContext: {
    id: 'app.components.Comments.commentingDisabledInContext',
    defaultMessage: "Commenting on ideas in '{projectName}' is currently disabled.",
  },
  commentingDisabledIdeaNotInCurrentPhase: {
    id: 'app.components.Comments.commentingDisabledIdeaNotInCurrentPhase',
    defaultMessage: "Commenting on this idea is not possible since it's no longer or not yet in consideration.",
  },
  commentingNotPermitted: {
    id: 'app.components.Comments.commentingNotPermitted',
    defaultMessage: 'Commenting on this idea is currently not allowed',
  },
  commentingMaybeNotPermitted: {
    id: 'app.components.Comments.commentingMaybeNotPermitted',
    defaultMessage: 'Not all users are allowed to comment. Please {signInLink} to see whether you comply.',
  },
  signInToComment: {
    id: 'app.containers.Comments.signInToComment',
    defaultMessage: 'Please {signInLink} to comment.',
  },
  signInLinkText: {
    id: 'app.containers.Comments.signInLinkText',
    defaultMessage: 'log in',
  },
  adminCommentDeletionCancelButton: {
    id: 'app.containers.Comments.adminCommentDeletionCancelButton',
    defaultMessage: 'Leave the comment',
  },
  adminCommentDeletionConfirmButton: {
    id: 'app.containers.Comments.adminCommentDeletionConfirmButton',
    defaultMessage: 'Delete this comment',
  },
  reportAsSpam: {
    id: 'app.components.Comments.reportAsSpam',
    defaultMessage: 'Report as spam',
  },
  deleteComment: {
    id: 'app.containers.Comments.deleteComment',
    defaultMessage: 'Delete',
  },
  editComment: {
    id: 'app.containers.Comments.editComment',
    defaultMessage: 'Edit',
  },
  spanModalLabelComment: {
    id: 'app.components.Comments.spanModalLabelComment',
    defaultMessage: 'Report comment as spam: select reason',
  },
  confirmCommentDeletion: {
    id: 'app.containers.Comments.confirmCommentDeletion',
    defaultMessage: "Are you sure you want to delete this comment? There's no turning back!",
  },
  commentDeletionCancelButton: {
    id: 'app.containers.Comments.commentDeletionCancelButton',
    defaultMessage: 'Keep my comment',
  },
  commentDeletionConfirmButton: {
    id: 'app.containers.Comments.commentDeletionConfirmButton',
    defaultMessage: 'Delete my comment',
  },
  reportAsSpamModalTitle: {
    id: 'app.containers.Comments.reportAsSpamModalTitle',
    defaultMessage: 'Why do you want to report this as spam?',
  },
  commentsSortTitle: {
    id: 'app.containers.Comments.commentsSortTitle',
    defaultMessage: 'Sort comments by',
  },
  oldestToNewest: {
    id: 'app.components.Comments.oldestToNewest',
    defaultMessage: 'Oldest to Newest',
  },
  mostUpvoted: {
    id: 'app.components.Comments.mostUpvoted',
    defaultMessage: 'Most voted',
  },
  upvoteComment: {
    id: 'app.components.Comments.upvoteComment',
    defaultMessage: 'Upvote this comment'
  },
  commentUpvote: {
    id: 'app.containers.Comments.commentUpvote',
    defaultMessage: 'Upvote',
  },
  commentCancelUpvote: {
    id: 'app.containers.Comments.commentCancelUpvote',
    defaultMessage: 'Cancel',
  },
  commentReplyButton: {
    id: 'app.containers.Comments.commentReplyButton',
    defaultMessage: 'Reply',
  },
  seeTranslation: {
    id: 'app.components.Comments.seeTranslation',
    defaultMessage: 'See translation',
  },
  seeOriginal: {
    id: 'app.components.Comments.seeOriginal',
    defaultMessage: 'See original',
  },
  noComments: {
    id: 'app.components.Comments.noComments',
    defaultMessage: 'There are no comments yet.'
  },
  loadingMoreComments: {
    id: 'app.containers.Comments.loadingMoreComments',
    defaultMessage: 'Loading more comments...',
  },
  emptyCommentError: {
    id: 'app.containers.Comments.emptyCommentError',
    defaultMessage: 'The comment can\'t be empty',
  },
  loadMoreComments: {
    id: 'app.containers.Comments.loadMoreComments',
    defaultMessage: 'Load more comments',
  },
  loadingComments: {
    id: 'app.containers.Comments.loadingComments',
    defaultMessage: 'Loading comments...',
  },
  ideaCommentBodyPlaceholder: {
    id: 'app.containers.Comments.ideaCommentBodyPlaceholder',
    defaultMessage: 'What do you think about this idea?',
  },
  initiativeCommentBodyPlaceholder: {
    id: 'app.containers.Comments.initiativeCommentBodyPlaceholder',
    defaultMessage: 'What do you think about this initiative?',
  },
  yourComment: {
    id: 'app.components.Comments.yourComment',
    defaultMessage: 'Your comment',
  },
  showMoreActions: {
    id: 'app.containers.Comments.showMoreActions',
    defaultMessage: 'Show more actions',
  },
  deleteReason_other: {
    id: 'app.containers.Comments.deleteReason_other',
    defaultMessage: 'Other reason (please specify)',
  },
  deleteReason_inappropriate: {
    id: 'app.containers.Comments.deleteReason_inappropriate',
    defaultMessage: 'Other reason (please specify)',
  },
  deleteReason_irrelevant: {
    id: 'app.containers.Comments.deleteReason_irrelevant',
    defaultMessage: 'Other reason (please specify)',
  },
});
