import React, { PureComponent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { fontSizes } from 'utils/styleUtils';

// components
import Collapse from 'components/UI/Collapse';
import ActionsForm from './ActionsForm';

// services
import { IPermissionData, updatePhasePermission } from 'services/participationContextPermissions';

// resources
import GetPhases, { GetPhasesChildProps } from 'resources/GetPhases';
import GetPhasePermissions from 'resources/GetPhasePermissions';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// styling
import styled from 'styled-components';

const Container = styled.div`
  margin-bottom: 20px;

  p {
    font-size: ${fontSizes.base}px;
    font-style: italic;
  }
`;

const Permissions = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 25px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  border: solid 1px #ddd;
  background: #fff;
`;

interface InputProps { }

interface DataProps {
  phases: GetPhasesChildProps;
}

interface Props extends InputProps, DataProps { }

interface State {
  openedPhase: string | null;
}

class Timeline extends PureComponent<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      openedPhase: null,
    };
  }

  handleCollapseToggle = (phaseId: string) => () => {
    const { openedPhase } = this.state;
    this.setState({ openedPhase: openedPhase === phaseId ? null : phaseId });
  }

  handlePermissionChange = (permission: IPermissionData, permittedBy: IPermissionData['attributes']['permitted_by'], groupIds: string[]) => {
    updatePhasePermission(
      permission.id,
      permission.relationships.permittable.data.id,
      permission.attributes.action,
      { permitted_by: permittedBy, group_ids: groupIds }
    );
  }

  render() {
    const { phases } = this.props;
    const { openedPhase } = this.state;

    return (
      <Container>
        {phases && phases.length > 0 && phases.map((phase) => (
          <div style={{ marginBottom: '20px' }} key={phase.id}>
            <Collapse
              opened={openedPhase === phase.id}
              onToggle={this.handleCollapseToggle(phase.id)}
              label={<T value={phase.attributes.title_multiloc} />}
            >
              <Permissions>
                <GetPhasePermissions phaseId={phase.id}>
                  {(permissions) => {
                    console.log(2, permissions);

                    return isNilOrError(permissions) ? null :
                    <ActionsForm
                      permissions={permissions}
                      onChange={this.handlePermissionChange}
                    />;
                  }
                  }
                </GetPhasePermissions>
              </Permissions>
            </Collapse>
          </div>
        ))}
        {!phases || phases.length < 1 && <p><FormattedMessage {...messages.noActionsCanBeTaken} /></p>}
      </Container>
    );
  }
}

export default (inputProps) => (
  <GetPhases projectId={inputProps.projectId}>
    {(phases) => <Timeline {...inputProps} phases={phases} />}
  </GetPhases>
);
