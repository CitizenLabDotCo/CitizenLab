import { Locale, Multiloc, GraphqlLocale } from 'typings';
import { isString } from 'util';
import { trim } from 'lodash-es';
import { removeUrlLocale } from 'services/locale';

export function isNilOrError(obj: any): obj is undefined | null | Error {
  return (obj === undefined || obj === null || obj instanceof Error);
}

export function isEmptyMultiloc(multiloc: Multiloc) {
  let validTranslation = false;

  for (const lang in multiloc) {
    if (Object.prototype.hasOwnProperty.call(multiloc, lang)) {
      if (multiloc[lang].length > 0) {
        validTranslation = true;
      }
    }
  }

  return !validTranslation;
}
export function isFullMultiloc(multiloc: Multiloc) {
  for (const lang in multiloc) {
    if (Object.prototype.hasOwnProperty.call(multiloc, lang)) {
      if (multiloc[lang].length === 0) {
        return false;
      }
    }
  }

  return true;
}

export function isNonEmptyString(str: string) {
  return isString(str) && trim(str) !== '';
}

export function isMobileDevice() {
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

export function returnFileSize(number) {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
  return;
}

export function sum(a, b) {
  return a + b;
}
export function getFormattedBudget(locale: Locale, budget: number, currency: string) {
  return new Intl.NumberFormat(locale, {
    currency,
    localeMatcher: 'best fit',
    style: 'currency',
    currencyDisplay: 'symbol',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(budget);
}

export function getDisplayName(Component) {
  return Component.displayName || Component.name || 'Component';
}

export function isPage(pageKey: 'admin' | 'idea_form' | 'initiative_form', pathName: string) {
   /**
   * Checks whether current page is the desired page
   *
   * @param pageKey - key to indicate the desired page
   * @param pathName - pathname to check (usually current path aka location.pathname)
   *
   * @returns Boolean. True if current page matches the pageKey's url, false otherwise.
   */

  const pathnameWithoutLocale = removeUrlLocale(pathName);

  switch (pageKey) {
    case 'admin':
      return pathnameWithoutLocale.startsWith('/admin');
    case 'initiative_form':
      // Needs to use endsWith
      // Otherwise an initiative with the name 'new playground for our children' would also pass
      return pathnameWithoutLocale.endsWith('/initiatives/new');
    case 'idea_form':
      return pathnameWithoutLocale.endsWith('/ideas/new');
  }
}

export function stopPropagation(event) {
  event.stopPropagation();
}

export function stripHtmlTags(str: string | null | undefined) {
  if ((str === null) || (str === undefined) || (str === '')) {
    return '';
  } else {
    return str.replace(/<\/?(p|div|span|ul|ol|li|br|em|img|strong|a)[^>]{0,}\/?>/g, '');
  }
}

// e.g. 'en-GB' -> 'enGb' (for use in graphQl query)
export function convertToGraphqlLocale(locale: Locale) {
  const newLocale = locale.replace('-', '');
  const length = newLocale.length - 1;
  return newLocale.substring(0, length) + newLocale.substr(length).toLowerCase() as GraphqlLocale;
}

export function isUUID(value: string) {
  const uuidRegExp = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/i;
  return uuidRegExp.test(value);
}
