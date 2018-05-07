import React from 'react';
import { BehaviorSubject, Subscription } from 'rxjs';
import shallowCompare from 'utils/shallowCompare';
import { IProjectImageData, projectImagesStream } from 'services/projectImages';
import { isString } from 'lodash';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {
  projectId: string | null;
}

type children = (renderProps: GetProjectImagesChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  projectImages: IProjectImageData[] | undefined | null | Error;
}

export type GetProjectImagesChildProps = IProjectImageData[] | undefined | null | Error;

export default class GetIdea extends React.Component<Props, State> {
  private inputProps$: BehaviorSubject<InputProps>;
  private subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      projectImages: undefined
    };
  }

  componentDidMount() {
    const { projectId } = this.props;

    this.inputProps$ = new BehaviorSubject({ projectId });

    this.subscriptions = [
      this.inputProps$
        .distinctUntilChanged((prev, next) => shallowCompare(prev, next))
        .filter(({ projectId }) => isString(projectId))
        .switchMap(({ projectId }: {projectId: string}) => projectImagesStream(projectId).observable)
        .subscribe((projectImages) => {
          this.setState({ projectImages: (!isNilOrError(projectImages) ? projectImages.data : projectImages) });
        })
    ];
  }

  componentDidUpdate() {
    const { projectId } = this.props;
    this.inputProps$.next({ projectId });
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { projectImages } = this.state;
    return (children as children)(projectImages);
  }
}
