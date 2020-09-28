import Loadable from 'react-loadable';
import { LoadableLoadingAdmin } from 'components/UI/LoadableLoading';

export default () => ({
  name: 'Admin initiatives',
  path: 'initiatives',
  component: Loadable({
    loader: () => import('./'),
    loading: LoadableLoadingAdmin,
    delay: 500,
  }),
  indexRoute: {
    component: Loadable({
      loader: () => import('./settings'),
      loading: () => null,
    }),
  },
  childRoutes: [
    {
      path: 'manage',
      component: Loadable({
        loader: () => import('./manage'),
        loading: () => null,
      }),
    },
    {
      path: 'permissions',
      component: Loadable({
        loader: () => import('./permissions'),
        loading: () => null,
      }),
    },
  ],
});
