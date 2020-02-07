import React, { Component } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { withRouter, WithRouterProps } from 'react-router';

// services
import { reorderProject, updateProjectFolderMembership } from 'services/projects';

// resources
import GetProjectFolder, { GetProjectFolderChildProps } from 'resources/GetProjectFolder';
import GetProject from 'resources/GetProject';
import GetProjectHolderOrderings, { GetProjectHolderOrderingsChildProps } from 'resources/GetProjectHolderOrderings';

// localisation
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// components
import { SortableList, SortableRow, List, Row } from 'components/admin/ResourceList';
import IconTooltip from 'components/UI/IconTooltip';
import { HeaderTitle } from '../../all/styles';
import ProjectRow from '../../components/ProjectRow';

// style
import styled from 'styled-components';

const Container = styled.div``;

const ListsContainer = styled.div``;

const ListHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-bottom: 25px;

  & ~ & {
    margin-top: 70px;
  }
`;

const Spacer = styled.div`
  flex: 1;
`;

interface DataProps {
  projectHoldersOrderings: GetProjectHolderOrderingsChildProps;
  projectFolder: GetProjectFolderChildProps;
}

interface Props extends DataProps { }

class AdminFoldersProjectsList extends Component<Props & WithRouterProps> {

  handleReorder = (projectId, newOrder) => {
    reorderProject(projectId, newOrder); // TODO
  }

  addProjectToFolder = (projectId) => () => {
    const projectFolderId = !isNilOrError(this.props.projectFolder) ? this.props.projectFolder.id : null;

    projectFolderId && updateProjectFolderMembership(projectId, projectFolderId);
  }

  removeProjectFromFolder = (projectId) => () => {
    const projectFolderId = !isNilOrError(this.props.projectFolder) ? this.props.projectFolder.id : undefined;
    updateProjectFolderMembership(projectId, null, projectFolderId);
  }

  render() {
    const { projectHoldersOrderings, projectFolder } = this.props;
    const projectIds = !isNilOrError(projectHoldersOrderings)
      ? projectHoldersOrderings.filter(item => item.relationships.project_holder.data.type === 'project').map(item => item.relationships.project_holder.data.id)
      : null;
    const inFolderProjectIds = !isNilOrError(projectFolder) && projectFolder.relationships.projects
      ? projectFolder.relationships.projects.data.map(projectRel => projectRel.id)
      : null;

    return (
      <Container>
        <ListsContainer>
          <ListHeader>
            <HeaderTitle>
              <FormattedMessage {...messages.inFolder} />
            </HeaderTitle>

            <Spacer />

          </ListHeader>

          {inFolderProjectIds && inFolderProjectIds.length > 0 ?
            <List key={`JUST_LIST${inFolderProjectIds.length}`}>
              {inFolderProjectIds.map((inFolderProjectId, index: number) => {
                return (
                  <GetProject projectId={inFolderProjectId} key={`in_${inFolderProjectId}`}>
                    {project => isNilOrError(project) ? null : (
                      <Row
                        id={inFolderProjectId}
                        lastItem={(index === inFolderProjectIds.length - 1)}
                      >
                        <ProjectRow
                          project={project}
                          actions={[{
                            buttonContent: <FormattedMessage {...messages.removeFromFolder} />,
                            handler: this.removeProjectFromFolder,
                            icon: 'remove'
                          }, 'manage']}
                        />
                      </Row>
                    )}
                  </GetProject>
                );
              })}
            </List>
            :
            <FormattedMessage {...messages.emptyFolder} />
          }

          {projectIds && projectIds.length > 0 &&
            <>
              <ListHeader>
                <HeaderTitle>
                  <FormattedMessage {...messages.otherProjects} />
                </HeaderTitle>
                <IconTooltip content={<FormattedMessage {...messages.otherProjectsTooltip} />} />
              </ListHeader>
              <List key={`JUST_LIST${projectIds.length}`}>
                {projectIds.map((projectId, index: number) => {
                  return (
                    <GetProject projectId={projectId} key={`out_${projectId}`}>
                      {project => isNilOrError(project) ? null : (
                        <Row
                          id={projectId}
                          lastItem={(index === projectIds.length - 1)}
                        >
                          <ProjectRow
                            project={project}
                            actions={[{
                              buttonContent: <FormattedMessage {...messages.addToFolder} />,
                              handler: this.addProjectToFolder,
                              icon: 'plus-circle'
                            }]}
                          />
                        </Row>
                      )}
                    </GetProject>
                  );
                })}
              </List>
            </>
          }
        </ListsContainer>
      </Container>
    );
  }
}

const AdminFoldersProjectsListWithHocs = withRouter(AdminFoldersProjectsList);

const Data = adopt<DataProps, WithRouterProps>({
  projectFolder: ({ params, render }) => <GetProjectFolder projectFolderId={params.projectFolderId}>{render}</GetProjectFolder>,
  projectHoldersOrderings: <GetProjectHolderOrderings />,
});

export default (inputProps: WithRouterProps) => (
  <Data {...inputProps}>
    {dataProps => <AdminFoldersProjectsListWithHocs {...inputProps} {...dataProps} />}
  </Data>
);
