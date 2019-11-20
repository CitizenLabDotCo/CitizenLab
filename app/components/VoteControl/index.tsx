import React, { PureComponent } from 'react';
import { isString, get, isEmpty, last, sortBy } from 'lodash-es';
import { BehaviorSubject, Subscription, Observable, combineLatest, of } from 'rxjs';
import { filter, map, switchMap, distinctUntilChanged } from 'rxjs/operators';
import { isNilOrError } from 'utils/helperUtils';
import { setMightOpenVerificationModal, verificationNeeded } from 'containers/App/events';

// i18n
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';

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
import { colors, fontSizes, ScreenReaderOnly } from 'utils/styleUtils';

interface IVoteComponent {
  active: boolean;
  enabled: boolean | null;
}

const vote = keyframes`
  from {
    transform: scale3d(1, 1, 1);
  }

  50% {
    transform: scale3d(1.25, 1.25, 1.25);
  }

  to {
    transform: scale3d(1, 1, 1);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;

  * {
    user-select: none;
  }
`;

const VoteIconContainer = styled.div<{ size: '1' | '2' | '3', votingEnabled: boolean | null }>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  border: solid 1px ${lighten(0.35, colors.label)};
  background: #fff;
  transition: all 60ms ease-out;
  will-change: transform;

  ${(props) => !props.votingEnabled ? css`
    margin-left: 5px;
  ` : css``}

  ${(props) => props.size === '1' && props.votingEnabled ? css`
    width: 45px;
    height: 45px;
  ` : css``}

  ${(props) => props.size === '2' && props.votingEnabled ? css`
    width: 48px;
    height: 48px;
  ` : css``}

  ${(props) => props.size === '3' && props.votingEnabled ? css`
    width: 52px;
    height: 52px;
  ` : css``}
`;

const VoteIcon = styled(Icon)<{ size: '1' | '2' | '3', enabled: boolean | null }>`
  width: 19px;
  height: 19px;
  fill: ${colors.label};
  transition: all 100ms ease-out;

  ${(props) => props.size === '1' ? css`
    width: 18px;
    height: 18px;
  ` : css``}

  ${(props) => props.size === '2' ? css`
    width: 20px;
    height: 20px;
  ` : css``}

  ${(props) => props.size === '3' ? css`
    width: 21px;
    height: 21px;
  ` : css``}
`;

const VoteCount = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  margin-left: 5px;
  transition: all 100ms ease-out;

  &:not(.enabled) {
    margin-left: 3px;
  }
`;

const Vote = styled.button<IVoteComponent>`
  display: flex;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;

  &.voteClick ${VoteIconContainer} {
    animation: ${css`${vote} 350ms`};
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

const Upvote = styled(Vote)`
  margin-right: 8px;

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
    min-width: 20px;
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

const Downvote = styled(Vote)`
  ${VoteIconContainer} {
    ${props => props.active && `border-color: ${colors.clRed}; background: ${colors.clRed};`}
  }

  ${VoteIcon} {
    margin-top: 4px;
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
  size: '1' | '2' | '3';
  unauthenticatedVoteClick?: () => void;
  disabledVoteClick?: (disabled_reason?: string) => void;
  className?: string;
  noVerificationShortFlow?: boolean;
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

class VoteControl extends PureComponent<Props & InjectedIntlProps, State> {
  voting$: BehaviorSubject<'up' | 'down' | null>;
  id$: BehaviorSubject<string | null>;
  subscriptions: Subscription[];
  upvoteElement: HTMLButtonElement | null;
  downvoteElement: HTMLButtonElement | null;

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
        if (authUser && idea && idea.data.relationships.user_vote && idea.data.relationships.user_vote.data !== null) {
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
        const votingEnabled = idea.data.attributes.action_descriptor.voting.enabled;
        const cancellingEnabled = idea.data.attributes.action_descriptor.voting.cancelling_enabled;
        const votingDisabledReason = idea.data.attributes.action_descriptor.voting.disabled_reason;
        const votingFutureEnabled = idea.data.attributes.action_descriptor.voting.future_enabled;
        if (votingDisabledReason === 'not_verified' && !this.props.noVerificationShortFlow) {
          verificationNeeded('ActionVote');
        }

        this.setState({
          idea,
          project,
          phases,
          upvotesCount,
          downvotesCount,
          votingEnabled,
          cancellingEnabled,
          votingDisabledReason,
          votingFutureEnabled
        });
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

  componentDidUpdate(prevProps: Props, _prevState: State) {
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
    const { authUser, myVoteId, myVoteMode, votingEnabled, cancellingEnabled, votingDisabledReason } = this.state;
    const { ideaId, unauthenticatedVoteClick, disabledVoteClick } = this.props;

    if (!authUser) {
      setMightOpenVerificationModal('ActionVote');
      unauthenticatedVoteClick && unauthenticatedVoteClick();
    } else if ((!votingEnabled && voteMode !== myVoteMode) || (!cancellingEnabled && voteMode === myVoteMode)) {
      disabledVoteClick && disabledVoteClick(votingDisabledReason || undefined);
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

  setUpvoteRef = (element: HTMLButtonElement) => {
    this.upvoteElement = element;
  }

  setDownvoteRef = (element: HTMLButtonElement) => {
    this.downvoteElement = element;
  }

  removeFocus = (event: React.MouseEvent) => {
    event.preventDefault();
  }

  render() {
    const { size, className, intl: { formatMessage } } = this.props;
    const { project, phases, myVoteMode, votingAnimation, votingEnabled, cancellingEnabled, votingFutureEnabled, upvotesCount, downvotesCount, votingDisabledReason } = this.state;
    const upvotingEnabled = (myVoteMode !== 'up' && votingEnabled) || (myVoteMode === 'up' && cancellingEnabled);
    const downvotingEnabled = (myVoteMode !== 'down' && votingEnabled) || (myVoteMode === 'down' && cancellingEnabled);
    const projectProcessType = get(project, 'data.attributes.process_type');
    const projectParticipationMethod = get(project, 'data.attributes.participation_method');
    const pbProject = (project && projectProcessType === 'continuous' && projectParticipationMethod === 'budgeting' ? project : null);
    const pbPhase = (!pbProject && phases ? phases.find(phase => phase.data.attributes.participation_method === 'budgeting') : null);
    const pbPhaseIsActive = (pbPhase && pastPresentOrFuture([pbPhase.data.attributes.start_at, pbPhase.data.attributes.end_at]) === 'present');
    const lastPhase = (!isNilOrError(phases) ? last(sortBy(phases, [phase => phase.data.attributes.end_at])) : null);
    const lastPhaseHasPassed = (lastPhase ? pastPresentOrFuture([lastPhase.data.attributes.start_at, lastPhase.data.attributes.end_at]) === 'past' : false);
    const pbPhaseIsLast = (pbPhase && lastPhase && lastPhase.data.id === pbPhase.data.id);
    const showBudgetControl = !!(pbProject || (pbPhase && (pbPhaseIsActive || (lastPhaseHasPassed && pbPhaseIsLast))));
    const shouldVerify = !votingEnabled && votingDisabledReason === 'not_verified';
    const verifiedButNotPermitted = !shouldVerify &&  votingDisabledReason === 'not_permitted';
    const showVoteControl = !!(!showBudgetControl && (votingEnabled || cancellingEnabled || votingFutureEnabled || upvotesCount > 0 || downvotesCount > 0 || shouldVerify || verifiedButNotPermitted));

    if (!showVoteControl) return null;

    return (
      <Container className={`${className} e2e-vote-controls ${myVoteMode === null ? 'neutral' : myVoteMode} ${votingEnabled && 'enabled'}`}>
        <ScreenReaderOnly id="upvote-button">
          <FormattedMessage {...messages.a11y_xUpvotes} values={{ count: upvotesCount }} />
        </ScreenReaderOnly>

        <ScreenReaderOnly id="downvote-button">
          <FormattedMessage {...messages.a11y_xDownvotes} values={{ count: downvotesCount }} />
        </ScreenReaderOnly>

        <Upvote
          active={myVoteMode === 'up'}
          onMouseDown={this.removeFocus}
          onClick={this.onClickUpvote}
          ref={this.setUpvoteRef}
          className={`${votingAnimation === 'up' ? 'voteClick' : 'upvote'} ${upvotingEnabled && 'enabled'} e2e-ideacard-upvote-button`}
          enabled={upvotingEnabled}
          aria-describedby="upvote-button"
        >
          <VoteIconContainer size={size} votingEnabled={upvotingEnabled}>
            <VoteIcon ariaHidden title={formatMessage(messages.upvote)} name="upvote" size={size} enabled={upvotingEnabled} />
          </VoteIconContainer>
          <VoteCount aria-hidden className={votingEnabled ? 'enabled' : ''}>{upvotesCount}</VoteCount>
        </Upvote>

        <Downvote
          active={myVoteMode === 'down'}
          onMouseDown={this.removeFocus}
          onClick={this.onClickDownvote}
          ref={this.setDownvoteRef}
          className={`${votingAnimation === 'down' ? 'voteClick' : 'downvote'} ${downvotingEnabled && 'enabled'} e2e-ideacard-downvote-button`}
          enabled={downvotingEnabled}
          aria-describedby="downvote-button"
        >
          <VoteIconContainer size={size} votingEnabled={downvotingEnabled}>
            <VoteIcon ariaHidden title={formatMessage(messages.downvote)} name="downvote" size={size} enabled={downvotingEnabled} />
          </VoteIconContainer>
          <VoteCount aria-hidden className={votingEnabled ? 'enabled' : ''}>{downvotesCount}</VoteCount>
        </Downvote>
      </Container>
    );
  }
}

export default injectIntl(VoteControl);
