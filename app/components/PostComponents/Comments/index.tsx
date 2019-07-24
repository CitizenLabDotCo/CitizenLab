// libraries
import React, { memo, useState, useCallback } from 'react';
import { get } from 'lodash-es';
import { adopt } from 'react-adopt';
import Observer from '@researchgate/react-intersection-observer';

// resources
import GetPost, { GetPostChildProps } from 'resources/GetPost';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetComments, { GetCommentsChildProps } from 'resources/GetComments';

// utils
import { isNilOrError } from 'utils/helperUtils';

// components
import LoadingComments from './LoadingComments';
import ParentCommentForm from './ParentCommentForm';
import Comments from './Comments';
import IdeaCommentingWarnings from './CommentingWarnings/IdeaCommentingWarnings';
import InitiativeCommentingWarnings from './CommentingWarnings/InitiativeCommentingWarnings';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';

// typings
import { CommentsSort } from 'services/comments';

const Container = styled.div``;

const LoadMore = styled.div`
  width: 100%;
  height: 0px;
`;

const LoadingMore = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 30px;
`;

const LoadingMoreMessage = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.medium}px;
  font-weight: 400;
`;

export interface InputProps {
  className?: string;
  postId: string;
  postType: 'idea' | 'initiative';
}

interface DataProps {
  post: GetPostChildProps;
  comments: GetCommentsChildProps;
  project: GetProjectChildProps;
}

interface Props extends InputProps, DataProps {}

const CommentsSection = memo<Props>(({ post, postType, comments, project, className }) => {
  const [sortOrder, setSortOrder] = useState<CommentsSort>('-new');
  const [posting, setPosting] = useState(false);
  const { commentsList, hasMore, onLoadMore, loadingInital, loadingMore, onChangeSort } = comments;

  const handleSortOrderChange = useCallback(
    (sortOrder: CommentsSort) => {
      onChangeSort(sortOrder);
      setSortOrder(sortOrder);
    }, []
  );

  const handleIntersection = useCallback(
    (event: IntersectionObserverEntry, unobserve: () => void) => {
      if (event.isIntersecting) {
        onLoadMore();
        unobserve();
      }
    }, []
  );

  const handleCommentPosting = useCallback(
    (isPosting: boolean) => {
      setPosting(isPosting);
    }, []
  );

  return (
    <Container className={className}>
      {(!isNilOrError(post) && !isNilOrError(commentsList) && !isNilOrError(project)) ? (
        <>
          {postType === 'idea' && <IdeaCommentingWarnings ideaId={post.id} />}
          {postType === 'initiative' && <InitiativeCommentingWarnings initiativeId={post.id} />}

          <Comments
            comments={commentsList}
            sortOrder={sortOrder}
            loading={loadingInital}
            onSortOrderChange={handleSortOrderChange}
          />

          {hasMore && !loadingMore &&
            <Observer onChange={handleIntersection} rootMargin="3000px">
              <LoadMore />
            </Observer>
          }

          {loadingMore && !posting &&
            <LoadingMore>
              <LoadingMoreMessage>
                <FormattedMessage {...messages.loadingMoreComments} />
              </LoadingMoreMessage>
            </LoadingMore>
          }

          <ParentCommentForm
            ideaId={ideaId}
            postingComment={handleCommentPosting}
          />
        </>
      ) : (
        <LoadingComments />
      )}
    </Container>
  );
});

const Data = adopt<DataProps, InputProps>({
  post: ({ postId, postType, render }) => <GetPost postId={postId} postType={postType}>{render}</GetPost>,
  comments: ({ postId, postType, render }) => <GetComments postId={postId} postType={postType}>{render}</GetComments>,
  project: ({ post, postType, render }) => postType === 'idea' ? <GetProject id={get(post, 'relationships.project.data.id')}>{render}</GetProject> : null
});

export default memo<InputProps>((inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <CommentsSection {...inputProps} {...dataProps} />}
  </Data>
));
