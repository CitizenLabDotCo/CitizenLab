/*
 * AdminUser.DashboardUser Messages
 *
 * This contains all the text for the AdminUser.DashboardUser component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  headerIndex: {
    id: 'app.containers.AdminUser.Users.Views.all.headerIndex',
    defaultMessage: 'Users',
  },
  exportUsers: {
    id: 'app.containers.AdminUser.Users.Views.all.exportUsers',
    defaultMessage: 'Export all users',
  },
  deleteButton: {
    id: 'app.containers.AdminUser.Users.Views.all.deleteButton',
    defaultMessage: 'Delete',
  },
  updateButton: {
    id: 'app.containers.AdminUser.Users.Views.all.updateButton',
    defaultMessage: 'Edit',
  },
  createButton: {
    id: 'app.containers.AdminUser.Users.Views.all.createButton',
    defaultMessage: 'New User',
  },
  publishButton: {
    id: 'app.containers.AdminUser.Users.Views.form.publishButton',
    defaultMessage: 'Publish User',
  },

  userLoadingMessage: {
    id: 'app.containers.AdminUser.Users.Views.edit.userLoadingMessage',
    defaultMessage: 'Loading User...',
  },
  userLoadingError: {
    id: 'app.containers.AdminUser.Users.Views.edit.userLoadingError',
    defaultMessage: 'User not found!',
  },
  name: {
    id: 'app.containers.Admin.User.name',
    defaultMessage: 'Name',
  },
  email: {
    id: 'app.containers.Admin.User.email',
    defaultMessage: 'Email',
  },
  member: {
    id: 'app.containers.Admin.User.member',
    defaultMessage: 'Member Since',
  },
  admin: {
    id: 'app.containers.Admin.User.admin',
    defaultMessage: 'Admin',
  },
  delete: {
    id: 'app.containers.Admin.User.delete',
    defaultMessage: 'Delete',
  },
});
