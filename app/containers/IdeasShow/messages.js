/*
 * IdeasShow Messages
 *
 * This contains all the text for the IdeasShow component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loadVotesError: {
    id: 'app.containers.IdeasShow.loadVotesError',
    defaultMessage: 'Voting is not currently available',
  },
  closeMap: {
    id: 'app.containers.IdeasShow.closeMap',
    defaultMessage: 'Close Map',
  },
  openMap: {
    id: 'app.containers.IdeasShow.openMap',
    defaultMessage: 'Show the idea on a map',
  },
  ideaVoteSubmitError: {
    id: 'app.containers.IdeasShow.ideaVoteSubmitError',
    defaultMessage: 'Voting failed',
  },
  voteOnThisIdea: {
    id: 'app.containers.IdeasShow.voteOnThisIdea',
    defaultMessage: 'Vote on this idea',
  },
  commentEditorHeader: {
    id: 'app.containers.IdeasShow.commentEditorHeader',
    defaultMessage: 'Comment the idea!',
  },
  commentEditorLabel: {
    id: 'app.containers.IdeasShow.commentEditorLabel',
    defaultMessage: 'Comment the idea!',
  },
  commentReplyButton: {
    id: 'app.containers.IdeasShow.commentReplyButton',
    defaultMessage: 'Reply',
  },
  commentDeleteButton: {
    id: 'app.containers.IdeasShow.commentDeleteButton',
    defaultMessage: 'Delete',
  },
  loadingIdea: {
    id: 'app.containers.IdeasShow.loadingIdea',
    defaultMessage: 'Loading idea...',
  },
  oneSecond: {
    id: 'app.containers.IdeasShow.oneSecond',
    defaultMessage: 'Just one second...',
  },
  ideaNotFound: {
    id: 'app.containers.IdeasShow.ideaNotFound',
    defaultMessage: 'Ups... it seems that this idea has be removed or forgotten!',
  },
  emptyCommentError: {
    id: 'app.containers.IdeasShow.emptyCommentError',
    defaultMessage: 'The comment can\'t be empty',
  },
  addCommentError: {
    id: 'app.containers.IdeasShow.addCommentError',
    defaultMessage: 'Something went wrong. Please try again later.',
  },
  submittingComment: {
    id: 'app.containers.IdeasShow.submittingComment',
    defaultMessage: 'Publishing...',
  },
  publishComment: {
    id: 'app.containers.IdeasShow.publishComment',
    defaultMessage: 'Post comment',
  },
  loadMoreComments: {
    id: 'app.containers.IdeasShow.loadMoreComments',
    defaultMessage: 'Load more comments...',
  },
  loadingComments: {
    id: 'app.containers.IdeasShow.loadingComments',
    defaultMessage: 'Loading comments...',
  },
  placeholderComment: {
    id: 'app.containers.IdeasShow.placeholderComment',
    defaultMessage: 'Tell us your thoughts!',
  },
  deleteComment: {
    id: 'app.containers.IdeasShow.deleteComment',
    defaultMessage: 'Delete',
  },
  helmetTitle: {
    id: 'app.containers.IdeasShow.helmetTitle',
    defaultMessage: 'Show idea',
  },
  byAuthor: {
    id: 'app.containers.IdeasShow.byAuthor',
    defaultMessage: 'by {authorName}',
  },
  deletedUser: {
    id: 'app.containers.IdeasShow.deletedUser',
    defaultMessage: 'deleted user',
  },
  author: {
    id: 'app.containers.IdeasShow.author',
    defaultMessage: '{authorNameComponent}',
  },
  parentCommentAuthor: {
    id: 'app.containers.IdeasShow.parentCommentAuthor',
    defaultMessage: '{authorNameComponent} said',
  },
  childCommentAuthor: {
    id: 'app.containers.IdeasShow.childCommentAuthor',
    defaultMessage: '{authorNameComponent} replied',
  },
  shareCTA: {
    id: 'app.containers.IdeasShow.shareCTA',
    defaultMessage: 'Share this idea',
  },
  shareOnFacebook: {
    id: 'app.containers.IdeasShow.shareOnFacebook',
    defaultMessage: 'Share on Facebook',
  },
  shareOnTwitter: {
    id: 'app.containers.IdeasShow.shareOnTwitter',
    defaultMessage: 'Share on Twitter',
  },
  commentsWithCount: {
    id: 'app.containers.IdeasShow.commentsWithCount',
    defaultMessage: 'Comments ({count})',
  },
  ideaStatus: {
    id: 'app.containers.IdeasShow.ideaStatus',
    defaultMessage: 'Idea status',
  },
  commentsTitle: {
    id: 'app.containers.IdeasShow.commentsTitle',
    defaultMessage: 'Give your opinion',
  },
  commentBodyPlaceholder: {
    id: 'app.containers.IdeasShow.commentBodyPlaceholder',
    defaultMessage: 'What do you think about this idea?',
  },
  childCommentBodyPlaceholder: {
    id: 'app.containers.IdeasShow.childCommentBodyPlaceholder',
    defaultMessage: 'Write a reply...',
  },
  commentSuccess: {
    id: 'app.containers.IdeasShow.commentSuccess',
    defaultMessage: 'Thanks for contributing!',
  },
  signInToComment: {
    id: 'app.containers.IdeasShow.signInToComment',
    defaultMessage: 'Please {signInLink} to spread your wisdom.',
  },
  signInLinkText: {
    id: 'app.containers.IdeasShow.signInLinkText',
    defaultMessage: 'log in',
  },
  login: {
    id: 'app.components.IdeasShow.login',
    defaultMessage: 'Login',
  },
  register: {
    id: 'app.components.IdeasShow.register',
    defaultMessage: 'Create an account',
  },
});
