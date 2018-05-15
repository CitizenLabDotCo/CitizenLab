import React from 'react';
import { Subscription } from 'rxjs/Subscription';
import { currentTenantStream, ITenantData } from 'services/tenant';
import { isNilOrError } from 'utils/helperUtils';

interface InputProps {}

type children = (renderProps: GetTenantChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

interface State {
  tenant: ITenantData | undefined | null | Error;
}

export type GetTenantChildProps = ITenantData | undefined | null | Error;

export default class GetTenant extends React.Component<Props, State> {
  private subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      tenant: undefined
    };
  }

  componentDidMount() {
    const currentTenant$ = currentTenantStream().observable;

    this.subscriptions = [
      currentTenant$.subscribe((currentTenant) => {
        this.setState({
          tenant: (!isNilOrError(currentTenant) ? currentTenant.data : currentTenant)
        });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { children } = this.props;
    const { tenant } = this.state;
    return (children as children)(tenant);
  }
}
