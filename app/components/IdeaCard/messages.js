/*
 * IdeaCard Messages
 *
 * This contains all the text for the IdeaCard component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id: 'app.components.IdeaCard.header',
    defaultMessage: 'This is the IdeaCard component !',
  },
  author: {
    id: 'app.components.IdeaCard.author',
    defaultMessage: 'Author',
  },
  byAuthorName: {
    id: 'app.components.IdeaCard.byAuthorName',
    defaultMessage: 'by {authorName}',
  },
  byDeletedUser: {
    id: 'app.components.IdeaCard.byDeletedUser',
    defaultMessage: 'by {deletedUser}',
  },
  deletedUser: {
    id: 'app.components.IdeaCard.deletedUser',
    defaultMessage: 'deleted user',
  },
  login: {
    id: 'app.components.IdeaCard.login',
    defaultMessage: 'Login',
  },
  register: {
    id: 'app.components.IdeaCard.register',
    defaultMessage: 'Create an account',
  },
});
