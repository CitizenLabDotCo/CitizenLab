import React from 'react';
import { Subject, combineLatest } from 'rxjs';
import { mapValues, isFunction, get } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';
import { currentTenantStream, ITenantData } from 'services/tenant';
import { authUserStream } from 'services/auth';
import snippet from '@segment/snippet';
import { isAdmin, isSuperAdmin, isProjectModerator } from 'services/permissions/roles';
import { IUser } from 'services/users';

export interface IEvent {
  name: string;
  properties?: {
    [key: string]: any,
  };
}

export interface IPageChange {
  path: string;
  properties?: {
    [key: string]: any,
  };
}

const tenant$ = currentTenantStream().observable;
const authUser$ = authUserStream().observable;
const events$ = new Subject<IEvent>();
const pageChanges$ = new Subject<IPageChange>();

combineLatest(tenant$, authUser$, events$).subscribe(([tenant, user, event]) => {
  if (!isNilOrError(tenant) && isFunction(get(window, 'analytics.track'))) {
    analytics.track(
      event.name,
      { ...event.properties, ...tenantInfo(tenant.data) },
      { integrations: integrations(user) },
    );
  }
});

combineLatest(tenant$, authUser$, pageChanges$).subscribe(([tenant, user, pageChange]) => {
  if (!isNilOrError(tenant) && isFunction(get(window, 'analytics.page'))) {
    analytics.page(
      '',
      {
        path: pageChange.path,
        url: `https://${tenant.data.attributes.host}${pageChange.path}`,
        title: null,
        ...tenantInfo(tenant.data),
        ...pageChange.properties,
      },
      { integrations: integrations(user) },
    );
  }
});

combineLatest(tenant$, authUser$).subscribe(([tenant, user]) => {
  if (!isNilOrError(tenant) && isFunction(get(window, 'analytics.identify')) && isFunction(get(window, 'analytics.group'))) {
    if (user) {
      analytics.identify(
        user.data.id,
        {
          ...tenantInfo(tenant.data),
          email: user.data.attributes.email,
          firstName: user.data.attributes.first_name,
          lastName: user.data.attributes.last_name,
          createdAt: user.data.attributes.created_at,
          avatar: user.data.attributes.avatar ? user.data.attributes.avatar.large : null,
          birthday: user.data.attributes.birthyear,
          gender: user.data.attributes.gender,
          locale: user.data.attributes.locale,
          isSuperAdmin: isSuperAdmin(user),
          isAdmin: isAdmin(user),
          isProjectModerator: isProjectModerator(user),
          highestRole: user.data.attributes.highest_role,
        },
        {
          integrations: integrations(user),
          Intercom: { hideDefaultLauncher: !isAdmin(user) }
        } as any
      );
      analytics.group(
        tenant.data.id,
        {
          ...tenantInfo(tenant.data),
          name: tenant.data.attributes.name,
          website: tenant.data.attributes.settings.core.organization_site,
          avatar: tenant.data.attributes.logo && tenant.data.attributes.logo.medium,
          tenantLocales: tenant.data.attributes.settings.core.locales,
        },
        { integrations: integrations(user) },
      );
    } else { // no user
      analytics.identify(
        tenantInfo(tenant.data),
        {
          integrations: integrations(user),
          Intercom: { hideDefaultLauncher: true }
        } as any
      );
    }
  }
});

export function tenantInfo(tenant: ITenantData) {
  return {
    tenantId: tenant && tenant.id,
    tenantName: tenant && tenant.attributes.name,
    tenantHost: tenant && tenant.attributes.host,
    tenantOrganizationType: tenant && tenant.attributes.settings.core.organization_type,
    tenantLifecycleStage: tenant && tenant.attributes.settings.core.lifecycle_stage,
  };
}

export function integrations(user: IUser | null) {
  const output = {
    Intercom: false,
    SatisMeter: false,
  };
  if (user) {
    const highestRole = user.data.attributes.highest_role;
    output['Intercom'] = highestRole === 'admin' || highestRole === 'project_moderator';
    output['SatisMeter'] = highestRole === 'admin' || highestRole === 'project_moderator';
  }
  return output;
}

export function trackPage(path: string, properties: {} = {}) {
  pageChanges$.next({
    properties,
    path
  });
}

// Use this function, trackEvent/injectTracks will get factored out in the future
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
