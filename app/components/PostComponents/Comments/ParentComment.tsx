import React, { PureComponent, FormEvent, MouseEvent } from 'react';
import { get } from 'lodash-es';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, switchMap, filter, tap } from 'rxjs/operators';

// components
import Comment from './Comment';
import ChildCommentForm from './ChildCommentForm';
import Spinner from 'components/UI/Spinner';

// services
import { childCommentsStream, IComments } from 'services/comments';

// resources
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetComment, { GetCommentChildProps } from 'resources/GetComment';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// analytics
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled from 'styled-components';
import { colors, fontSizes } from 'utils/styleUtils';
import { darken, lighten } from 'polished';

const Container = styled.div`
  margin-bottom: 40px;
  position: relative;
  background: #fff;
  box-sizing: border-box;
  border: 1px solid #e8e8e8;
  box-shadow: 1px 1px 10px rgba(0, 0, 0, 0.05);
  border-radius: ${(props: any) => props.theme.borderRadius};
`;

const ParentCommentContainer = styled.div`
  position: relative;
`;

const LoadMoreText = styled.span`
  color: ${colors.label};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  line-height: normal;
  text-decoration: underline;
  border: none;
  padding: 0;
  padding: 12px;
  margin: 0;
  transition: all 150ms ease-out;
`;

const LoadMore = styled.button`
  width: 100%;
  min-height: 45px;
  padding: 0;
  margin: 0;
  border: none;
  border-top: solid 1px #e8e8e8;
  border-bottom: solid 1px #e8e8e8;
  background: ${lighten(0.02, '#f0f0f1')};
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 150ms ease-out;

  &.clickable {
    cursor: pointer;

    &:hover {
      background: ${darken(0.01, '#f0f0f1')};

      ${LoadMoreText} {
        color: ${darken(0.25, colors.label)};
      }
    }
  }
`;

interface InputProps {
  commentId: string;
  childCommentIds: string[] | false;
  className?: string;
}

interface DataProps {
  authUser: GetAuthUserChildProps;
  comment: GetCommentChildProps;
  idea: GetIdeaChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {
  canLoadMore: boolean;
  isLoadingMore: boolean;
  hasLoadedMore: boolean;
  childComments: IComments | null;
}

class ParentComment extends PureComponent<Props, State> {
  private loadMore$: BehaviorSubject<boolean>;
  private subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      canLoadMore: false,
      isLoadingMore: false,
      hasLoadedMore: false,
      childComments: null
    };
  }

  componentDidMount() {
    this.loadMore$ = new BehaviorSubject(false);

    this.subscriptions = [
      this.loadMore$.pipe(
        distinctUntilChanged(),
        filter((loadMore) => loadMore),
        tap(() => this.setState({ isLoadingMore: true })),
        switchMap(() => {
          return childCommentsStream(this.props.commentId, {
            queryParameters: {
              'page[number]': 1,
              'page[size]': 500
            }
          }).observable;
        })
      )
      .subscribe((childComments) => {
        this.setState({ childComments, isLoadingMore: false, hasLoadedMore: true });
      })
    ];
  }

  componentDidUpdate(_prevProps: Props) {
    if (!isNilOrError(this.props.comment) && this.props.comment.attributes.children_count > 5 && !this.state.canLoadMore) {
      this.setState({ canLoadMore: true });
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadMore = (event: FormEvent<any>) => {
    if (!this.state.isLoadingMore) {
      event.preventDefault();
      trackEventByName(tracks.clickParentCommentLoadMoreButton);
      this.loadMore$.next(true);
    }
  }

  removeFocus = (event: MouseEvent) => {
    event.preventDefault();
  }

  render() {
    const { commentId, authUser, comment, idea, className } = this.props;
    const { canLoadMore, isLoadingMore, hasLoadedMore, childComments } = this.state;

    if (!isNilOrError(comment) && !isNilOrError(idea)) {
      const ideaId = idea.id;
      const projectId = idea.relationships.project.data.id;
      const commentDeleted = (comment.attributes.publication_status === 'deleted');
      const commentingEnabled = idea.relationships.action_descriptor.data.commenting.enabled;
      const showCommentForm = (authUser && commentingEnabled && !commentDeleted);
      const hasChildComments = (this.props.childCommentIds && this.props.childCommentIds.length > 0);
      const childCommentIds = (!isNilOrError(childComments) ? childComments.data.filter((comment) => comment.attributes.publication_status !== 'deleted').map(comment => comment.id) : this.props.childCommentIds);
      const canReply = (comment.attributes.publication_status !== 'deleted');

      // hide parent comments that are deleted when they have no children
      if (comment.attributes.publication_status === 'deleted' && !hasChildComments) {
        return null;
      }

      return (
        <Container className={`e2e-parent-and-childcomments ${className}`}>
          <ParentCommentContainer className={`${commentDeleted && 'deleted'}`}>
            <Comment
              ideaId={ideaId}
              projectId={projectId}
              commentId={comment.id}
              commentType="parent"
              hasBottomBorder={!(canLoadMore && !hasLoadedMore)}
              hasChildComments={hasChildComments}
              canReply={canReply}
            />
          </ParentCommentContainer>

          {canLoadMore && !hasLoadedMore &&
            <LoadMore
              onMouseDown={this.removeFocus}
              onClick={this.loadMore}
              className={!isLoadingMore ? 'clickable' : ''}
            >
              {!isLoadingMore ? (
                <LoadMoreText>
                  <FormattedMessage {...messages.loadMoreComments} />
                </LoadMoreText>
              ) : (
                <Spinner size="25px" />
              )}
            </LoadMore>
          }

          {childCommentIds && childCommentIds.length > 0 && childCommentIds.map((childCommentId, index) => (
            <Comment
              ideaId={idea.id}
              projectId={projectId}
              key={childCommentId}
              commentId={childCommentId}
              commentType="child"
              last={index === childCommentIds.length - 1}
              canReply={canReply}
            />
          ))}

          {showCommentForm &&
            <ChildCommentForm
              ideaId={ideaId}
              projectId={projectId}
              parentId={commentId}
              waitForChildCommentsRefetch={!isNilOrError(childComments)}
            />
          }
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser/>,
  comment: ({ commentId, render }) => <GetComment id={commentId}>{render}</GetComment>,
  idea: ({ comment, render }) => <GetIdea id={get(comment, 'relationships.post.data.id')}>{render}</GetIdea>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ParentComment {...inputProps} {...dataProps} />}
  </Data>
);
