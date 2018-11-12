import { Locale } from 'typings';

export function isNilOrError(obj: any): obj is undefined | null | Error {
  return (obj === undefined || obj === null || obj instanceof Error);
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
