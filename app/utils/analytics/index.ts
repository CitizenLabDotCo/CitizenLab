import React from 'react';
import { Subject, combineLatest } from 'rxjs';
import { mapValues } from 'lodash-es';
import { currentTenantStream, ITenantData } from 'services/tenant';
import { authUserStream } from 'services/auth';
import snippet from '@segment/snippet';
import { isAdmin, isSuperAdmin, isProjectModerator } from 'services/permissions/roles';
import { IUser } from 'services/users';

interface IEvent {
  name: string;
  properties?: {
    [key: string]: any,
  };
}

interface IIdentification {
  userId: string;
  properties?: {
    [key: string]: any,
  };
}

interface IPageChange {
  path: string;
  properties?: {
    [key: string]: any,
  };
}

const tenant$ = currentTenantStream().observable;
const authUser$ = authUserStream().observable;
const events$ = new Subject<IEvent>();
const identifications$ = new Subject<IIdentification>();
const pageChanges$ = new Subject<IPageChange>();

combineLatest(tenant$, events$).subscribe(([tenant, event]) => {
  if (analytics) {
    analytics.track(
      event.name,
      addTenantInfo(event.properties, tenant.data),
    );
  }
});

combineLatest(tenant$, pageChanges$).subscribe(([tenant, pageChange]) => {
  if (analytics) {
    analytics.page(
      '',
      {
        path: pageChange.path,
        url: `https://${tenant.data.attributes.host}${pageChange.path}`,
        title: null,
        ...addTenantInfo(pageChange.properties, tenant.data),
      }
    );
  }
});

combineLatest(tenant$, identifications$).subscribe(([tenant, identification]) => {
  if (analytics) {
    analytics.identify(
      identification.userId,
      addTenantInfo(identification.properties, tenant.data),
    );

    analytics.group(
      tenant && tenant.data.id,
      tenant && {
        name: tenant.data.attributes.name,
        host: tenant.data.attributes.host,
        type: tenant.data.attributes.settings.core.organization_type
      }
    );
  }
});

authUser$.subscribe((authUser) => {
  if (analytics) {
    const userId = (authUser ? authUser.data.id : '');
    const hideMessenger = (authUser ? !isAdmin(authUser) : true);
    analytics.identify(userId, {}, {
      Intercom: {
        hideDefaultLauncher: hideMessenger
      }
    } as any);
  }
});

export function addTenantInfo(properties, tenant: ITenantData) {
  return {
    ...properties,
    tenantId: tenant && tenant.id,
    tenantName: tenant && tenant.attributes.name,
    tenantHost: tenant && tenant.attributes.host,
    tenantOrganizationType: tenant && tenant.attributes.settings.core.organization_type,
    tenantLifecycleStage: tenant && tenant.attributes.settings.core.lifecycle_stage,
  };
}

export function trackPage(path: string, properties: {} = {}) {
  pageChanges$.next({
    properties,
    path
  });
}

export function trackIdentification(user: IUser) {
  identifications$.next({
    userId: user.data.id,
    properties: {
      email: user.data.attributes.email,
      firstName: user.data.attributes.first_name,
      lastName: user.data.attributes.last_name,
      createdAt: user.data.attributes.created_at,
      avatar: user.data.attributes.avatar.large,
      birthday: user.data.attributes.birthyear,
      gender: user.data.attributes.gender,
      locale: user.data.attributes.locale,
      isSuperAdmin: isSuperAdmin(user),
      isAdmin: isAdmin(user),
      isProjectModerator: isProjectModerator(user),
      highestRole: user.data.attributes.highest_role,
    }
  });
}

export function trackEventByName(eventName: string, properties: {} = {}) {
  events$.next({
    properties,
    name: eventName,
  });
}

export function trackEvent(event: IEvent) {
  events$.next({
    properties: (event.properties || {}),
    name: event.name,
  });
}

export const injectTracks = <P>(events: {[key: string]: IEvent}) => (component: React.ComponentClass<P>) => {
  return (props: P) => {
    const eventFunctions = mapValues(events, (event) => (
      (extra) => {
        const extraProps = extra && extra.extra;
        trackEventByName(event.name, { ...event.properties, ...extraProps });
      }
    ));

    const propsWithEvents = {
      ...eventFunctions,
      ...props as any,
    };

    const wrappedComponent = React.createElement(component, propsWithEvents);

    return wrappedComponent;
  };
};

export const initializeAnalytics = () => {
  // Initialize segments window.analytics object
  const contents = snippet.min({
    host: 'cdn.segment.com',
    load: false,
    page: false,
  });

  // tslint:disable-next-line:no-eval
  eval(contents);

  trackPage(window.location.pathname);
};
