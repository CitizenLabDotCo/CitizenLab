import React, { useState } from 'react';
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';
import { map, isEmpty, isEqual, difference } from 'lodash-es';

// components
import {
  Section,
  SubSectionTitle,
  SectionField,
} from 'components/admin/Section';
import { Radio } from 'cl2-component-library';
import SubmitWrapper from 'components/admin/SubmitWrapper';
import ProjectGroupsList from '../components/ProjectGroupsList';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// services
import { updateProject } from 'services/projects';
import {
  groupsProjectsByProjectIdStream,
  addGroupProject,
  deleteGroupProject,
  IGroupsProjects,
} from 'services/groupsProjects';

const ViewingRightsSection = styled(Section)`
  margin-bottom: 30px;
`;

const StyledSectionField = styled(SectionField)`
  margin-bottom: 5px;
`;

const RadioButtonsWrapper = styled.fieldset`
  border: none;
  padding: 0;
  margin-bottom: 10px;
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

interface Props {
  projectId: string;
}

const ProjectVisibility = ({
  projectId,
  intl: { formatMessage },
}: Props & InjectedIntlProps) => {
  const [unsavedVisibleTo, setUnsavedVisibleTo] = useState<
    'public' | 'admins' | 'groups'
  >('public');
  const [savedVisibleTo, setSavedVisibleTo] = useState<
    'public' | 'admins' | 'groups'
  >('public');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<
    'disabled' | 'enabled' | 'error' | 'success'
  >('disabled');
  const [
    newGroupsProjects,
    setNewGroupProjects,
  ] = useState<IGroupsProjects | null>(null);
  const [
    oldGroupsProjects,
    setOldGroupProjects,
  ] = useState<IGroupsProjects | null>(null);

  const handlePermissionTypeChange = (
    unsavedVisibleTo: 'public' | 'groups' | 'admins'
  ) => {
    setUnsavedVisibleTo(unsavedVisibleTo);
    setStatus(
      unsavedVisibleTo === 'groups' &&
        (newGroupsProjects === null || isEmpty(newGroupsProjects.data))
        ? 'disabled'
        : 'enabled'
    );
  };

  const saveChanges = async () => {
    if (project && savedVisibleTo && unsavedVisibleTo) {
      let promises: Promise<any>[] = [];

      if (unsavedVisibleTo !== savedVisibleTo) {
        promises = [
          updateProject(project.data.id, { visible_to: unsavedVisibleTo }),
        ];
      }

      if (
        unsavedVisibleTo !== 'groups' &&
        newGroupsProjects !== null &&
        !isEmpty(newGroupsProjects.data)
      ) {
        promises = [
          ...promises,
          ...newGroupsProjects.data.map((groupsProject) =>
            deleteGroupProject(groupsProject.id)
          ),
        ];
      }

      if (unsavedVisibleTo === 'groups') {
        setOldGroupProjects(newGroupsProjects);
      }

      try {
        setIsSaving(true);
        await Promise.all(promises);
        setIsSaving(false);
        setStatus('success');
      } catch (error) {
        setIsSaving(false);
        setStatus('error');
      }
    }
  };

  const handleGroupsAdded = () => {
    saveChanges();
  };

  return (
    <ViewingRightsSection>
      <StyledSectionField>
        <SubSectionTitle>
          <FormattedMessage {...messages.viewingRightsTitle} />
        </SubSectionTitle>

        <RadioButtonsWrapper>
          <StyledRadio
            onChange={handlePermissionTypeChange}
            currentValue={unsavedVisibleTo}
            name="permissionsType"
            label={formatMessage(messages.permissionsEveryoneLabel)}
            value="public"
            id="permissions-all"
          />
          <StyledRadio
            onChange={handlePermissionTypeChange}
            currentValue={unsavedVisibleTo}
            name="permissionsType"
            label={formatMessage(messages.permissionsAdministrators)}
            value="admins"
            id="permissions-administrators"
          />
          <StyledRadio
            onChange={handlePermissionTypeChange}
            currentValue={unsavedVisibleTo}
            name="permissionsType"
            label={formatMessage(messages.permissionsSelectionLabel)}
            value="groups"
            id="permissions-selection"
          />
        </RadioButtonsWrapper>
      </StyledSectionField>

      {unsavedVisibleTo === 'groups' && (
        <ProjectGroupsList
          projectId={projectId}
          onAddButtonClicked={handleGroupsAdded}
        />
      )}

      {unsavedVisibleTo !== 'groups' && (
        <SubmitWrapper
          loading={isSaving}
          status={status}
          onClick={saveChanges}
          messages={{
            buttonSave: messages.save,
            buttonSuccess: messages.saveSuccess,
            messageError: messages.saveErrorMessage,
            messageSuccess: messages.saveSuccessMessage,
          }}
        />
      )}
    </ViewingRightsSection>
  );
};

export default injectIntl(ProjectVisibility);
