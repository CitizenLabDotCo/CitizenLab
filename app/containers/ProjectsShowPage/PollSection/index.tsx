import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isError } from 'lodash-es';
import { isNilOrError } from 'utils/helperUtils';

import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetPollQuestions, { GetPollQuestionsChildProps } from 'resources/GetPollQuestions';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import { pollTakingState, DisabledReasons } from 'services/pollTakingRules';

import FormCompleted from './FormCompleted';
import PollForm from './PollForm';
import Warning from 'components/UI/Warning';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

import styled from 'styled-components';

const Container = styled.div`
  color: ${({ theme }) => theme.colorText};
`;

const StyledWarning = styled(Warning)`
  margin-bottom: 30px;
`;

// type ProjectProps = {
//   type: 'projects',
//   phaseId: null,
//   projectId: string
// };
// type PhaseProps = {
//   type: 'phases',
//   phaseId: string,
//   projectId: string
// };

interface InputProps {
  type: 'phases' | 'projects';
  phaseId: string | null;
  projectId: string;
}

interface DataProps {
  authUser: GetAuthUserChildProps;
  pollQuestions: GetPollQuestionsChildProps;
  project: GetProjectChildProps;
  phase: GetPhaseChildProps;
}

interface Props extends InputProps, DataProps { }

const disabledMessages: { [key in Partial<DisabledReasons>]: ReactIntl.FormattedMessage.MessageDescriptor } = {
  projectInactive: messages.pollDisabledProjectInactive,
  maybeNotPermitted: messages.pollDisabledMaybeNotPermitted,
  notPermitted: messages.pollDisabledNotPermitted,
  notActivePhase: messages.pollDisabledNotActivePhase,
  alreadyResponded: messages.pollDisabledNotPossible // will not be used
};

export class PollSection extends PureComponent<Props> {
  render() {
    const { pollQuestions, projectId, phaseId, project, phase, type, authUser } = this.props;
    if (isNilOrError(pollQuestions) || isNilOrError(project) || type === 'phases' && isNilOrError(phase)) {
      return null;
    }
    const { enabled, disabledReason } = pollTakingState({ project, phaseContext: phase, signedIn: !!authUser });
    const message = disabledReason ? disabledMessages[disabledReason] : messages.pollDisabledNotPossible;

    return (
      <Container>
        {disabledReason === 'alreadyResponded'
          ? <FormCompleted />
          : <>
            {!enabled &&
              <StyledWarning icon="lock">
                <FormattedMessage {...message} />
              </StyledWarning>
            }
            {enabled && isNilOrError(authUser) &&
              <StyledWarning icon="lock">
                <FormattedMessage {...messages.signUpToTakePoll} />
              </StyledWarning>
            }
            <PollForm
              projectId={projectId}
              questions={pollQuestions}
              id={type === 'projects' ? projectId : phaseId as string}
              type={type}
              disabled={!enabled || isNilOrError(authUser)}
            />
          </>
        }
      </Container>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  pollQuestions: ({ projectId, phaseId, type, render }) => <GetPollQuestions participationContextId={type === 'projects' ? projectId : phaseId as string} participationContextType={type}>{render}</GetPollQuestions>,
  project: ({ projectId, render }) => <GetProject id={projectId}>{render}</GetProject>,
  phase: ({ phaseId, render }) => <GetPhase id={phaseId}>{render}</GetPhase>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <PollSection {...inputProps} {...dataProps} />}
  </Data>
);
