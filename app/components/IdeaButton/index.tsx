import React, { PureComponent } from 'react';
import { isNilOrError } from 'utils/helperUtils';
import { adopt } from 'react-adopt';

// typings
import { IParticipationContextType } from 'typings';

// services
import { getPostingPermission, DisabledReasons } from 'services/ideaPostingRules';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// components
import Button, { ButtonContainerProps } from 'components/UI/Button';
import Tippy from '@tippy.js/react';
import Icon from 'components/UI/Icon';

// i18n
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

// events
import { openVerificationModalWithContext } from 'containers/App/events';

// tracks
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// styling
import styled from 'styled-components';
import { fontSizes, colors } from 'utils/styleUtils';
import { darken } from 'polished';

const Container = styled.div``;

const ButtonWrapper = styled.div``;

const LockIcon = styled(Icon)`
  flex: 0 0 25px;
  width: 20px;
  height: 25px;
  margin-right: 1rem;
`;

const StyledA = styled.a`
  padding: 0;
  transition: all 100ms ease-out;

  &:hover,
  &:focus {
    text-decoration: underline;
  }
`;

const TooltipWrapper = styled.div`
  color: ${colors.text};
  font-size: ${fontSizes.base}px;
  line-height: normal;
  font-weight: 400;
  display: flex;
  align-items: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  padding: 15px;

  a {
    color: ${colors.clBlueDark};
    text-decoration: underline;
    overflow-wrap: break-word;
    word-wrap: break-word;
    word-break: break-all;
    word-break: break-word;
    hyphens: auto;

    &:hover {
      color: ${darken(0.15, colors.clBlueDark)};
      text-decoration: underline;
    }
  }
`;

interface DataProps {
  project: GetProjectChildProps;
  phase: GetPhaseChildProps;
  authUser: GetAuthUserChildProps;
}

interface ITracks {
  clickNewIdea: ({ extra: object }) => void;
}

interface InputProps extends ButtonContainerProps {
  projectId?: string | undefined | null;
  phaseId?: string | undefined | null;
  className?: string;
  participationContextType: IParticipationContextType | null;
}

interface Props extends InputProps, DataProps { }

class IdeaButton extends PureComponent<Props & InjectedIntlProps & ITracks> {
  locationRef = window.location.href;

  disabledMessages: { [key in DisabledReasons]: ReactIntl.FormattedMessage.MessageDescriptor } = {
    notPermitted: messages.postingNotPermitted,
    maybeNotPermitted: messages.postingMaybeNotPermitted,
    postingDisabled: messages.postingHereImpossible,
    projectInactive: messages.postingProjectInactive,
    notActivePhase: messages.postingNotActivePhase,
    futureEnabled: messages.postingHereImpossible,
    notVerified: messages.postingNotVerified
  };

  onVerify = (event: React.MouseEvent) => {
    event.preventDefault();
    const { participationContextType, projectId, phaseId } = this.props;
    if (participationContextType === 'project' && projectId) {
      openVerificationModalWithContext('ActionPost', projectId, 'project', 'posting');
    } else if (participationContextType === 'phase' && phaseId) {
      openVerificationModalWithContext('ActionPost', phaseId, 'phase', 'posting');
    }
  }

  onNewIdea = () => {
    this.props.clickNewIdea({ extra: { urlFrom: this.locationRef } });
  }

  render() {
    const { project, phase, authUser, className } = this.props;
    const { show, enabled, disabledReason } = getPostingPermission({
      project,
      phase,
      authUser
    });

    if (show) {
      const linkTo = !isNilOrError(project) ? `/projects/${project.attributes.slug}/ideas/new` : '/ideas/new';
      const isPostingDisabled = (!enabled && !!disabledReason);
      const tippyContent = (!enabled && !!disabledReason) ? (
        <TooltipWrapper id="tooltip-content" className="e2e-disabled-tooltip">
          <LockIcon name="lock-outlined" ariaHidden />
          <FormattedMessage
            {...this.disabledMessages[disabledReason]}
            values={{
              verificationLink:
                <StyledA href="" onClick={this.onVerify} className="tooltipLink">
                  <FormattedMessage {...messages.verificationLinkText} />
                </StyledA>,
              signUpLink:
                <StyledA href="/sign-up" className="tooltipLink">
                  <FormattedMessage {...messages.signUpLinkText} />
                </StyledA>,
              signInLink:
                <StyledA href="/sign-in" className="tooltipLink">
                  <FormattedMessage {...messages.signInLinkText} />
                </StyledA>,
            }}
          />
        </TooltipWrapper>
      ) : <></>;

      return (
        <Container className={className}>
          <Tippy
            enabled={isPostingDisabled}
            interactive={true}
            placement="bottom"
            content={tippyContent}
            theme="light"
            hideOnClick={false}
          >
            <ButtonWrapper tabIndex={isPostingDisabled ? 0 : -1} className={`e2e-idea-button ${isPostingDisabled ? 'disabled' : ''} ${disabledReason ? disabledReason : ''}`}>
              <Button
                {...this.props}
                aria-describedby="tooltip-content"
                linkTo={linkTo}
                disabled={isPostingDisabled}
                ariaDisabled={false}
              >
                <FormattedMessage {...messages.startAnIdea} />
              </Button>
            </ButtonWrapper>
          </Tippy>
        </Container>
      );
    }

    return null;
  }
}

const IdeaButtonWithHOCs = injectIntl<Props>(injectTracks<Props & InjectedIntlProps>(tracks)(IdeaButton));

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  project: ({ projectId, render, }) => <GetProject projectId={projectId}>{render}</GetProject>,
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <IdeaButtonWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
