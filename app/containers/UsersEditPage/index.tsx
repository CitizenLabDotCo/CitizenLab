// Libraries
import React, { PureComponent } from 'react';
import { Subscription } from 'rxjs';
import { combineLatest } from 'rxjs/observable/combineLatest';

// router
import clHistory from 'utils/cl-router/history';

// Services
import { authUserStream } from 'services/auth';
import { areasStream, IAreas } from 'services/areas';
import { currentTenantStream, ITenant } from 'services/tenant';
import { IUser } from 'services/users';

// Components
import ProfileForm from './ProfileForm';

interface Props {}

interface State {
  authUser: IUser | null;
  areas: IAreas | null;
  currentTenant: ITenant | null;
  loaded: boolean;
}

export default class ProfileEditor extends PureComponent<Props, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      authUser: null,
      areas: null,
      currentTenant: null,
      loaded: false
    };
  }

  componentDidMount() {
    const currentTenant$ = currentTenantStream().observable;
    const authUser$ = authUserStream().observable;
    const areas$ = areasStream().observable;

    this.subscriptions = [
      combineLatest(
        currentTenant$,
        authUser$,
        areas$
      ).subscribe(([currentTenant, authUser, areas]) => {
        this.setState({ currentTenant, authUser, areas, loaded: true });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  render() {
    const { currentTenant, authUser, areas, loaded } = this.state;

    if (loaded && !authUser) {
      clHistory.push('/');
    }

    if (loaded && currentTenant && authUser && areas) {
      return (
        <ProfileForm
          user={authUser.data}
          areas={areas.data}
          tenant={currentTenant.data}
        />
      );
    }

    return null;
  }
}
