import { formatTranslationMessages } from './';

// no need to call addLocaleData(enLocaleData) here because it happens by default in index.ts

const enCATranslationMessages = require('translations/en-CA.json');
const translationMessages = formatTranslationMessages(
  'en-CA',
  enCATranslationMessages
);

export default translationMessages;
