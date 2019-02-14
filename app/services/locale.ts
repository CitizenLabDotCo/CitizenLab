import { BehaviorSubject, combineLatest } from 'rxjs';
import { first, map, distinctUntilChanged, filter } from 'rxjs/operators';
import { includes, isEqual } from 'lodash-es';
import { currentTenantStream } from 'services/tenant';
import { authUserStream } from 'services/auth';
import { Locale } from 'typings';
import { locales } from 'containers/App/constants';

const LocaleSubject: BehaviorSubject<Locale> = new BehaviorSubject(null as any);
const $tenantLocales = currentTenantStream().observable.pipe(
  map(tenant => tenant.data.attributes.settings.core.locales),
  distinctUntilChanged((prev, next) => !isEqual(prev, next))
);
const $authUser = authUserStream().observable.pipe(
  distinctUntilChanged()
);
const $locale = LocaleSubject.pipe(
  distinctUntilChanged(),
  filter((locale) => locale !== null)
);

$locale.subscribe((locale) => {
  const urlLocale = getUrlLocale(location.pathname);

  if (!urlLocale) {
    const newLocalizedUrl = `/${locale}${location.pathname}${location.search}`;
    window.history.replaceState({ path: newLocalizedUrl }, '', newLocalizedUrl);
  } else if (urlLocale && urlLocale !== locale) {
    const urlSegments = location.pathname.replace(/^\/|\/$/g, '').split('/');
    urlSegments[0] = locale;
    const newPathname = urlSegments.join('/');
    const newLocalizedUrl = `/${newPathname}${location.search}`;
    window.history.replaceState({ path: newLocalizedUrl }, '', newLocalizedUrl);
  }
});

combineLatest(
  $authUser,
  $tenantLocales
).subscribe(([user, tenantLocales]) => {
  const urlLocale = getUrlLocale(location.pathname);
  const userLocale = (user && user.data.attributes.locale && includes(tenantLocales, user.data.attributes.locale) ? user.data.attributes.locale : null);

  if (userLocale) {
    LocaleSubject.next(userLocale);
  } else if (includes(tenantLocales, urlLocale)) {
    LocaleSubject.next(urlLocale as Locale);
  } else if (tenantLocales && tenantLocales.length > 0) {
    LocaleSubject.next(tenantLocales[0]);
  }
});

export function getUrlLocale(pathname: string) {
  const firstUrlSegment = pathname.replace(/^\/|\/$/g, '').split('/')[0];
  const isLocale = (includes(locales, firstUrlSegment));
  return (isLocale ? firstUrlSegment : null);
}

export function updateLocale(locale: Locale) {
  $tenantLocales.pipe(
    first()
  ).subscribe((tenantLocales) => {
    if (includes(tenantLocales, locale)) {
      LocaleSubject.next(locale);
    }
  });
}

export function localeStream() {
  return {
    observable: $locale
  };
}
