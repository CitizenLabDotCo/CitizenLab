const configuration = {
  routes: {
    citizen: [
      {
        path: 'folders/:slug',
        name: 'Project folder page',
        container: () => import('./containers/citizen/ProjectFolderShowPage'),
      },
    ],
    admin: [
      {
        path: 'projects/folders/new',
        name: 'admin projects single project',
        container: () => import('./containers/admin/settings'),
      },
      {
        path: 'projects/folders/:projectFolderId',
        name: 'admin projects edit folder',
        container: () => import('./containers/admin'),
        indexRoute: {
          name: 'admin projects edit folder projects',
          container: () => import('./containers/admin/projects'),
        },
        childRoutes: [
          {
            path: 'settings',
            name: 'admin projects edit folder settings',
            container: () => import('./containers/admin/settings'),
          },
        ],
      },
    ],
  },
};

export default configuration;
