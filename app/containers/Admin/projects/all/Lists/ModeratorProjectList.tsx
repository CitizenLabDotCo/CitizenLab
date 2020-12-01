import React, { memo } from 'react';
import { adopt } from 'react-adopt';

// utils
import { isNilOrError } from 'utils/helperUtils';

// resources
import { PublicationStatus } from 'resources/GetProjects';
import GetAdminPublications, {
  GetAdminPublicationsChildProps,
} from 'resources/GetAdminPublications';
import GetFeatureFlag from 'resources/GetFeatureFlag';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// components
import { List, Row } from 'components/admin/ResourceList';
import ProjectRow from '../../components/ProjectRow';
import { ListHeader, HeaderTitle } from '../StyledComponents';
import Outlet from 'components/Outlet';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

interface DataProps {
  AdminPublications: GetAdminPublicationsChildProps;
  isProjectFoldersEnabled: boolean;
}

interface Props extends DataProps {}

const ModeratorProjectList = memo<Props>(
  ({ AdminPublications, isProjectFoldersEnabled }) => {
    const adminPublicationCard = (adminPublication) => {
      if (adminPublication.publicationType === 'project') {
        return <ProjectRow publication={adminPublication} />;
      } else if (
        adminPublication.publicationType === 'folder' &&
        isProjectFoldersEnabled
      ) {
        return (
          <Outlet
            id="app.containers.AdminPage.projects.all.projectsAndFolders.row"
            publication={adminPublication}
          />
        );
      }

      return null;
    };

    if (
      !isNilOrError(AdminPublications) &&
      AdminPublications.list &&
      AdminPublications.list.length > 0
    ) {
      const AdminPublicationsList = AdminPublications.list;

      if (AdminPublicationsList && AdminPublicationsList.length > 0) {
        return (
          <>
            <ListHeader>
              <HeaderTitle>
                <FormattedMessage {...messages.existingProjects} />
              </HeaderTitle>
            </ListHeader>

            <List>
              {AdminPublicationsList.map((adminPublication, index) => {
                return (
                  <Row
                    key={index}
                    id={adminPublication.id}
                    isLastItem={index === AdminPublicationsList.length - 1}
                  >
                    {adminPublicationCard(adminPublication)}
                  </Row>
                );
              })}
            </List>
          </>
        );
      }
    }

    return null;
  }
);

const publicationStatuses: PublicationStatus[] = [
  'published',
  'draft',
  'archived',
];

const Data = adopt<DataProps>({
  AdminPublications: (
    <GetAdminPublications
      publicationStatusFilter={publicationStatuses}
      folderId={null}
    />
  ),
  isProjectFoldersEnabled: <GetFeatureFlag name="project_folders" />,
});

export default () => (
  <Data>{(dataProps) => <ModeratorProjectList {...dataProps} />}</Data>
);
