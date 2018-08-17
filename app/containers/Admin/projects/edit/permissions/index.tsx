import React, { PureComponent } from 'react';
import { Subscription } from 'rxjs';
import { switchMap, tap, map as rxMap } from 'rxjs/operators';
import { map, isEmpty, isEqual, difference } from 'lodash';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// components
import Radio from 'components/UI/Radio';
import ProjectGroupsList from './ProjectGroupsList';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import { Section, SectionTitle, SectionField } from 'components/admin/Section';
import Moderators from './Moderators';

// services
import { projectByIdStream, updateProject, IProject } from 'services/projects';
import { groupsProjectsByProjectIdStream, addGroupProject, deleteGroupProject, IGroupsProjects } from 'services/groupsProjects';
import GetModerators from 'resources/GetModerators';

// style
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

const StyledSection = styled(Section)`
  margin-bottom: 110px;
`;

const RadioButtonsWrapper = styled.div`
  margin-top: 15px;
  margin-bottom: 30px;
`;

const StyledRadio = styled(Radio)`
  margin-bottom: 10px;
  cursor: pointer;

  .text {
    font-size: ${fontSizes.base}px;
    font-weight: 400;
    line-height: 22px;
  }
`;

type Props  = {
  params: {
    projectId: string | null
  };
};

type State  = {
  project: IProject | null;
  oldGroupsProjects: IGroupsProjects | null;
  newGroupsProjects: IGroupsProjects | null;
  savedVisibleTo: 'public' | 'admins' | 'groups';
  unsavedVisibleTo: 'public' | 'admins' | 'groups';
  loading: boolean;
  saving: boolean;
  status: 'disabled' | 'enabled' | 'error' | 'success';
};

class ProjectPermissions extends PureComponent<Props & InjectedIntlProps, State> {
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      project: null,
      oldGroupsProjects: null,
      newGroupsProjects: null,
      savedVisibleTo: 'public',
      unsavedVisibleTo: 'public',
      loading: true,
      saving: false,
      status: 'disabled'
    };
    this.subscriptions = [];
  }

  componentDidMount() {
    if (this.props.params.projectId) {
      const projectId = this.props.params.projectId;
      const project$ = projectByIdStream(projectId).observable.pipe(tap((project) => {
        this.setState({
          savedVisibleTo: project.data.attributes.visible_to,
          unsavedVisibleTo: project.data.attributes.visible_to
        });
      }));

      this.subscriptions = [
        project$.pipe(switchMap((project) => {
          return groupsProjectsByProjectIdStream(project.data.id).observable.pipe(rxMap((groupsProjects) => ({
            project,
            groupsProjects
          })));
        })).subscribe(({ project, groupsProjects }) => {
          this.setState((state) => {
            const oldGroupsProjects = (state.loading ? groupsProjects : state.oldGroupsProjects);
            const newGroupsProjects = groupsProjects;
            const status = (state.unsavedVisibleTo === 'groups' && !isEqual(newGroupsProjects, oldGroupsProjects) ? 'enabled' : state.status);
            const loading = false;

            return {
              project,
              oldGroupsProjects,
              newGroupsProjects,
              status,
              loading
            };
          });
        })
      ];
    }
  }

  componentWillUnmount() {
    const { project, unsavedVisibleTo, oldGroupsProjects, newGroupsProjects } = this.state;
    const oldGroupsProjectIds = (oldGroupsProjects ? map(oldGroupsProjects.data, groupsProject => groupsProject.id) : []);
    const newGroupsProjectsIds = (newGroupsProjects ? map(newGroupsProjects.data, groupsProject => groupsProject.id) : []);

    this.subscriptions.forEach(subscription => subscription.unsubscribe());

    if (project && unsavedVisibleTo === 'groups' && !isEqual(oldGroupsProjectIds, newGroupsProjectsIds)) {
      const groupsProjectIdsToRemove = difference(newGroupsProjectsIds, oldGroupsProjectIds);
      const groupsProjectIdsToAdd = difference(oldGroupsProjectIds, newGroupsProjectsIds);

      Promise.all<any>([
        ...groupsProjectIdsToRemove.map(groupsProjectId => deleteGroupProject(groupsProjectId)),
        ...groupsProjectIdsToAdd.map(groupsProjectId => addGroupProject(project.data.id, groupsProjectId))
      ]);
    }
  }

  saveChanges = async () => {
    const { project, newGroupsProjects, savedVisibleTo, unsavedVisibleTo } = this.state;

    if (project && savedVisibleTo && unsavedVisibleTo) {
      let promises: Promise<any>[] = [];

      if (unsavedVisibleTo !== savedVisibleTo) {
        promises = [updateProject(project.data.id, { visible_to: unsavedVisibleTo })];
      }

      if (unsavedVisibleTo !== 'groups' && newGroupsProjects !== null && !isEmpty(newGroupsProjects.data)) {
        promises = [
          ...promises,
          ...newGroupsProjects.data.map(groupsProject => deleteGroupProject(groupsProject.id))
        ];
      }

      if (unsavedVisibleTo === 'groups') {
        this.setState({ oldGroupsProjects: newGroupsProjects });
      }

      try {
        this.setState({ saving: true });
        await Promise.all(promises);
        this.setState({ saving: false, status: 'success' });
      } catch (error) {
        this.setState({ saving: false, status: 'error' });
      }
    }
  }

  handlePermissionTypeChange = (unsavedVisibleTo: 'public' | 'groups' | 'admins') => {
    this.setState((state) => ({
      unsavedVisibleTo,
      status: (unsavedVisibleTo === 'groups' && (state.newGroupsProjects === null || isEmpty(state.newGroupsProjects.data))) ? 'disabled' : 'enabled'
    }));
  }

  handleGroupsAdded = () => {
    this.saveChanges();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { project, unsavedVisibleTo, loading, saving, status } = this.state;

    if (!loading && unsavedVisibleTo) {
      return (
        <>
          <StyledSection>
            <SectionField>
              <SectionTitle>
                <FormattedMessage {...messages.permissionTypeLabel} />
              </SectionTitle>

              <RadioButtonsWrapper>
                <StyledRadio
                  onChange={this.handlePermissionTypeChange}
                  currentValue={unsavedVisibleTo}
                  name="permissionsType"
                  label={formatMessage(messages.permissionsEveryoneLabel)}
                  value="public"
                  id="permissions-all"
                />
                <StyledRadio
                  onChange={this.handlePermissionTypeChange}
                  currentValue={unsavedVisibleTo}
                  name="permissionsType"
                  label={formatMessage(messages.permissionsAdministrators)}
                  value="admins"
                  id="permissions-administrators"
                />
                <StyledRadio
                  onChange={this.handlePermissionTypeChange}
                  currentValue={unsavedVisibleTo}
                  name="permissionsType"
                  label={formatMessage(messages.permissionsSelectionLabel)}
                  value="groups"
                  id="permissions-selection"
                />
              </RadioButtonsWrapper>
            </SectionField>

            {unsavedVisibleTo === 'groups' && project &&
              <ProjectGroupsList projectId={project.data.id} onAddButtonClicked={this.handleGroupsAdded} />
            }

            {unsavedVisibleTo !== 'groups' &&
              <SubmitWrapper
                loading={saving}
                status={status}
                onClick={this.saveChanges}
                messages={{
                  buttonSave: messages.save,
                  buttonSuccess: messages.saveSuccess,
                  messageError: messages.saveErrorMessage,
                  messageSuccess: messages.saveSuccessMessage,
                }}
              />
            }
          </StyledSection>

          <Section>
            {project &&
              <GetModerators projectId={project.data.id}>
                {moderators => <Moderators moderators={moderators} projectId={project.data.id} />}
              </GetModerators>
            }
          </Section>
        </>
      );
    }

    return null;
  }
}

export default injectIntl<Props>(ProjectPermissions);
