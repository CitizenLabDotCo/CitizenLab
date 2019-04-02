import { Locale, Multiloc } from 'typings';
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

export function isAdminPage(pathName: string) {
  const pathnameWithoutLocale = removeUrlLocale(pathName);

  return pathnameWithoutLocale.startsWith('/admin');
}
