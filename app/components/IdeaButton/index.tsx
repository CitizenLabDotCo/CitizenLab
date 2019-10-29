import React, { PureComponent } from 'react';
import styled from 'styled-components';

// services
import { getPostingPermission, DisabledReasons } from 'services/ideaPostingRules';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// components
import { ButtonStyles } from 'components/UI/Button';
import Tooltip from 'components/UI/Tooltip';
import { IPosition } from 'components/UI/Popover';
import Icon from 'components/UI/Icon';

// i18n
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// events
import { openVerificationModalWithContext } from 'containers/App/events';

// tracks
import { injectTracks } from 'utils/analytics';
import tracks from './tracks';

// styling
import { fontSizes, colors } from 'utils/styleUtils';

const Container = styled.div`
  &.bannerStyle {
    height: 100%;
  }
`;

const StyledIcon = styled(Icon)`
  height: 2rem;
  width: 2rem;
  margin-right: 1rem;
`;

const StyledA = styled.a`
  transition: all 100ms ease-out;

  &:hover, &:focus {
    text-decoration: underline;
  }
  padding: 0;
`;

const TooltipWrapper = styled.div`
  display: flex;
  align-items: center;
  min-width: 300px;
  color: ${colors.popoverDarkFg};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  padding: 15px;
`;

interface DataProps {
  project: GetProjectChildProps;
  phase: GetPhaseChildProps;
  authUser: GetAuthUserChildProps;
}

interface ITracks {
  clickNewIdea: ({ extra: object }) => void;
}

interface InputProps {
  projectId?: string | undefined;
  phaseId?: string | undefined;
  style?: ButtonStyles;
  size?: '1' | '2' | '3' | '4';
  fullWidth?: boolean;
  className?: string;
  fullHeight?: boolean;
  bgColor?: string;
  textColor?: string;
  fontWeight?: string;
  padding?: string;
  smallViewportTooltipPosition?: IPosition;
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

  onVerify = () => {
    openVerificationModalWithContext('ActionIdea');
  }

  onNewIdea = (_event) => {
    this.props.clickNewIdea({ extra: { urlFrom: this.locationRef } });
  }

  render() {
    const { project, phase, authUser, className, smallViewportTooltipPosition } = this.props;
    const { show, enabled, disabledReason } = getPostingPermission({
      project,
      phase,
      authUser
    });

    if (show) {
      let { style, size, fullWidth, bgColor, textColor, fontWeight, padding } = this.props;
      const { fullHeight } = this.props;
      const startAnIdeaText = this.props.intl.formatMessage(messages.startAnIdea);

      style = (style || 'primary');
      size = (size || '1');
      fullWidth = (fullWidth || false);
      bgColor = (bgColor || undefined);
      textColor = (textColor || undefined);
      fontWeight = (fontWeight || undefined);
      padding = (padding || undefined);

      return (
        <Container className={`${className} ${fullHeight ? 'bannerStyle' : ''} e2e-idea-button`}>
          <Tooltip
            enabled={!enabled && !!disabledReason}
            content={
              disabledReason ? (
                <TooltipWrapper className="e2e-disabled-tooltip">
                  <StyledIcon name="lock-outlined" />
                  <FormattedMessage
                    {...this.disabledMessages[disabledReason]}
                    values={{
                      verificationLink:
                        <StyledA href="" onClick={this.onVerify} className="tooltipLink">
                          <FormattedMessage {...messages.verificationLinkText} />
                        </StyledA>,
                    }}
                  />
                </TooltipWrapper>
              ) : null
            }
            backgroundColor={colors.popoverDarkBg}
            borderColor={colors.popoverDarkBg}
            offset={59}
            position="bottom"
            openDelay={100}
            buttonProps={{
              style,
              size,
              fullWidth,
              fullHeight,
              bgColor,
              textColor,
              fontWeight,
              padding,
              linkTo: (!isNilOrError(project) ? `/projects/${project.attributes.slug}/ideas/new` : '/ideas/new'),
              text: startAnIdeaText,
              disabled: !enabled,
              onClick: this.onNewIdea
            }}
            smallViewportPosition={smallViewportTooltipPosition}
            withPin
          />
        </Container>
      );
    }

    return null;
  }
}

const IdeaButtonWithHOCs = injectIntl<Props>(injectTracks<Props & InjectedIntlProps>(tracks)(IdeaButton));

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  project: ({ projectId, render, }) => <GetProject id={projectId}>{render}</GetProject>,
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <IdeaButtonWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
