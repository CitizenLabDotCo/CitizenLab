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

const env = process.env.NODE_ENV;
export const MATOMO_URL = process.env.MATOMO_URL || '//matomo.hq.citizenlab.co';
export const MATOMO_CL_SITE = env === 'production' ? '4' : '2';

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
      if (!MATOMO_URL) return;
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
        window._paq.push(['setTrackerUrl', `${MATOMO_URL}/matomo.php`]);
        window._paq.push(['setSiteId', MATOMO_CL_SITE]);
        // Send tracking data to the tenant-specific site
        if (tenant.data.attributes.settings.matomo?.site_id) {
          window._paq.push([
            'addTracker',
            `${MATOMO_URL}/matomo.php`,
            tenant.data.attributes.settings.matomo?.site_id,
          ]);
        }

        // TODO reset tracking if user changes ? check if tracker is there before calling this ?
        const d = document;
        const g = d.createElement('script');
        const s = d.getElementsByTagName('script')[0];
        g.type = 'text/javascript';
        g.async = true;
        g.src = `${MATOMO_URL}/matomo.js`;
        g.id = 'internal_matomo_analytics';
        s.parentNode?.insertBefore(g, s);
      })();

      // TODO Setup custom dimensions
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
        // TODO get url from pagechange
        window._paq.push(['setCustomUrl', pageChange.path]);

        // sorts out path and params for this pathname
        const routeMatch = matchPath(pageChange.path, {
          path: allAppPaths,
          exact: true,
        });

        if (routeMatch.isExact) {
          window._paq.push(['trackPageView', routeMatch.path]);
        }
      }
    });

    registerDestination(destinationConfig);
  },
};

export default configuration;
