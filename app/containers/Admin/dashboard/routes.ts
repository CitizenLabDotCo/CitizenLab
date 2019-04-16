import clusteringsRoutes from './clusterings/routes';

import Loadable from 'react-loadable';
import { LoadableLoadingAdmin } from 'components/UI/LoadableLoading';

export default () => ({
  name: 'Admin dashboard',
  path: 'dashboard',
  component: Loadable({
    loader: () => import('./'),
    loading: LoadableLoadingAdmin,
    delay: 500
  }),
  indexRoute: {
    component: Loadable({
      loader: () => import('./summary'),
      loading: () => null
    }),
  },
  childRoutes: [
    {
      path: 'users',
      component: Loadable({
        loader: () => import('./users'),
        loading: () => null
      }),
    },
    clusteringsRoutes(),
    {
      path: 'map',
      component: Loadable({
        loader: () => import('./map'),
        loading: () => null
      }),
    }
  ],
});
