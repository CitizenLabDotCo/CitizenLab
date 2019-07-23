import React, { PureComponent } from 'react';
import styled from 'styled-components';

import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetInitiative, { GetInitiativeChildProps } from 'resources/GetInitiative';
import GetInitiativeStatus, { GetInitiativeStatusChildProps } from 'resources/GetInitiativeStatus';
import { InitiativeStatusCode } from 'services/initiativeStatuses';

import Icon from 'components/UI/Icon';

import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

import { fontSizes, colors } from 'utils/styleUtils';

import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

const Container = styled.div``;

const StatusBadge = styled.div<{color: string}>`
  font-size: ${fontSizes.small}px;
  line-height: 18px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  padding: 8px 12px;
  text-transform: capitalize;
  font-weight: 400;
  background-color: ${(props) => props.color};
  display: flex;
  align-items: center;
`;

const BadgeIcon = styled(Icon)`
  width: 1.6em;
  height: 1.6em;
  fill: ${colors.clGreenSuccess};
  padding-right: 7px;
`;

const BadgeLabel = styled.div`

`;

const AnsweredStatusBadge = styled(StatusBadge)`
  background-color: ${colors.clGreenSuccessBackground};
  color: ${colors.clGreenSuccess};
`;

const IneligibleStatusBadge = styled(StatusBadge)`
`;

interface InputProps {
  initiativeId: string;

}
interface DataProps {
  tenant: GetTenantChildProps;
  initiative: GetInitiativeChildProps;
  initiativeStatus: GetInitiativeStatusChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class VoteIndicator extends PureComponent<Props, State> {

  render() {
    const { initiative, initiativeStatus } = this.props;
    if (isNilOrError(initiative) || isNilOrError(initiativeStatus)) return null;

    const statusCode = initiativeStatus.attributes.code;

    return (
      <Container>
        {statusCode === 'published' &&
          <T value={initiativeStatus.attributes.title_multiloc} />
        }
        {statusCode === 'expired' &&
          <T value={initiativeStatus.attributes.title_multiloc} />
        }
        {statusCode === 'threshold_reached' &&
          <T value={initiativeStatus.attributes.title_multiloc} />
        }
        {statusCode === 'answered' &&
          <AnsweredStatusBadge
            color={initiativeStatus.attributes.color}
          >
            <BadgeIcon name="round-checkmark" />
            <BadgeLabel>
              <T value={initiativeStatus.attributes.title_multiloc} />
            </BadgeLabel>
          </AnsweredStatusBadge>
        }
        {statusCode === 'ineligible' &&
          <T value={initiativeStatus.attributes.title_multiloc} />
        }
        {statusCode === 'custom' &&
          <T value={initiativeStatus.attributes.title_multiloc} />
        }
      </Container>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  initiative: ({ initiativeId, render }) => <GetInitiative id={initiativeId}>{render}</GetInitiative>,
  initiativeStatus: ({ initiative, render }) => {
    if (!isNilOrError(initiative) && initiative.relationships.initiative_status && initiative.relationships.initiative_status.data) {
      return <GetInitiativeStatus id={initiative.relationships.initiative_status.data.id}>{render}</GetInitiativeStatus>;
    } else {
      return null;
    }
  }
});

const VoteIndicatorWithHOCs = VoteIndicator;

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <VoteIndicatorWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
