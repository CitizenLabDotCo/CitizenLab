// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (injectReducer) => ({
  path: '/admin/projects',
  name: 'admin projects',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import('resources/projects/reducer'),
      import('containers/Admin/projects'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([reducer, component]) => {
      injectReducer('adminProjects', reducer.default);
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
  indexRoute: {
    name: 'admin projects index',
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/Admin/projects/views/all'),
      ]);

      const renderRoute = loadModule(cb);

      importModules.then(([component]) => {
        renderRoute(component);
      });

      importModules.catch(errorLoading);
    },
  },
  childRoutes: [
    {
      path: '/admin/projects/create',
      name: 'admin projects create',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Admin/projects/views/create'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },
    {
      path: '/admin/projects/:slug/edit',
      name: 'adming projects edit',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Admin/projects/views/edit'),
        ]);

        const renderRoute = loadModule(cb);

        importModules.then(([component]) => {
          renderRoute(component);
        });

        importModules.catch(errorLoading);
      },
    },

  ],
});
