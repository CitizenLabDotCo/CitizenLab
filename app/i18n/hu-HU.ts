import { addLocaleData } from 'react-intl';
import huLocaleData from 'react-intl/locale-data/hu';

import { formatTranslationMessages } from './';

addLocaleData(huLocaleData);

const huHUTranslationMessages = require('translations/hu-HU.json');
const translationMessages = formatTranslationMessages('hu-HU', huHUTranslationMessages);

export default translationMessages;
