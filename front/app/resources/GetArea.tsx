import React from 'react';
import { isString } from 'lodash-es';
import { BehaviorSubject, Subscription } from 'rxjs';
import { distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import shallowCompare from 'utils/shallowCompare';
import { IAreaData, areaByIdStream } from 'services/areas';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {
  id: string;
}

type children = (renderProps: GetAreaChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  area: IAreaData | undefined | null | Error;
}

export type GetAreaChildProps = IAreaData | undefined | null | Error;

export default class GetArea extends React.Component<Props, State> {
  private inputProps$: BehaviorSubject<InputProps>;
  private subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      area: undefined,
    };
  }

  componentDidMount() {
    const { id } = this.props;

    this.inputProps$ = new BehaviorSubject({ id });

    this.subscriptions = [
      this.inputProps$
        .pipe(
          distinctUntilChanged((prev, next) => shallowCompare(prev, next)),
          filter(({ id }) => isString(id)),
          switchMap(({ id }) => areaByIdStream(id).observable)
        )
        .subscribe((area) =>
          this.setState({ area: !isNilOrError(area) ? area.data : area })
        ),
    ];
  }

  componentDidUpdate() {
    const { id } = this.props;
    this.inputProps$.next({ id });
  }

  componentWillUnmount() {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { area } = this.state;
    return (children as children)(area);
  }
}
