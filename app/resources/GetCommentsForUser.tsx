import React from 'react';
import { BehaviorSubject, Subscription } from 'rxjs';
import { switchMap, distinctUntilChanged } from 'rxjs/operators';
import { ICommentData, commentsForUserStream, IComments } from 'services/comments';
import { get } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {
  userId: string;
}

type children = (renderProps: GetCommentsForUserChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  commentsList: ICommentData[] | undefined | null | Error;
  hasMore: boolean;
  querying: boolean;
  loadingMore: boolean;
  pageNumber: number;
}

export interface GetCommentsForUserChildProps extends State {
  loadMore: () => void;
}

export default class GetCommentsForUser extends React.Component<Props, State> {
  private subscriptions: Subscription[];
  private initialState: State;
  private pageNumber$: BehaviorSubject<number>;

  constructor(props: Props) {
    super(props);
    this.initialState = {
      commentsList: undefined,
      hasMore: false,
      querying: true,
      loadingMore: false,
      pageNumber: 1
    };
    this.state = this.initialState;
    this.pageNumber$ = new BehaviorSubject(1);
  }

  componentDidMount() {
    this.subscriptions = [
      this.pageNumber$.pipe(
        // when page number changes
        distinctUntilChanged(),
        // return the observable stream for these params
        switchMap(pageNumber => {
          return commentsForUserStream(this.props.userId, {
            queryParameters: {
              'page[number]': pageNumber,
              'page[size]': 5
            }
          }).observable;
        }),
        // when this stream receives a different value
        distinctUntilChanged(),
      ).subscribe((newComments: IComments) => {
        // if we received null or error, we just pass that in in any case
        if (isNilOrError(newComments)) {
          this.setState({
            hasMore: false,
            commentsList: newComments,
            loadingMore: false,
            querying: false
          });
        } else {
          const { loadingMore, commentsList } = this.state;
          // is this the last page ?
          const selfLink = get(newComments, 'meta.current_page');
          const lastLink = get(newComments, 'meta.total_pages');
          const hasMore = (Number.isInteger(selfLink) && Number.isInteger(lastLink) && selfLink !== lastLink);

          // if we had not set loading more, we should'nt aggregate the content,
          // it's either first load for this id or a refetch
          this.setState({
            hasMore,
            commentsList: (!loadingMore
              ? newComments.data
              : [...(!isNilOrError(commentsList) ? commentsList : []), ...newComments.data]),
            loadingMore: false,
            pageNumber: selfLink,
            querying: false
          });
        }

      })
    ];
  }

  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId) {
      this.setState(this.initialState);
      this.pageNumber$.next(1);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  loadMore = () => {
    if (this.state.hasMore) {
      const incr = this.state.pageNumber + 1;
      this.pageNumber$.next(incr);
      this.setState({ loadingMore: true });
    }
  }

  render() {
    const { children } = this.props;
    return (children as children)({ loadMore: this.loadMore, ...this.state });
  }
}
