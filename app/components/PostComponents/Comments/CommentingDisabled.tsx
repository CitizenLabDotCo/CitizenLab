import React, { PureComponent } from 'react';
import styled from 'styled-components';
import { isNilOrError } from 'utils/helperUtils';

// components
import Warning from 'components/UI/Warning';
import Button from 'components/UI/Button';
import Link from 'utils/cl-router/Link';
import T from 'components/T';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';

// services
import { IIdeaData } from 'services/ideas';

// i18n
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';

// events
import { openVerificationModalWithContext } from 'containers/App/events';

const Container = styled.div`
  margin-bottom: 40px;
`;

const StyledLink = styled(Link) `
  color: #1391A1;
  text-decoration: underline;
  transition: all 100ms ease-out;

  &:hover {
    text-decoration: underline;
  }
`;
const StyledButton = styled(Button) `
  color: #1391A1;
  text-decoration: underline;
  transition: all 100ms ease-out;
  display: inline-block;

  &:hover {
    text-decoration: underline;
  }
`;

interface InputProps {
  projectId: string | null;
  phaseId: string | undefined;
  isLoggedIn: boolean | null;
  commentingEnabled: boolean | null;
  commentingDisabledReason: IIdeaData['attributes']['action_descriptor']['commenting']['disabled_reason'] | null;
}

interface DataProps {
  project: GetProjectChildProps;
}

interface Props extends InputProps, DataProps {}

class CommentingDisabled extends PureComponent<Props> {
  calculateMessageDescriptor = () => {
    const { isLoggedIn, commentingEnabled, commentingDisabledReason } = this.props;

    if (commentingEnabled && isLoggedIn) {
      return null;
    } else if (commentingDisabledReason === 'project_inactive') {
      return messages.commentingDisabledProjectInactive;
    } else if (commentingDisabledReason === 'commenting_disabled') {
      return messages.commentingDisabledInContext;
    } else if (commentingDisabledReason === 'idea_not_in_current_phase') {
      return messages.commentingDisabledIdeaNotInCurrentPhase;
    } else if (commentingDisabledReason === 'not_verified') {
      return messages.commentingDisabledNotVerified;
    } else if (isLoggedIn && commentingDisabledReason === 'not_permitted') {
      return messages.commentingNotPermitted;
    } else if (!isLoggedIn && commentingDisabledReason === 'not_permitted') {
      return messages.commentingMaybeNotPermitted;
    }

    return messages.signInToComment;
  }

  onVerify = () => {
    const { projectId, phaseId } = this.props;
    if (phaseId) {
      openVerificationModalWithContext('ActionComment', phaseId, 'phase', 'commenting');
    } else if (projectId) {
      openVerificationModalWithContext('ActionComment', projectId, 'project', 'commenting');
    }
  }

  render() {
    const { project } = this.props;
    const messageDescriptor = this.calculateMessageDescriptor();
    const projectTitle = (!isNilOrError(project) ? project.attributes.title_multiloc : null);

    if (messageDescriptor) {
      return (
        <Container className="e2e-commenting-disabled">
          <Warning>
            <FormattedMessage
              {...messageDescriptor}
              values={{
                signInLink: <StyledLink to="/sign-in"><FormattedMessage {...messages.signInLinkText} /></StyledLink>,
                signUpLink: <StyledLink to="/sign-up"><FormattedMessage {...messages.signUpLinkText} /></StyledLink>,
                verificationLink: <StyledButton style="text" padding="0" onClick={this.onVerify}><FormattedMessage {...messages.verificationLinkText} /></StyledButton>,
                projectName: projectTitle && <T value={projectTitle} />
              }}
            />
          </Warning>
        </Container>
      );
    }

    return null;
  }
}

export default (inputProps: InputProps) => (
  <GetProject id={inputProps.projectId}>
    {project => <CommentingDisabled {...inputProps} project={project} />}
  </GetProject>
);
