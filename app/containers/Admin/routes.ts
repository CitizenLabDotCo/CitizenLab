// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import dashboardRoutes from './dashboard/routes';
import ideasRoutes from './ideas/routes';
import usersRoutes from './users/routes';
import invitationsRoutes from './invitations/routes';
import projectsRoutes from './projects/routes';
import settingsRoutes from './settings/routes';
import settingsAreasRoutes from './settings/areas/routes';
import customFieldRoutes from './settings/registration/CustomFields/routes';
import pagesRoutes from './pages/routes';
import emailsRoutes from './emails/routes';

import { hasPermission } from 'services/permissions';
import { removeLocale } from 'utils/cl-router/updateLocationDescriptor';

import Loadable from 'react-loadable';
import Spinner from 'components/UI/Spinner';

const isUserAuthorized = (nextState, replace) => {
  const pathNameWithLocale = nextState.location.pathname;
  const { pathname, urlLocale } = removeLocale(pathNameWithLocale);
  hasPermission({
    item: { type: 'route', path: pathname },
    action: 'access'
  }).subscribe(accessAthorized => {
    if (!accessAthorized) {
      replace(`${urlLocale && `/${urlLocale}`}/sign-in/`);
    }
  });
};

export default () => ({
  path: 'admin',
  name: 'Admin page',
  component: Loadable({
    loader: () => import('containers/Admin'),
    loading: Spinner
  }),
  onEnter: isUserAuthorized,
  indexRoute: {
    component: Loadable({
      loader: () => import('containers/Admin/guide'),
      loading: Spinner
    }),
  },
  childRoutes: [
    dashboardRoutes(),
    ideasRoutes(),
    usersRoutes(),
    projectsRoutes(),
    {
      path: 'settings/registration/custom_fields',
      ...(customFieldRoutes()),
    },
    settingsRoutes(),
    settingsAreasRoutes(),
    pagesRoutes(),
    invitationsRoutes(),
    emailsRoutes(),
    {
      path: 'favicon',
      component: Loadable({
        loader: () => import('containers/Admin/favicon'),
        loading: Spinner
      }),
    },
    {
      path: 'dashboard/insights/:clusteringId',
      component: Loadable({
        loader: () => import('./dashboard/clusterings/Show'),
        loading: Spinner
      }),
    },
  ],
});
