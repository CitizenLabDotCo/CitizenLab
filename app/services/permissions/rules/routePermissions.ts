import { definePermissionRule, IRouteItem } from 'services/permissions/permissions';
import { isAdmin, isModerator, isProjectModerator } from '../roles';
import { IUser } from 'services/users';

definePermissionRule('route', 'access', (item: IRouteItem, user: IUser | null) => {
  if (/^\/admin/.test(item.path)) {
    if (isAdmin(user)) return true;
    if (isModerator(user) && (
      item.path === '/admin/projects' ||
      item.path === '/admin/dashboard' ||
      item.path === '/admin/emails'
    )) return true;

    // Try to find a project ID in the URL
    const idRegexp = /^\/admin\/projects\/([a-z0-9-]+)\//;
    const matches = idRegexp.exec(item.path);
    const pathProjectId = matches && matches[1];
    if (pathProjectId && isProjectModerator(user, pathProjectId)) return true;

    return false;
  } else {
    return true;
  }
});
