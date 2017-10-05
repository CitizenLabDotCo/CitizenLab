import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs';
import { currentTenantStream, ITenantData } from 'services/tenant';
import { watchEvents, watchPageChanges, watchIdentification } from 'utils/analytics/sagas';
import snippet from '@segment/snippet';
import { CL_SEGMENT_API_KEY } from 'containers/App/constants';

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
  name: string;
  properties?: {
    [key: string]: any,
  };
}

const tenant$ = currentTenantStream().observable;
const events$ = new Rx.Subject<IEvent>();
const identifications$ = new Rx.Subject<IIdentification>();
const pageChanges$ = new Rx.Subject<IPageChange>();

Rx.Observable.combineLatest(tenant$, events$).subscribe(([tenant, event]) => {
  (window as any).analytics.track(
    event.name,
    addTenantInfo(event.properties, tenant.data),
  );
});

Rx.Observable.combineLatest(tenant$, pageChanges$).subscribe(([tenant, pageChange]) => {
  (window as any).analytics.page(
    pageChange.name,
    addTenantInfo(pageChange.properties, tenant.data),
  );
});

Rx.Observable.combineLatest(tenant$, identifications$).subscribe(([tenant, identification]) => {
  (window as any).analytics.identify(
    identification.userId,
    addTenantInfo(identification.properties, tenant.data),
  );
});


export function addTenantInfo(properties, tenant: ITenantData) {
  return {
    ...properties,
    tenantId: tenant && tenant.id,
    tenantName: tenant && tenant.attributes.name,
    tenantHost: tenant && tenant.attributes.host,
    tenantOrganizationType: tenant && tenant.attributes.settings.core.organization_type,
  };
}

export function trackPage(path: string, properties: {} = {}) {
  pageChanges$.next({
    properties,
    name: path
  });
}

export function trackIdentification(userId: string, properties: {} = {}) {
  identifications$.next({
    userId,
    properties,
  });
}

export function trackEvent(eventName: string, properties: {} = {}) {
  events$.next({
    name: eventName,
    properties,
  });
}

/** HOC that allows specifying events as function props to the inner component
 e.g.:
 const SomeComponent = ({ buttonClicked }) => <button onClick={buttonClicked} />);
 const TrackedComponent = injectTracks(
   {trackButtonClick: {name: 'Button clicked'}}
  )(SomeComponent);
*/
export const injectTracks = <P>(events: {[key: string]: IEvent}) => (component: React.ComponentClass<P>) => {
  return (props: P) => {
    const eventFunctions = _.mapValues(events, (event) => (
      (extra) => {
        const extraProps = extra && extra.extra;
        trackEvent(event.name, { ...event.properties, ...extraProps });
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

export const initializeAnalytics = (store) => {
  // Initialize segments window.analytics object
  const contents = snippet.min({
    host: 'cdn.segment.com',
    apiKey: CL_SEGMENT_API_KEY,
  });

  // tslint:disable-next-line:no-eval
  eval(contents);

  store.runSaga(watchEvents);
  store.runSaga(watchPageChanges);
  store.runSaga(watchIdentification);
};
