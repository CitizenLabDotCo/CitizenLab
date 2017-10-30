const errorLoading = (err) => {
  console.error('Dynamic settings loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default () => ({
  path: '/admin/settings',
  name: 'admin settings',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import('containers/Admin/settings'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
  indexRoute: {
    getComponent(nextState, cb) {
      const importModules = Promise.all([
        import('containers/Admin/settings/general'),
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
      path: 'customize',
      getComponent(nextState, cb) {
        const importModules = Promise.all([
          import('containers/Admin/settings/customize'),
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
