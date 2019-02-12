import React, { Component } from 'react';
import styled from 'styled-components';
import { IProjectData } from 'services/projects';

import { SubSectionTitle } from 'components/admin/Section';
import Timeline from './Timeline';
import Continuous from './Continuous';
import Warning from 'components/UI/Warning';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';
import { StyledSection } from '../';
import InfoTooltip from 'components/admin/InfoTooltip';

const StyledWarning = styled(Warning)`
  margin-bottom: 30px;
`;

interface Props {
  project: IProjectData;
}

class Granular extends Component<Props> {

  render() {
    const { project } = this.props;
    return (
      <StyledSection>
        <SubSectionTitle>
          <FormattedMessage {...messages.granularPermissionsTitle} />
          <InfoTooltip {...messages.granularPermissionsTooltip} />
        </SubSectionTitle>
        <StyledWarning>
          <FormattedMessage {...messages.engagementWarning} />
        </StyledWarning>
        {project && project.attributes.process_type === 'timeline' &&
          <Timeline
            projectId={project.id}
          />
        }
        {project && project.attributes.process_type === 'continuous' &&
          <Continuous
            project={project}
          />
        }
      </StyledSection>
    );
  }
}

export default Granular;
