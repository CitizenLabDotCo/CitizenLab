import Loadable from 'react-loadable';

export default () => ({
  path: 'topics',
  name: 'admin topics',
  // component: Loadable({
  //   loader: () => import('../'),
  //   loading: () => null
  // }),
  indexRoute: {
    name: 'admin topics index',
    component: Loadable({
      loader: () => import('./all'),
      loading: () => null
    }),
  },
  childRoutes: [
    {
      path: 'new',
      name: 'admin topics new',
      component: Loadable({
        loader: () => import('./New'),
        loading: () => null
      }),
    },
    {
      path: ':topicId',
      name: 'admin topic edit',
      component: Loadable({
        loader: () => import('./Edit'),
        loading: () => null
      }),
    },
  ],
});
