import { IProjectFolderData } from './../services/projectFolders';
import {
  definePermissionRule,
  IRouteItem,
} from 'services/permissions/permissions';
import { isProjectFolderModerator } from './roles';
import { isAdmin } from 'services/permissions/roles';
import {
  canAccessRoute,
  isAdminRoute,
  MODERATOR_ROUTES,
} from 'services/permissions/rules/routePermissions';
import { IUser } from 'services/users';
import { ITenantData } from 'services/tenant';

export const canModerate = (user: IUser, folder: IProjectFolderData) =>
  isAdmin(user) || isProjectFolderModerator(user, folder.id);

const canAccessRouteExtended = (
  item: IRouteItem,
  user: IUser | null,
  tenant: ITenantData
) => {
  return (
    canAccessRoute(item, user, tenant) ||
    (isAdminRoute(item) &&
      isProjectFolderModerator(user) &&
      MODERATOR_ROUTES.includes(item.path))
  );
};

definePermissionRule('route', 'access', canAccessRouteExtended);

definePermissionRule(
  'project_folder',
  'create',
  (_folder: IProjectFolderData, user: IUser) => {
    return isAdmin(user);
  }
);

definePermissionRule(
  'project_folder',
  'delete',
  (_folder: IProjectFolderData, user: IUser) => {
    return isAdmin(user);
  }
);

definePermissionRule(
  'project_folder',
  'reorder',
  (_folder: IProjectFolderData, user: IUser) => {
    return isAdmin(user);
  }
);

definePermissionRule(
  'project_folder',
  'moderate',
  (_folder: IProjectFolderData, user: IUser) => {
    return canModerate(user, _folder);
  }
);
