import React from 'react';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import shallowCompare from 'utils/shallowCompare';
import { ICommentData, commentsForIdeaStream } from 'services/comments';
import { isString } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {
  ideaId: string | null | undefined;
}

type children = (renderProps: GetCommentsChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  comments: ICommentData[] | undefined | null | Error;
}

export type GetCommentsChildProps = ICommentData[] | undefined | null | Error;

export default class GetComments extends React.Component<Props, State> {
  private inputProps$: BehaviorSubject<InputProps>;
  private subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      comments: undefined
    };
  }

  componentDidMount() {
    const { ideaId } = this.props;

    this.inputProps$ = new BehaviorSubject({ ideaId });

    this.subscriptions = [
      this.inputProps$.pipe(
        distinctUntilChanged((prev, next) => shallowCompare(prev, next)),
        filter(({ ideaId }) => isString(ideaId)),
        switchMap(({ ideaId }: { ideaId: string }) => {
          return commentsForIdeaStream(ideaId, {
            queryParameters: {
              'page[number]': 1,
              'page[size]': 500
            }
          }).observable;
        })
      )
      .subscribe((comments) => this.setState({ comments: !isNilOrError(comments) ? comments.data : comments }))
    ];
  }

  componentDidUpdate() {
    const { ideaId } = this.props;
    this.inputProps$.next({ ideaId });
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { comments } = this.state;
    return (children as children)(comments);
  }
}
