/*
 * UsersPasswordRecovery Messages
 *
 * This contains all the text for the UsersPasswordRecovery component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.containers.UsersPasswordRecovery.header',
    defaultMessage: 'Request a reset link',
  },
  submit: {
    id: 'app.containers.AdminPages.submit',
    defaultMessage: 'Submit',
  },
  processing: {
    id: 'app.containers.UsersPasswordRecovery.processing',
    defaultMessage: 'Processing...',
  },
  sent: {
    id: 'app.containers.UsersPasswordRecovery.sent',
    defaultMessage: 'Link sent! Redirecting...',
  },
  invalidEmail: {
    id: 'app.containers.AdminPages.invalidEmail',
    defaultMessage: 'Email is invalid!',
  },
  notFoundError: {
    id: 'app.containers.AdminPages.notFoundError',
    defaultMessage: 'Not found!',
  },
});
