import React from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import Button from 'components/UI/Button';
import Icon from 'components/UI/Icon';

// services
import { getPostingPermission, DisabledReasons } from 'services/ideaPostingRules';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// styling
import styled from 'styled-components';
import { fontSizes } from 'utils/styleUtils';

const DisabledText = styled.div`
  color: rgba(121, 137, 147, 1);
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  display: flex;
  align-items: center;
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
`;

interface InputProps {
  projectId: string;
  phaseId?: string;
  onClick?: () => void;
}

interface DataProps {
  project: GetProjectChildProps;
  phase: GetPhaseChildProps;
  authUser: GetAuthUserChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class IdeaButton extends React.PureComponent<Props, State> {

  disabledReasonToMessage: { [key in DisabledReasons]: ReactIntl.FormattedMessage.MessageDescriptor } = {
    notPermitted: messages.postingNotPermitted,
    maybeNotPermitted: messages.postingMaybeNotPermitted,
    postingDisabled: messages.postingHereImpossible,
    projectInactive: messages.postingProjectInactive,
    notActivePhase: messages.postingNotActivePhase,
    futureEnabled: messages.postingHereImpossible,
  };

  handleOnAddIdeaClick = () => {
    this.props.onClick && this.props.onClick();
  }

  render() {
    const { project, phase, authUser } = this.props;

    if (isNilOrError(project)) return null;

    const { show, enabled, disabledReason } = getPostingPermission({
      project,
      phase,
      authUser
    });

    if (!show || !enabled) {
      return (
        <DisabledText>
          <StyledIcon name="lock-outlined" />
          {disabledReason ?
            <FormattedMessage {...this.disabledReasonToMessage[disabledReason]} />
          :
            <FormattedMessage {...messages.postingHereImpossible} />
          }
        </DisabledText>
      );
    }

    return (
      <Button
        onClick={this.props.onClick}
        icon="plus-circle"
        style="primary"
        size="2"
        text={<FormattedMessage {...messages.postIdeaHere} />}
        circularCorners={false}
        disabled={!enabled}
      />
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  project: ({ projectId, render }) => <GetProject id={projectId}>{render}</GetProject>,
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>,
  authUser: <GetAuthUser />
});

const WrappedIdeaButton = (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <IdeaButton {...inputProps} {...dataProps} />}
  </Data>
);

export default WrappedIdeaButton;
