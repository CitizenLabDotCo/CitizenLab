import { defineMessages } from 'react-intl';

export default defineMessages({
  twitterMessage: {
    id: 'app.containers.ProjectFolderShowPage.twitterMessage',
    defaultMessage: '{title}',
  },
  metaTitle: {
    id: 'app.containers.ProjectFolderShowPage.metaTitle',
    defaultMessage: '{title}',
  },
  invisibleTitleMainContent: {
    id: 'app.containers.ProjectFolderShowPage.invisibleTitleMainContent',
    defaultMessage: 'Information about this folder',
  },
  noFolderFoundHere: {
    id: 'app.containers.ProjectFolderShowPage.noFolderFoundHere',
    defaultMessage:
      '{tenantName, select, CQC {Log in to view this folder.} other {There is no folder here.}}',
  },
  goBackToList: {
    id: 'app.containers.ProjectFolderShowPage.goBackToList',
    defaultMessage: 'Go back to the list',
  },
});

// TODO: perhaps change messages to include folder
