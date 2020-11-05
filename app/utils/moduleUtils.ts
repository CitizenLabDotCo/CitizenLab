import {
  LoadableLoadingAdmin,
  LoadableLoadingCitizen,
} from 'components/UI/LoadableLoading';

import { createElement } from 'react';

import Loadable from 'react-loadable';

export const RouteTypes = {
  CITIZEN: 'citizen',
  ADMIN: 'admin',
};

const convertConfigurationToRoute = ({
  path,
  name,
  container: loader,
  type = RouteTypes.CITIZEN,
  indexRoute,
  childRoutes,
}) => ({
  path,
  name,
  component: Loadable({
    loader,
    loading:
      type === RouteTypes.ADMIN ? LoadableLoadingAdmin : LoadableLoadingCitizen,
    delay: 500,
  }),
  indexRoute: indexRoute
    ? convertConfigurationToRoute({ ...indexRoute, type })
    : undefined,
  childRoutes:
    childRoutes && childRoutes.length > 0
      ? childRoutes.map((childRoute) =>
          convertConfigurationToRoute({ ...childRoute, type })
        )
      : undefined,
});

export const parseModuleRoutes = (routes, type = RouteTypes.CITIZEN) =>
  routes.map((route) => convertConfigurationToRoute({ ...route, type }));

export const parseOutlets = (outlets = {}) =>
  Object.entries(outlets).reduce(
    (acc, [id, definitions]: [string, any]) => ({
      ...acc,
      [id]: definitions.map((definition) => createElement(definition)),
    }),
    {}
  );
// routes.map((route) => convertConfigurationToRoute({ ...route, type }));

export const loadModules = (modules, outlets) => {
  const enabledModuleConfigurations = modules
    .filter((module) => module.enabled)
    .map((module) => module.configuration);

  const mergedRoutes = enabledModuleConfigurations.reduce(
    (mergedConfiguration, configuration) => {
      return {
        citizen: [
          ...mergedConfiguration.citizen,
          ...configuration.routes.citizen,
        ],
        admin: [...mergedConfiguration.admin, ...configuration.routes.admin],
      };
    },
    {
      citizen: [],
      admin: [],
    }
  );

  return {
    routes: mergedRoutes,
    outlets,
  };
};
