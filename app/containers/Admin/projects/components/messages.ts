import { defineMessages } from 'react-intl';

export default defineMessages({
  manageButtonLabel: {
    id: 'app.containers.Admin.projects.all.components.manageButtonLabel',
    defaultMessage: 'Manage',
  },
  archived: {
    id: 'app.containers.Admin.projects.all.components.archived',
    defaultMessage: 'Archived',
  },
  draft: {
    id: 'app.containers.Admin.projects.all.components.draft',
    defaultMessage: 'Draft',
  },
  deleteProjectConfirmation: {
    id: 'app.containers.Admin.projects.all.deleteProjectConfirmation',
    defaultMessage:
      'Are you sure you want to delete this project? This cannot be undone.',
  },
  deleteProjectError: {
    id: 'app.containers.Admin.projects.all.deleteProjectError',
    defaultMessage:
      'There was an error deleting this project, please try again later.',
  },
  deleteProjectButton: {
    id: 'app.containers.Admin.projects.all.deleteProjectButton',
    defaultMessage: 'Delete',
  },
  deleteFolderError: {
    id: 'app.containers.Admin.projects.all.deleteFolderError',
    defaultMessage:
      'There was an issue removing this folder. Please try again.',
  },
  deleteFolderConfirmation: {
    id: 'app.containers.Admin.projects.all.deleteFolderConfirmation',
    defaultMessage:
      'Are you sure you want to delete this folder and all the projects it contains?',
  },
  deleteFolderButton: {
    id: 'app.containers.Admin.projects.all.deleteFolderButton',
    defaultMessage: 'Delete',
  },
});
