import {
  defineMessages
} from 'react-intl';

export default defineMessages({
  overviewPageTitle: {
    id: 'app.containers.AdminPage.ProjectDashboard.overviewPageTitle',
    defaultMessage: 'Projects',
  },
  overviewPageSubtitle: {
    id: 'app.containers.AdminPage.ProjectDashboard.overviewPageSubtitle',
    defaultMessage: 'Create as many projects as you want and edit them at any time. Drag and drop them to change the order in which you want to see them on your homepage.',
  },
  addNewProject: {
    id: 'app.containers.AdminPage.ProjectEdit.addNewProject',
    defaultMessage: 'Add a project',
  },
  xGroupsHaveAccess: {
    id: 'app.containers.AdminPage.ProjectEdit.xGroupsHaveAccess',
    defaultMessage: '{groupCount, plural, no {# groups can view} one {# group can view} other {# groups can view}}',
  },
  onlyAdminsCanView: {
    id: 'app.containers.AdminPage.ProjectEdit.onlyAdminsCanView',
    defaultMessage: 'Only admins can view',
  },
  editButtonLabel: {
    id: 'app.containers.AdminPage.ProjectEdit.editButtonLabel',
    defaultMessage: 'Edit',
  },
  published: {
    id: 'app.containers.AdminPage.ProjectEdit.published',
    defaultMessage: 'Published',
  },
  publishedTooltip: {
    id: 'app.containers.AdminPage.ProjectDashboard.publishedTooltip',
    defaultMessage: 'Published projects are currently active project which are shown on the platform.',
  },
  draft: {
    id: 'app.containers.AdminPage.ProjectEdit.draft',
    defaultMessage: 'Draft',
  },
  draftTooltip: {
    id: 'app.containers.AdminPage.ProjectDashboard.draftTooltip',
    defaultMessage: 'Draft projects are not shown on the platform. You can work on them with other admin and project moderators, until they are ready to be published.',
  },
  archived: {
  id: 'app.containers.AdminPage.ProjectEdit.archived',
    defaultMessage: 'Archived',
  },
  archivedTooltip: {
    id: 'app.containers.AdminPage.ProjectDashboard.archivedTooltip',
    defaultMessage: 'Archived projects are over but still shown on the platform. It is clearly indicated to users that they are archived and participation is no longer possible.',
  },
});
