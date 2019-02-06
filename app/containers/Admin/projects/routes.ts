import Loadable from 'react-loadable';
import Spinner from 'components/UI/Spinner';

export default () => ({
  path: 'projects',
  name: 'admin projects',
  component: Loadable({
    loader: () => import('containers/Admin/projects'),
    loading: Spinner
  }),
  indexRoute: {
    name: 'admin projects index',
    component: Loadable({
      loader: () => import('containers/Admin/projects/all'),
      loading: Spinner
    }),
  },
  childRoutes: [
    {
      path: ':projectId/edit',
      name: 'admin projects single project',
      component: Loadable({
        loader: () => import('containers/Admin/projects/edit'),
        loading: Spinner
      }),
      indexRoute: {
        name: 'admin projects single edit',
        component: Loadable({
          loader: () => import('containers/Admin/projects/edit/general'),
          loading: Spinner
        }),
      },
      childRoutes: [
        {
          path: '/:locale/admin/projects/:projectId/description',
          name: 'admin projects description',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/description'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/ideas',
          name: 'admin projects ideas manager',
          component: Loadable({
            loader: () => import('components/admin/IdeaManager'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/timeline',
          name: 'admin projects timeline',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/timeline'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/timeline/new',
          name: 'admin projects timeline create',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/timeline/edit'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/timeline/:id',
          name: 'admin projects timeline edit',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/timeline/edit'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/events',
          name: 'admin projects events',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/events'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/events/new',
          name: 'admin projects events create',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/events/edit'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/events/:id',
          name: 'admin projects events edit',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/events/edit'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/new',
          name: 'admin projects create new',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/general'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/events',
          name: 'admin projects edit events',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/events'),
            loading: Spinner
          }),
        },
        {
          path: '/:locale/admin/projects/:projectId/permissions',
          name: 'admin projects edit permissions',
          component: Loadable({
            loader: () => import('containers/Admin/projects/edit/permissions'),
            loading: Spinner
          }),
        },
      ],
    },
  ],
});
