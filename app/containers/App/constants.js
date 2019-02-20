"use strict";
exports.__esModule = true;
exports.AUTH_PATH = '/auth';
exports.API_PATH = '/web_api/v1';
exports.GOOGLE_MAPS_API_KEY = 'AIzaSyDRtFe1KRBnGfDy_ijw6yCYsYnEkQRl9Cw';
exports.CL_GA_TRACKING_ID = 'UA-65562281-44';
exports.CL_GA_TRACKER_NAME = 'CitizenLab2';
exports.CL_SEGMENT_API_KEY = process.env.SEGMENT_API_KEY || 'sIoYsVoTTCBmrcs7yAz1zRFRGhAofBlg';
exports.API_HOST = process.env.API_HOST || (typeof window === 'undefined' ? 'localhost' : window.location.hostname);
exports.API_PORT = process.env.API_PORT || 4000;
exports.DEFAULT_LOCALE = 'en';
// the locales we "support" :
// platformBaseUrl/{oneOfTheseStrings}/{anything we have a route for}
// - won't 404
// - will replace the oneOfTheseStrings with authUser's locale if there is one
// - else, will replace the oneOfTheseStrings with the one if the cookie if it exists
// - else, will replce the oneOfTheseStrings with the first locale of the platfom (default)
exports.locales = [
    'en',
    'fr',
    'de',
    'nl',
    'nb',
    'da',
    'de-DE',
    'en-GB',
    'en-CA',
    'fr-BE',
    'fr-FR',
    'nl-BE',
    'nl-NL',
    'da-DK',
    'nb-NO'
];
// the locales we really support, ie we have translations for these ect
exports.appLocalePairs = {
    en: 'English',
    'en-GB': 'English (Great Britain)',
    'en-CA': 'English (Canada)',
    'fr-BE': 'Français (Belgique)',
    'fr-FR': 'Français (France)',
    'nl-BE': 'Nederlands (België)',
    'nl-NL': 'Nederlands (Nederland)',
    'de-DE': 'Deutsch',
    'da-DK': 'Dansk',
    'nb-NO': 'Norsk (Bokmål)',
    ach: 'Acholi'
};
exports.shortenedAppLocalePairs = {
    en: 'English',
    'en-GB': 'English',
    'en-CA': 'English',
    'fr-BE': 'Français',
    'fr-FR': 'Français',
    'nl-BE': 'Nederlands',
    'nl-NL': 'Nederlands',
    'de-DE': 'Deutsch',
    'da-DK': 'Dansk',
    'nb-NO': 'Norsk',
    ach: 'Acholi'
};
