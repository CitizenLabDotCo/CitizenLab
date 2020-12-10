import React from 'react';
import { ModuleConfiguration } from 'utils/moduleUtils';
import { isNilOrError } from 'utils/helperUtils';

import NewProjectFolderButton from './admin/components/NewProjectFolderButton';
import ProjectFolderRow from './admin/components/ProjectFolderRow';
import ProjectFolderTitle from './admin/components/ProjectFolderTitle';
import ProjectFolderSelect from './admin/components/ProjectFolderSelect';

import ProjectFolderCard from './citizen/components/ProjectFolderCard';
import ProjectFolderSiteMap from './citizen/components/ProjectFolderSiteMap';

import ProjectsListItem from 'containers/Navbar/components/ProjectsListItem';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

import { isProjectFolderModerator } from './permissions/roles';
import { isAdmin } from 'services/permissions/roles';
import useFeatureFlag from 'hooks/useFeatureFlag';


const RenderOnPublicationType = ({ publication, children }) => {
  if (publication.publicationType !== 'folder') return null;
  return <>{children}</>;
};

const RenderOnFeatureFlag = ({ children }) => {
  const isProjectFoldersEnabled = useFeatureFlag('project_folders');
  if (isProjectFoldersEnabled) {
    return <>{children}</>;
  }
  return null;
};

const RenderOnProjectFolderModerator = ({ children }) => (
  <GetAuthUser>
    {(authUser: GetAuthUserChildProps) =>
      !isNilOrError(authUser) && isProjectFolderModerator({ data: authUser })
        ? children
        : null
    }
  </GetAuthUser>
);

const RenderOnProjectFolderModeratorOrAdmin = ({ children }) => (
  <GetAuthUser>
    {(authUser: GetAuthUserChildProps) =>
      !isNilOrError(authUser) &&
      (isProjectFolderModerator({ data: authUser }) ||
        isAdmin({ data: authUser }))
        ? children
        : null
    }
  </GetAuthUser>
);

const configuration: ModuleConfiguration = {
  outlets: {
    'app.containers.Navbar.projectlist.item': (props) => {
      const { localize, publication } = props;
      return (
        <RenderOnPublicationType publication={publication}>
          <ProjectsListItem
            to={`/folders/${publication.attributes.publication_slug}`}
            {...props}
          >
            {localize(publication.attributes.publication_title_multiloc)}
          </ProjectsListItem>
        </RenderOnPublicationType>
      );
    },
    'app.containers.AdminPage.projects.all.projectsAndFolders.title': () => (
      <RenderOnFeatureFlag>
        <ProjectFolderTitle />
      </RenderOnFeatureFlag>
    ),
    'app.containers.AdminPage.projects.all.projectsAndFolders.actions': () => (
      <RenderOnFeatureFlag>
        <NewProjectFolderButton />
      </RenderOnFeatureFlag>
    ),
    'app.containers.AdminPage.projects.all.projectsAndFolders.row': (props) => (
      <RenderOnPublicationType publication={props.publication}>
        <ProjectFolderRow {...props} />
      </RenderOnPublicationType>
    ),
    'app.components.ProjectAndFolderCards.card': (props) => (
      <RenderOnPublicationType publication={props.publication}>
        <ProjectFolderCard {...props} />
      </RenderOnPublicationType>
    ),
    'app.containers.SiteMap.ProjectsSection.listitem': (props) => (
      <RenderOnPublicationType publication={props.adminPublication}>
        <ProjectFolderSiteMap {...props} />
      </RenderOnPublicationType>
    ),
    'app.components.AdminPage.projects.form.projectsAndFolders.folderSelect': (
      props
    ) => (
      <RenderOnFeatureFlag>
        <ProjectFolderSelect {...props} />
      </RenderOnFeatureFlag>
    ),
    'app.containers.permissions.projectFolderModeratorOnly': ({ children }) => (
      <RenderOnFeatureFlag>
        <RenderOnProjectFolderModerator>
          {children}
        </RenderOnProjectFolderModerator>
      </RenderOnFeatureFlag>
    ),
    'app.containers.permissions.projectFolderModeratorOrAdminOnly': ({
      children,
    }) => (
      <RenderOnFeatureFlag>
        <RenderOnProjectFolderModeratorOrAdmin>
          {children}
        </RenderOnProjectFolderModeratorOrAdmin>
      </RenderOnFeatureFlag>
    ),
  },
  routes: {
    citizen: [
      {
        path: 'folders/:slug',
        name: 'Project folder page',
        container: () => import('./citizen/containers/ProjectFolderShowPage'),
      },
    ],
    admin: [
      {
        path: 'projects/folders/new',
        name: 'admin projects single project',
        container: () => import('./admin/containers/settings'),
      },
      {
        path: 'projects/folders/:projectFolderId',
        name: 'admin projects edit folder',
        container: () => import('./admin/containers'),
        indexRoute: {
          name: 'admin projects edit folder projects',
          container: () => import('./admin/containers/projects'),
        },
        childRoutes: [
          {
            path: 'settings',
            name: 'admin projects edit folder settings',
            container: () => import('./admin/containers/settings'),
          },
          {
            path: 'permissions',
            name: 'admin projects edit folder permissions',
            container: () => import('./admin/containers/permissions'),
          },
        ],
      },
    ],
  },
};

export default configuration;
