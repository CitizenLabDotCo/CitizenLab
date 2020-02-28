import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import PopContainer from 'components/UI/PopContainer';
import VoteControl from 'components/VoteControl';
import VotingDisabled from 'components/VoteControl/VotingDisabled';
import Unauthenticated from './Unauthenticated';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';

interface InputProps {
  ideaId?: string;
  projectId: string;
}

interface DataProps {
  idea: GetIdeaChildProps;
}

interface Props extends InputProps, DataProps {}

type State = {
  error: 'votingDisabled' | 'unauthenticated' | null;
};

class VoteWrapper extends PureComponent<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      error: null,
    };
  }

  componentDidUpdate(prevProps : Props) {
    const { idea } = this.props;
    const prevIdea = prevProps.idea;

    if (!isNilOrError(idea) && !isNilOrError(prevIdea)) {
      const votingEnabled = idea.attributes.action_descriptor.voting.enabled;
      const prevVotingEnabled = prevIdea.attributes.action_descriptor.voting.enabled;
      const votingDisabledReason = idea.attributes.action_descriptor.voting.disabled_reason;
      const prevVotingDisabledReason = prevIdea.attributes.action_descriptor.voting.disabled_reason;

      if ((votingEnabled !== prevVotingEnabled) || (votingDisabledReason !== prevVotingDisabledReason)) {
        this.setState({ error: null });
      }
    }
  }

  unauthenticatedVoteClick = () => {
    this.setState({ error: 'unauthenticated' });
  }

  disabledVoteClick = () => {
    this.setState({ error: 'votingDisabled' });
  }

  render() {
    const { ideaId, projectId, idea } = this.props;
    const { error } = this.state;

    const votingDescriptor = isNilOrError(idea) ? null : idea.attributes.action_descriptor.voting;

    if (!ideaId || !votingDescriptor) return null;

    return (
      <>
        {!error &&
          <VoteControl
            ideaId={ideaId}
            unauthenticatedVoteClick={this.unauthenticatedVoteClick}
            disabledVoteClick={this.disabledVoteClick}
            size="3"
          />
        }
        {error === 'votingDisabled' &&
          <PopContainer icon="lock-outlined">
            <VotingDisabled
              votingDescriptor={votingDescriptor}
              projectId={projectId}
            />
          </PopContainer>
        }
        {error === 'unauthenticated' &&
          <PopContainer icon="lock-outlined">
            <Unauthenticated />
          </PopContainer>
        }
      </>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  idea: ({ ideaId, render }) => <GetIdea id={ideaId}>{render}</GetIdea>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <VoteWrapper {...inputProps} {...dataProps} />}
  </Data>
);
