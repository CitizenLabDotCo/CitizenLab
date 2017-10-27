// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business

import dashboardRoutes from './dashboard/routes';
import ideasRoutes from './ideas/routes';
import usersRoutes from './users/routes';
import pagesRoutes from './pages/routes';
import areasRoutes from './areas/routes';
import projectsRoutes from './projects/routes';
import settingsRoutes from './settings/routes';

const errorLoading = (err) => {
  console.error('Dynamic page loading failed', err); // eslint-disable-line no-console
};

const loadModule = (cb) => (componentModule) => {
  cb(null, componentModule.default);
};

export default (injectReducer) => ({
  path: '/admin',
  name: 'Admin page',
  getComponent(nextState, cb) {
    const importModules = Promise.all([
      import('containers/Admin'),
    ]);

    const renderRoute = loadModule(cb);

    importModules.then(([component]) => {
      renderRoute(component);
    });

    importModules.catch(errorLoading);
  },
  indexRoute: dashboardRoutes(injectReducer),
  childRoutes: [
    ideasRoutes(injectReducer),
    usersRoutes(injectReducer),
    projectsRoutes(injectReducer),
    areasRoutes(injectReducer),
    pagesRoutes(injectReducer),
    settingsRoutes(),
  ],
});
