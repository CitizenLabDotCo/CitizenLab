import { defineMessages } from 'react-intl';

export default defineMessages({
  blank: {
    id: 'app.errors.generics.blank',
    defaultMessage: 'This field cannot be empty.',
  },
  invalid: {
    id: 'app.errors.generics.invalid',
    defaultMessage: 'This field contains an invalid value.',
  },
  unsupported_locales: {
    id: 'app.errors.generics.unsupported_locales',
    defaultMessage: 'This field does not support the current locale.',
  },
  title_multiloc_blank: {
    id: 'app.errors.title_multiloc_blank',
    defaultMessage: 'The title cannot be empty.',
  },
  email_taken: {
    id: 'app.errors.email_taken',
    defaultMessage: 'This email is already taken. Please try another one.',
  },
  locale_blank: {
    id: 'app.errors.locale_blank',
    defaultMessage: 'Please choose a language',
  },
  locale_inclusion: {
    id: 'app.errors.locale_inclusion',
    defaultMessage: 'Please choose a supported language',
  },
  first_name_blank: {
    id: 'app.errors.first_name_blank',
    defaultMessage: 'Please enter your first name',
  },
  last_name_blank: {
    id: 'app.errors.last_name_blank',
    defaultMessage: 'Please enter your last name',
  },
  email_blank: {
    id: 'app.errors.email_blank',
    defaultMessage: 'Please enter your email address',
  },
  password_blank: {
    id: 'app.errors.password_blank',
    defaultMessage: 'Please enter a password',
  },
  password_too_short: {
    id: 'app.errors.password_too_short',
    defaultMessage: 'The password must be at least 8 characters long',
  },
});
