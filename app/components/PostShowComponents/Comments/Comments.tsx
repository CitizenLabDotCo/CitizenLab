import React, { memo, useMemo, useCallback, useEffect, useState } from 'react';

// utils
import eventEmitter from 'utils/eventEmitter';
import { isNilOrError } from 'utils/helperUtils';

// components
import ParentComment from './ParentComment';
import CommentSorting from './CommentSorting';
import Spinner from 'components/UI/Spinner';

// services
import { ICommentData, CommentsSort } from 'services/comments';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { media } from 'utils/styleUtils';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl } from 'utils/cl-intl';
import messages from './messages';

// a11y
import { LiveMessage } from 'react-aria-live';

const Container = styled.div`
  position: relative;
`;

const SpinnerWrapper = styled.div`
  width: 100%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 40px;
  left: 0;
  right: 0;
  z-index: 2;
`;

const StyledCommentSorting = styled(CommentSorting)`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 15px;

  ${media.smallerThanMinTablet`
    justify-content: flex-start;
    margin-bottom: 15px;
  `}
`;

const StyledParentComment = styled(ParentComment)`
  &.loading {
    opacity: 0;
  }
`;

interface Props {
  postId: string;
  postType: 'idea' | 'initiative';
  comments: ICommentData[];
  sortOrder: CommentsSort;
  loading: boolean;
  onSortOrderChange: (sortOrder: CommentsSort) => void;
  className?: string;
}

const CommentsSection = memo<Props & InjectedIntlProps>(({ postId, postType, comments, sortOrder, loading, onSortOrderChange, className, intl: { formatMessage } }) => {
  const [commentPostedMessage, setCommentPostedMessage] = useState('');
  const [commentDeletedMessage, setCommentDeletedMessage] = useState('');

  const sortedParentComments = useMemo(() => {
    if (!isNilOrError(comments) && comments.length > 0) {
      return comments.filter(comment => comment.relationships.parent.data === null);
    }
    return null;
  }, [sortOrder, comments]);

  const handleSortOrderChange = useCallback(
    (sortOrder: CommentsSort) => {
      trackEventByName(tracks.clickCommentsSortOrder);
      onSortOrderChange(sortOrder);
    }, []
  );

  useEffect(() => {
    const subscriptions = [
      eventEmitter.observeEvent('CommentAdded').subscribe(() => {
        setCommentPostedMessage(formatMessage(messages.a11y_commentPosted));
        setTimeout(() => setCommentPostedMessage(''), 1000);
      }),
      eventEmitter.observeEvent('CommentDeleted').subscribe(() => {
        setCommentDeletedMessage(formatMessage(messages.a11y_commentDeleted));
        setTimeout(() => setCommentDeletedMessage(''), 1000);
      })
    ];

    return () => subscriptions.forEach(subscription => subscription.unsubscribe());
  }, []);

  return (
    <Container className={`e2e-comments-container ${className}`}>
      <LiveMessage message={commentPostedMessage || commentDeletedMessage} aria-live="polite" />

      {loading &&
        <SpinnerWrapper>
          <Spinner />
        </SpinnerWrapper>
      }

      {sortedParentComments && sortedParentComments.length > 0 &&
        <StyledCommentSorting
          onChange={handleSortOrderChange}
          selectedValue={[sortOrder]}
        />
      }

      {sortedParentComments && sortedParentComments.map((parentComment, _index) => {
        const childCommentIds = (!isNilOrError(comments) && comments.filter((comment) => {
          if (
            comment.relationships.parent.data &&
            comment.relationships.parent.data.id === parentComment.id &&
            comment.attributes.publication_status !== 'deleted'
          ) {
            return true;
          }

          return false;
        }).map(comment => comment.id));

        return (
          <StyledParentComment
            key={parentComment.id}
            postId={postId}
            postType={postType}
            commentId={parentComment.id}
            childCommentIds={childCommentIds}
            className={loading ? 'loading' : ''}
          />
        );
      })}
    </Container>
  );
});

export default injectIntl(CommentsSection);
