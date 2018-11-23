import React, { PureComponent } from 'react';
import { isString, has, get, isEmpty, last, sortBy } from 'lodash-es';
import { BehaviorSubject, Subscription, Observable, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, distinctUntilChanged } from 'rxjs/operators';

// components
import Icon from 'components/UI/Icon';

// services
import { authUserStream } from 'services/auth';
import { ideaByIdStream, IIdea } from 'services/ideas';
import { IUser } from 'services/users';
import { voteStream, addVote, deleteVote } from 'services/ideaVotes';
import { projectByIdStream, IProject } from 'services/projects';
import { phaseStream, IPhase } from 'services/phases';

// utils
import { pastPresentOrFuture } from 'utils/dateUtils';

// style
import styled, { css, keyframes } from 'styled-components';
import { lighten } from 'polished';
import { colors, fontSizes } from 'utils/styleUtils';

const vote = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.2, 1.2, 1.2);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const Container: any = styled.div`
  display: flex;
  align-items: center;

  * {
    user-select: none;
  }
`;

const VoteIconContainer: any = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 1px ${lighten(0.4, colors.label)};
  background: #fff;
  transition: all 100ms ease-out;
  will-change: transform;

  ${(props: any) => props.size === '1' ? css`
    width: 45px;
    height: 45px;
  ` : css``}

  ${(props: any) => props.size === '2' ? css`
    width: 51px;
    height: 51px;
  ` : css``}

  ${(props: any) => props.size === '3' ? css`
    width: 55px;
    height: 55px;
  ` : css``}
`;

const VoteIcon: any = styled(Icon) `
  height: 19px;
  fill: ${colors.label};
  transition: all 100ms ease-out;

  ${(props: any) => props.size === '1' ? css`
    height: 16px;
  ` : css``}

  ${(props: any) => props.size === '2' ? css`
    height: 18px;
    width: 20px;
  ` : css``}

  ${(props: any) => props.size === '3' ? css`
    height: 20px;
    width: 23px;
  ` : css``}
`;

const VoteCount = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  margin-left: 5px;
  transition: all 100ms ease-out;
`;

const Vote: any = styled.div`
  display: flex;
  align-items: center;

  &.voteClick ${VoteIconContainer} {
    animation: ${vote} 350ms;
  }

  &:not(.enabled) {
      ${VoteIconContainer} {
        width: auto;
        border: none;
        background: none;
      }

      ${VoteIcon} {
        opacity: 0.6;
        margin-right: 4px;
      }

      ${VoteCount} {
        opacity: 0.6;
      }
  }
`;

const Upvote = Vote.extend`
  margin-right: 12px;

  &:not(.enabled) {
    ${VoteCount} {
      margin-right: 14px;
    }
  }

  ${VoteIconContainer} {
    ${props => props.active && `border-color: ${colors.clGreen}; background: ${colors.clGreen};`}
  }

  ${VoteIcon} {
    margin-bottom: 4px;
    ${props => props.active && (props.enabled ? 'fill: #fff;' : `fill: ${colors.clGreen}`)}
  }

  ${VoteCount} {
    min-width: 15px;
    margin-right: 5px;
    ${props => props.active && `color: ${colors.clGreen};`}
  }

  &:hover.enabled {
    ${VoteIconContainer} {
      ${props => !props.active && `border-color: ${colors.clGreen};`}
    }

    ${VoteIcon} {
      ${props => !props.active && `fill: ${colors.clGreen};`}
    }

    ${VoteCount} {
      ${props => !props.active && `color: ${colors.clGreen};`}
    }
  }
`;

const Downvote = Vote.extend`
  ${VoteIconContainer} {
    ${props => props.active && `border-color: ${colors.clRed}; background: ${colors.clRed};`}
  }

  ${VoteIcon} {
    margin-top: 5px;
    ${props => props.active && (props.enabled ? 'fill: #fff;' : `fill: ${colors.clRed}`)}
  }

  ${VoteCount} {
    ${props => props.active && `color: ${colors.clRed};`}
  }

  &:hover.enabled {
    ${VoteIconContainer} {
      ${props => !props.active && `border-color: ${colors.clRed};`}
    }

    ${VoteIcon} {
      ${props => !props.active && `fill: ${colors.clRed};`}
    }

    ${VoteCount} {
      ${props => !props.active && `color: ${colors.clRed};`}
    }
  }
`;

interface Props {
  ideaId: string;
  unauthenticatedVoteClick?: () => void;
  disabledVoteClick?: () => void;
  size: '1' | '2' | '3';
}

interface State {
  idea: IIdea | null;
  project: IProject | null;
  phases: IPhase[] | null;
  authUser: IUser | null;
  upvotesCount: number;
  downvotesCount: number;
  voting: 'up' | 'down' | null;
  votingAnimation: 'up' | 'down' | null;
  myVoteId: string | null;
  myVoteMode: 'up' | 'down' | null;
  votingEnabled: boolean | null;
  cancellingEnabled: boolean | null;
  votingFutureEnabled: string | null;
  votingDisabledReason: string | null;
}

export default class VoteControl extends PureComponent<Props, State> {
  voting$: BehaviorSubject<'up' | 'down' | null>;
  id$: BehaviorSubject<string | null>;
  subscriptions: Subscription[];
  upvoteElement: HTMLDivElement | null;
  downvoteElement: HTMLDivElement | null;

  constructor(props) {
    super(props);
    this.state = {
      idea: null,
      project: null,
      phases: null,
      authUser: null,
      upvotesCount: 0,
      downvotesCount: 0,
      voting: null,
      votingAnimation: null,
      myVoteId: null,
      myVoteMode: null,
      votingEnabled: null,
      cancellingEnabled: null,
      votingFutureEnabled: null,
      votingDisabledReason: null,
    };
    this.voting$ = new BehaviorSubject(null);
    this.id$ = new BehaviorSubject(null);
    this.subscriptions = [];
    this.upvoteElement = null;
    this.downvoteElement = null;
  }

  componentDidMount() {
    const authUser$ = authUserStream().observable;
    const voting$ = this.voting$.pipe(distinctUntilChanged());
    const id$ = this.id$.pipe(
      filter(ideaId => isString(ideaId)),
      distinctUntilChanged()
    ) as Observable<string>;

    this.id$.next(this.props.ideaId);

    if (this.upvoteElement) {
      this.upvoteElement.addEventListener('animationend', this.votingAnimationDone);
    }

    if (this.downvoteElement) {
      this.downvoteElement.addEventListener('animationend', this.votingAnimationDone);
    }

    const idea$ = id$.pipe(
      switchMap((ideaId: string) => {
        const idea$ = ideaByIdStream(ideaId).observable;

        return combineLatest(
          idea$,
          voting$
        );
      }),
      filter(([_idea, voting]) => {
        return voting === null;
      }),
      map(([idea, _voting]) => {
        return idea;
      })
    );

    const myVote$ = combineLatest(
      authUser$,
      idea$
    ).pipe(
      switchMap(([authUser, idea]) => {
        if (authUser && idea && has(idea, 'data.relationships.user_vote.data') && idea.data.relationships.user_vote.data !== null) {
          const voteId = idea.data.relationships.user_vote.data.id;
          const vote$ = voteStream(voteId).observable;

          return combineLatest(
            vote$,
            voting$
          ).pipe(
            filter(([_vote, voting]) => {
              return voting === null;
            }),
            map(([vote, _voting]) => {
              return vote;
            })
          );
        }

        return of(null);
      })
    );

    this.subscriptions = [
      voting$.subscribe((voting) => {
        this.setState((state) => ({
          voting,
          votingAnimation: (voting !== null && state.voting === null ? voting : state.votingAnimation)
        }));
      }),

      idea$.pipe(
        switchMap((idea) => {
          let project$: Observable<IProject | null> = of(null);
          let phases$: Observable<IPhase[] | null> = of(null);
          const hasPhases = !isEmpty(get(idea.data.relationships.phases, 'data', null));

          if (idea.data.attributes.budget && !hasPhases && idea.data.relationships.project.data) {
            project$ = projectByIdStream(idea.data.relationships.project.data.id).observable;
          }

          if (idea.data.attributes.budget && hasPhases && idea.data.relationships.phases.data.length > 0) {
            phases$ = combineLatest(
              idea.data.relationships.phases.data.map(phase => phaseStream(phase.id).observable)
            );
          }

          return combineLatest(
            project$,
            phases$
          ).pipe(
            map(([project, phases]) => ({ idea, project, phases }))
          );
        })
      ).subscribe(({ idea, project, phases }) => {
        const upvotesCount = idea.data.attributes.upvotes_count;
        const downvotesCount = idea.data.attributes.downvotes_count;
        const votingEnabled = idea.data.relationships.action_descriptor.data.voting.enabled;
        const cancellingEnabled = idea.data.relationships.action_descriptor.data.voting.cancelling_enabled;
        const votingDisabledReason = idea.data.relationships.action_descriptor.data.voting.disabled_reason;
        const votingFutureEnabled = idea.data.relationships.action_descriptor.data.voting.future_enabled;

        this.setState({ idea, project, phases, upvotesCount, downvotesCount, votingEnabled, cancellingEnabled, votingDisabledReason, votingFutureEnabled });
      }),

      authUser$.subscribe((authUser) => {
        this.setState({ authUser });
      }),

      myVote$.subscribe((myVote) => {
        this.setState({
          myVoteId: (myVote ? myVote.data.id : null),
          myVoteMode: (myVote ? myVote.data.attributes.mode : null)
        });
      })
    ];
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.ideaId !== prevProps.ideaId) {
      this.id$.next(this.props.ideaId);
    }
  }

  componentWillUnmount() {
    if (this.upvoteElement) {
      this.upvoteElement.removeEventListener('animationend', this.votingAnimationDone);
    }

    if (this.downvoteElement) {
      this.downvoteElement.removeEventListener('animationend', this.votingAnimationDone);
    }

    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  votingAnimationDone = () => {
    this.setState({ votingAnimation: null });
  }

  onClickUpvote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.onClickVote('up');
  }

  onClickDownvote = (event) => {
    event.preventDefault();
    event.stopPropagation();
    this.onClickVote('down');
  }

  onClickVote = async (voteMode: 'up' | 'down') => {
    const { authUser, myVoteId, myVoteMode, votingEnabled, cancellingEnabled } = this.state;
    const { ideaId, unauthenticatedVoteClick, disabledVoteClick } = this.props;

    if (!authUser) {
      unauthenticatedVoteClick && unauthenticatedVoteClick();
    } else if ((!votingEnabled && voteMode !== myVoteMode) || (!cancellingEnabled && voteMode === myVoteMode)) {
      disabledVoteClick && disabledVoteClick();
    } else if (authUser && this.state.voting === null) {
      try {
        this.voting$.next(voteMode);

        // Change vote (up -> down or down -> up)
        if (myVoteId && myVoteMode && myVoteMode !== voteMode) {
          this.setState((state) => ({
            upvotesCount: (voteMode === 'up' ? state.upvotesCount + 1 : state.upvotesCount - 1),
            downvotesCount: (voteMode === 'down' ? state.downvotesCount + 1 : state.downvotesCount - 1),
            myVoteMode: voteMode
          }));
          await deleteVote(ideaId, myVoteId);
          await addVote(ideaId, { user_id: authUser.data.id, mode: voteMode });
        }

        // Cancel vote
        if (myVoteId && myVoteMode && myVoteMode === voteMode) {
          this.setState((state) => ({
            upvotesCount: (voteMode === 'up' ? state.upvotesCount - 1 : state.upvotesCount),
            downvotesCount: (voteMode === 'down' ? state.downvotesCount - 1 : state.downvotesCount),
            myVoteMode: null
          }));
          await deleteVote(ideaId, myVoteId);
        }

        // Vote
        if (!myVoteMode) {
          this.setState((state) => ({
            upvotesCount: (voteMode === 'up' ? state.upvotesCount + 1 : state.upvotesCount),
            downvotesCount: (voteMode === 'down' ? state.downvotesCount + 1 : state.downvotesCount),
            myVoteMode: voteMode
          }));
          await addVote(ideaId, { user_id: authUser.data.id, mode: voteMode });
        }

        await ideaByIdStream(ideaId).fetch();
        this.voting$.next(null);
      } catch (error) {
        this.voting$.next(null);
        await ideaByIdStream(ideaId).fetch();
      }
    }
  }

  setUpvoteRef = (element: HTMLDivElement) => {
    this.upvoteElement = element;
  }

  setDownvoteRef = (element: HTMLDivElement) => {
    this.downvoteElement = element;
  }

  hideVotes = () => {
    return !(
      this.state.votingEnabled ||
      this.state.cancellingEnabled ||
      this.state.votingFutureEnabled ||
      this.state.upvotesCount ||
      this.state.downvotesCount
    );
  }

  upvotingEnabled = () => {
    const { myVoteMode, votingEnabled, cancellingEnabled } = this.state;
    return (myVoteMode !== 'up' && votingEnabled) || (myVoteMode === 'up' && cancellingEnabled);
  }

  downvotingEnabled = () => {
    const { myVoteMode, votingEnabled, cancellingEnabled } = this.state;
    return (myVoteMode !== 'down' && votingEnabled) || (myVoteMode === 'down' && cancellingEnabled);
  }

  render() {
    const className = this.props['className'];
    const { size } = this.props;
    const { project, phases, upvotesCount, downvotesCount, myVoteMode, votingAnimation, votingEnabled } = this.state;
    const upvotingEnabled = this.upvotingEnabled();
    const downvotingEnabled = this.downvotingEnabled();
    const pbProject = (project && project.data.attributes.process_type === 'continuous' && project.data.attributes.participation_method === 'budgeting' ? project : null);
    const pbPhase = (!pbProject && phases ? phases.find(phase => phase.data.attributes.participation_method === 'budgeting') : null);
    const pbPhaseIsActive = (pbPhase && pastPresentOrFuture([pbPhase.data.attributes.start_at, pbPhase.data.attributes.end_at]) === 'present');
    const lastPhase = (phases ? last(sortBy(phases, [phase => phase.data.attributes.end_at]) as IPhase[]) : null);
    const pbPhaseIsLast = (pbPhase && lastPhase && lastPhase.data.id === pbPhase.data.id);
    const showVoteControl = !!((!pbProject && !pbPhase) || (pbPhase && !pbPhaseIsActive && !pbPhaseIsLast));

    if (this.hideVotes() || !showVoteControl) return null;

    return (
      <Container className={`${className} e2e-vote-controls ${myVoteMode === null ? 'neutral' : myVoteMode} ${votingEnabled && 'enabled'}`}>
        <Upvote
          active={myVoteMode === 'up'}
          onClick={this.onClickUpvote}
          innerRef={this.setUpvoteRef}
          className={`${votingAnimation === 'up' ? 'voteClick' : 'upvote'} ${upvotingEnabled && 'enabled'}`}
          size={size}
          enabled={upvotingEnabled}
        >
          <VoteIconContainer size={size}>
            <VoteIcon name="upvote-2" size={size} enabled={upvotingEnabled} />
          </VoteIconContainer>
          <VoteCount>{upvotesCount}</VoteCount>
        </Upvote>
        <Downvote
          active={myVoteMode === 'down'}
          onClick={this.onClickDownvote}
          innerRef={this.setDownvoteRef}
          className={`${votingAnimation === 'down' ? 'voteClick' : 'downvote'} ${downvotingEnabled && 'enabled'}`}
          size={size}
          enabled={downvotingEnabled}
        >
          <VoteIconContainer size={size}>
            <VoteIcon name="downvote-2" size={size} enabled={downvotingEnabled} />
          </VoteIconContainer>
          <VoteCount>{downvotesCount}</VoteCount>
        </Downvote>
      </Container>
    );
  }
}
