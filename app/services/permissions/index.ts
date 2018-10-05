import { TPermissionItem, hasPermission } from 'services/permissions/permissions';
import './rules/routePermissions';
import './rules/ideaPermissions';
import './rules/commentPermissions';
import './rules/projectPermissions';
import './rules/campaignPermissions';

export {
  TPermissionItem,
  hasPermission
};
