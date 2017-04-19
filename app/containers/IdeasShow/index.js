/*
 *
 * IdeasShow
 *
 */

import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import T from 'containers/T';
import { connect } from 'react-redux';
import ImageCarousel from 'components/ImageCarousel';
import { setShowIdeaWithIndexPage } from 'containers/IdeasIndexPage/actions';
import { createStructuredSelector } from 'reselect';
import draftToHtml from 'draftjs-to-html';
import { Saga } from 'react-redux-saga';
import { FormattedMessage } from 'react-intl';
import { Label, Button } from 'components/Foundation';
import styled from 'styled-components';

import {
  loadComments,
  loadIdea,
  loadIdeaSuccess, publishComment, publishCommentError, resetIdeaAndComments, saveCommentDraft,
} from './actions';
import makeSelectIdeasShow, {
  makeSelectActiveParentId,
  makeSelectCommentContent, makeSelectComments, makeSelectLoadCommentsError, makeSelectLoadIdeaError,
  makeSelectLoadingComments, makeSelectLoadingIdea, makeSelectNextCommentPageItemCount, makeSelectNextCommentPageNumber,
  makeSelectResetEditorContent, makeSelectStoreCommentError,
  makeSelectSubmittingComment,
} from './selectors';
import CommentEditorWrapper from './CommentEditorWrapper';
import { makeSelectLocale } from '../LanguageProvider/selectors';
import { makeSelectCurrentUser } from '../../utils/auth/selectors';
import { watchFetchComments, watchFetchIdea, watchStoreComment } from './sagas';
import CommentList from './CommentList';
import messages from './messages';
import IdeaContent from './IdeaContent';

export class IdeasShow extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  constructor() {
    super();

    // bind event handlers to provide 'this' context
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  componentDidMount() {
    if (this.props.showIdeaWithIndexPage === false) {
      const slug = this.props.params.slug;
      this.props.loadIdea(slug);
      this.props.loadComments(slug);
    }
  }

  componentWillUnmount() {
    this.props.dispatch(setShowIdeaWithIndexPage(false));

    if (this.props.showIdeaWithIndexPage === false) {
      this.props.dispatch(loadIdeaSuccess(null));
    }

    // reset component state
    this.props.resetData();
  }

  goToNextPage() {
    const idea = this.props.idea || this.props.pageData.idea;

    const { loadNextCommentsPage, nextCommentPageNumber, nextCommentPageItemCount } = this.props;
    loadNextCommentsPage(idea.id, nextCommentPageNumber, nextCommentPageItemCount);
  }

  notFoundHtml() {
    return (<h2>Idea Not Found :/</h2>);
  }

  ideaHtml(idea) {
    const { attributes, relationships } = idea;

    return (
      <div>
        {attributes.images && attributes.images.length > 0 && <ImageCarousel
          ideaImages={attributes.images}
        />}
        <h2><T value={attributes.title_multiloc} /></h2>
        <p><strong>By: {relationships.author ? relationships.author.data.id : ''}</strong></p>
        <IdeaContent>{attributes.body_multiloc.en}</IdeaContent>
      </div>
    );
  }

  render() {
    const idea = this.props.idea || this.props.pageData.idea;
    const { storeCommentDraftCopy, storeCommentError, submittingComment, comments, resetEditorContent, loadingComments, nextCommentPageNumber, loadingIdea, loadIdeaError, commentContent, userId, locale, activeParentId, publishCommentClick } = this.props;

    const WrapperDiv = (props) => (
      <div
        {...props}
      >
        {!!props.children[0] && props.children}
      </div>
    );

    const CenteredDiv = styled(WrapperDiv)`
      margin: auto;
      width: 20%;
    `;

    return (
      <div>
        <Helmet
          title="IdeasShow"
          meta={[
            { name: 'description', content: 'Description of IdeasShow' },
          ]}
        />
        <Saga saga={watchFetchIdea} />
        <Saga saga={watchFetchComments} />
        <Saga saga={watchStoreComment} />

        {loadIdeaError && <div>
          {loadIdeaError}
        </div>}
        {loadingIdea && <FormattedMessage {...messages.loadingIdea} />}

        { loadIdeaError || !idea ? this.notFoundHtml() : this.ideaHtml(idea) }
        <hr />
        <CommentEditorWrapper
          storeCommentCopy={storeCommentDraftCopy}
          submittingComment={submittingComment}
          resetEditorContent={resetEditorContent}
          idea={idea}
          commentContent={commentContent}
          userId={userId}
          locale={locale}
          parentId={activeParentId}
          publishCommentClick={publishCommentClick}
        />
        <CommentList
          comments={comments}
          storeCommentDraftCopy={storeCommentDraftCopy}
          storeCommentError={storeCommentError}
          submittingComment={submittingComment}
          resetEditorContent={resetEditorContent}
          idea={idea}
          commentContent={commentContent}
          userId={userId}
          locale={locale}
          parentId={activeParentId}
          publishCommentClick={publishCommentClick}
        />
        <CenteredDiv onClick={this.goToNextPage}>
          {(nextCommentPageNumber && !(loadingIdea || loadingComments)) && <Button>
            <FormattedMessage
              {...messages.loadMoreComments}
            />
          </Button>}
          {loadingComments && <Label>
            <FormattedMessage
              {...messages.loadingComments}
            /></Label>}
        </CenteredDiv>
      </div>
    );
  }
}

IdeasShow.propTypes = {
  dispatch: PropTypes.func.isRequired,
  idea: PropTypes.object,
  pageData: PropTypes.object,
  showIdeaWithIndexPage: PropTypes.bool,
  params: PropTypes.object,
  storeCommentDraftCopy: PropTypes.func.isRequired,
  storeCommentError: PropTypes.string,
  submittingComment: PropTypes.bool.isRequired,
  resetEditorContent: PropTypes.bool.isRequired,
  commentContent: PropTypes.string,
  comments: PropTypes.any.isRequired,
  locale: PropTypes.string.isRequired,
  loadIdea: PropTypes.func.isRequired,
  loadComments: PropTypes.func.isRequired,
  loadNextCommentsPage: PropTypes.func.isRequired,
  nextCommentPageNumber: PropTypes.number,
  nextCommentPageItemCount: PropTypes.number,
  loadingComments: PropTypes.bool.isRequired,
  loadingIdea: PropTypes.bool.isRequired,
  loadIdeaError: PropTypes.string,
  activeParentId: PropTypes.string,
  publishCommentClick: PropTypes.func.isRequired,
  userId: PropTypes.string,
  resetData: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  pageData: makeSelectIdeasShow(),
  loadingIdea: makeSelectLoadingIdea(),
  loadingComments: makeSelectLoadingComments(),
  loadCommentsError: makeSelectLoadCommentsError(),
  loadIdeaError: makeSelectLoadIdeaError(),
  comments: makeSelectComments(),
  storeCommentError: makeSelectStoreCommentError(),
  submittingComment: makeSelectSubmittingComment(),
  commentContent: makeSelectCommentContent(),
  locale: makeSelectLocale(),
  user: makeSelectCurrentUser(),
  resetEditorContent: makeSelectResetEditorContent(),
  nextCommentPageNumber: makeSelectNextCommentPageNumber(),
  nextCommentPageItemCount: makeSelectNextCommentPageItemCount(),
  activeParentId: makeSelectActiveParentId(),
});

export function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    loadIdea(ideaId) {
      dispatch(loadIdea(ideaId));
    },
    loadComments(ideaId) {
      dispatch(loadComments(ideaId, null, null, true));
    },
    loadNextCommentsPage(ideaId, nextCommentPageNumber, nextCommentPageItemCount) {
      dispatch(loadComments(ideaId, nextCommentPageNumber, nextCommentPageItemCount, false));
    },
    storeCommentDraftCopy(content, activeParentId) {
      // convert to HTML
      const htmlContent = draftToHtml(content);

      dispatch(saveCommentDraft(htmlContent, activeParentId));
    },
    publishCommentClick(ideaId, htmlContent, userId, locale, parentId, commentId) {
      if (htmlContent && htmlContent.trim() !== '<p></p>') {
        const htmlContents = {};
        htmlContents[locale] = htmlContent;
        dispatch(publishComment(ideaId, userId, htmlContents, parentId));
      } else {
        // empty comment error
        dispatch(publishCommentError('', commentId));
      }
    },
    resetData() {
      dispatch(resetIdeaAndComments());
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(IdeasShow);
