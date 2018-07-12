import React from 'react';
import clHistory from 'utils/cl-router/history';
import { Location } from 'history';

interface InputProps {}

type children = (renderProps: GetLocationChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  location: Location | undefined | null;
}

export type GetLocationChildProps = Location | undefined | null;

export default class GetLocation extends React.Component<Props, State> {
  private unlisten: Function;

  constructor(props: Props) {
    super(props);
    this.state = {
      location: undefined
    };
  }

  componentDidMount() {
    this.setState({ location: clHistory.getCurrentLocation() });

    this.unlisten = clHistory.listen((location) => {
      this.setState({ location });
    });
  }

  componentWillUnmount() {
    this.unlisten();
  }

  render() {
    const { children } = this.props;
    const { location } = this.state;
    return (children as children)(location);
  }
}
