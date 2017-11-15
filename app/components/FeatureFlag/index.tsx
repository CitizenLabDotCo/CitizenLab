import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs';

// services
import { currentTenantStream, ITenant } from 'services/tenant';

interface Props {
  name?: string;
}

interface State {
  currentTenant: ITenant | null;
}

export default class FeatureFlag extends React.Component<Props, State> {
  subscription: Rx.Subscription | null;

  constructor(props: Props) {
    super(props as any);
    this.state = { currentTenant: null };
    this.subscription = null;
  }

  componentWillMount() {
    const currentTenant$ = currentTenantStream().observable;
    this.subscription = currentTenant$.subscribe(currentTenant => this.setState({ currentTenant }));
  }

  componentWillUnmount() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  render() {
    const { currentTenant } = this.state;
    const { name } = this.props;
    const showFeature = (!name || (
      _.get(currentTenant, `data.attributes.settings.${name}.allowed`) === true &&
      _.get(currentTenant, `data.attributes.settings.${name}.enabled`) === true
    ));

    if (this.props.children && showFeature) {
      return React.Children.only(this.props.children);
    }

    return null;
  }
}
