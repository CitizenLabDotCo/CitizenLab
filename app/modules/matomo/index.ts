import { combineLatest } from 'rxjs';
import { authUserStream } from 'services/auth';
import { currentAppConfigurationStream } from 'services/appConfiguration';
import {
  bufferUntilInitialized,
  events$,
  initializeFor,
  pageChanges$,
  shutdownFor,
  tenantInfo,
} from 'utils/analytics';
import { isNilOrError } from 'utils/helperUtils';
import {
  IDestinationConfig,
  registerDestination,
} from 'components/ConsentManager/destinations';
import { ModuleConfiguration } from 'utils/moduleUtils';
import createRoutes from 'routes';
import matchPath, { getAllPathsFromRoutes } from './matchPath';

export const MATOMO_HOST =
  process.env.MATOMO_HOST || '//matomo.hq.citizenlab.co';

declare module 'components/ConsentManager/destinations' {
  export interface IDestinationMap {
    matomo: 'matomo';
  }
}

const destinationConfig: IDestinationConfig = {
  key: 'matomo',
  category: 'analytics',
  feature_flag: 'matomo',
  name: () => 'Matomo',
};

const configuration: ModuleConfiguration = {
  beforeMountApplication: () => {
    combineLatest([
      currentAppConfigurationStream().observable,
      authUserStream().observable,
      initializeFor('matomo'),
    ]).subscribe(([tenant, user, _]) => {
      if (!MATOMO_HOST) return;
      /* tracker methods like "setCustomDimension" should be called before "trackPageView" */
      window._paq = window._paq || [];

      window._paq.push(['enableLinkTracking']);
      window._paq.push(['setDomains', `${tenant.data.attributes.host}/*`]);
      window._paq.push(['setCookieDomain', `${tenant.data.attributes.host}/*`]);
      if (!isNilOrError(user)) {
        window._paq.push(['setUserId', user.data.id]);
      } else {
        window._paq.push(['resetUserId']);
      }

      (function () {
        // Send all of the tracking data to the global site used for product analytics
        if (tenant.data.attributes.settings.matomo?.product_site_id) {
          window._paq.push(['setTrackerUrl', `${MATOMO_HOST}/matomo.php`]);
          window._paq.push([
            'setSiteId',
            tenant.data.attributes.settings.matomo?.product_site_id,
          ]);
        }
        // Send tracking data to the tenant-specific site
        if (tenant.data.attributes.settings.matomo?.tenant_site_id) {
          window._paq.push([
            'addTracker',
            `${MATOMO_HOST}/matomo.php`,
            tenant.data.attributes.settings.matomo?.tenant_site_id,
          ]);
        }

        const d = document;
        const g = d.createElement('script');
        const s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.src = `${MATOMO_HOST}/matomo.js`;
        g.id = 'internal_matomo_analytics';
        s.parentNode?.insertBefore(g, s);
      })();

      if (!isNilOrError(tenant)) {
        window._paq.push([
          'setCustomDimension',
          1,
          tenant.data.attributes.name,
        ]);
        window._paq.push(['setCustomDimension', 2, tenant.data.id]);
      }
    });

    shutdownFor('matomo').subscribe(() => {
      window._paq = undefined;
    });

    combineLatest([
      bufferUntilInitialized('matomo', events$),
      currentAppConfigurationStream().observable,
    ]).subscribe(([event, tenant]) => {
      if (!isNilOrError(tenant) && window._paq) {
        const properties = {
          ...tenantInfo(tenant.data),
          ...event.properties,
        };
        window._paq.push([
          'trackEvent',
          event.name,
          ...(Object.values(properties || {}) || []).filter(
            (item) => typeof item === 'string'
          ),
        ]);
      }
    });

    const allAppPaths = getAllPathsFromRoutes(createRoutes()[0]);

    combineLatest([
      bufferUntilInitialized('matomo', pageChanges$),
      currentAppConfigurationStream().observable,
    ]).subscribe(([pageChange, _]) => {
      if (window._paq) {
        window._paq.push(['setCustomUrl', pageChange.path]);

        // sorts out path and params for this pathname
        const routeMatch = matchPath(pageChange.path, {
          path: allAppPaths,
          exact: true,
        });

        if (routeMatch?.isExact) {
          window._paq.push(['trackPageView', routeMatch.path]);
        } else {
          window._paq.push(['trackPageView']);
        }
      }
    });

    registerDestination(destinationConfig);
  },
};

export default configuration;
