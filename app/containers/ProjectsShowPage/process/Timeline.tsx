import React, { PureComponent, FormEvent } from 'react';
import { indexOf, isString, forEach } from 'lodash-es';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { tap, filter, switchMap, distinctUntilChanged } from 'rxjs/operators';
import moment from 'moment';

// components
import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';
import IdeaButton from 'components/IdeaButton';

// services
import { localeStream } from 'services/locale';
import { currentTenantStream, ITenant } from 'services/tenant';
import { phasesStream, IPhases, getCurrentPhase } from 'services/phases';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';
import { getLocalized } from 'utils/i18n';

// utils
import { pastPresentOrFuture, getIsoDate } from 'utils/dateUtils';

// style
import styled, { css } from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';

// typings
import { Locale } from 'typings';

const greyTransparent = css`rgba(116, 116, 116, 0.3)`;
const greyOpaque = `${colors.label}`;
const greenTransparent = css`rgba(4, 136, 76, 0.3)`;
const greenOpaque = `${colors.clGreen}`;

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const padding = 30;
const mobilePadding = 20;

const ContainerInner = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;

  * {
    user-select: none;
  }
`;

const Header = styled.div`
  width: 100%;
  height: 0; // For IE11, which has trouble with vertical centering without a set height
  min-height: 70px;
  background-color: #fff;
  padding-left: ${padding}px;
  padding-right: ${padding}px;
  padding-top: 8px;
  padding-bottom: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: solid 1px ${colors.separation};

  ${media.smallerThanMaxTablet`
    padding-left: ${mobilePadding}px;
    padding-right: ${mobilePadding}px;
  `}
`;

const HeaderSectionsWrapper = styled.div`
  width: 100%;
  max-width: ${(props) => props.theme.maxPageWidth}px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const HeaderSection = styled.div`
  display: flex;
  align-items: center;
`;

const HeaderLeftSection = HeaderSection.extend`
  flex-direction: column;
  align-items: flex-start;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const HeaderRightSection = HeaderSection.extend``;

const PhaseSummary = styled.div`
  display: flex;
  align-items: center;
`;

const PhaseNumberWrapper = styled.div`
  flex: 0 0 auto;
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  border-radius: 50%;
  background: ${greyOpaque};

  &.present {
    background: ${greenOpaque};
  }
`;

const PhaseNumber = styled.div`
  color: #fff;
  font-size: ${fontSizes.base}px;
  line-height: 16px;
  font-weight: 400;
  margin: 0;
  padding: 0;
`;

const HeaderTitleWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-right: 15px;

  ${media.smallerThanMaxTablet`
    margin-right: 0px;
  `}
`;

const HeaderTitle = styled.h2`
  color: ${colors.text};
  font-size: ${fontSizes.large}px;
  line-height: 25px;
  font-weight: 600;
  margin-right: 20px;
  margin-bottom: 0;

  ${media.smallerThanMaxTablet`
    font-size: ${fontSizes.large}px;
    line-height: 24px;
  `}
`;

const MobileDate = styled.div`
  color: #999;
  font-size: ${fontSizes.base}px;
  line-height: 21px;
  font-weight: 400;
  margin-top: 2px;
  display: none;

  ${media.smallerThanMaxTablet`
    display: block;
  `}
`;

const IdeaButtonMobile: any = styled(IdeaButton)`
  margin-top: 15px;
  margin-bottom: 10px;

  ${media.biggerThanMinTablet`
    display: none;
  `}
`;

const HeaderSubtitle = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  line-height: 20px;
  font-weight: 400;
  margin-top: 3px;
`;

const HeaderDate = styled.div`
  color: #000;
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  line-height: 16px;
  white-space: nowrap;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const IdeaButtonDesktop: any = styled(IdeaButton)`
  margin-left: 20px;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const MobilePhaseNavigation = styled.div`
  display: flex;

  ${media.biggerThanMinTablet`
    display: none;
  `}
`;

const PhaseButton = styled(Button)``;

const PreviousPhaseButton = PhaseButton.extend`
  margin-right: 9px;
`;

const NextPhaseButton = PhaseButton.extend``;

const Phases = styled.div`
  width: 100%;
  max-width: 1200px;
  padding-left: ${padding}px;
  padding-right: ${padding}px;
  padding-top: 80px;
  padding-bottom: 40px;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const phaseBarHeight = '25px';

const PhaseBar: any = styled.div`
  width: 100%;
  height: calc( ${phaseBarHeight} - 1px );
  color: #fff;
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${greyTransparent};
  transition: background 60ms ease-out;
  position: relative;
  user-select: none;
`;

const PhaseArrow = styled(Icon)`
  width: 20px;
  height: ${phaseBarHeight};
  fill: #fff;
  position: absolute;
  top: 0px;
  right: -9px;
  z-index: 2;
`;

const PhaseText: any = styled.div`
  color: ${greyTransparent};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  text-align: center;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 20px;
  max-height: 60px;
  margin-top: 12px;
  padding-left: 6px;
  padding-right: 6px;
  user-select: none;
  transition: color 60ms ease-out;
`;

const selectedPhaseBar = css`
  ${PhaseBar} { background: ${greyOpaque}; }
  ${PhaseText} { color: ${greyOpaque}; }
`;
const currentPhaseBar = css`
  ${PhaseBar} { background: ${greenTransparent}; }
  ${PhaseText} { color: ${greenTransparent}; }
`;
const currentSelectedPhaseBar = css`
  ${PhaseBar} { background: ${greenOpaque}; }
  ${PhaseText} { color: ${greenOpaque}; }
`;

const PhaseContainer: any = styled.div`
  min-width: 80px;
  flex-shrink: 1;
  flex-grow: ${(props: any) => props.numberOfDays};
  flex-basis: auto;
  display: flex;
  flex-direction: column;
  position: relative;
  cursor: pointer;
  margin-right:  ${(props: any) => !props.last ? '1px' : '0px' };

  &.first ${PhaseBar} {
    border-radius: 5px 0px 0px 5px;
  }

  &.last ${PhaseBar} {
    border-radius: 0px 5px 5px 0px;
  }

  &:hover {
    ${selectedPhaseBar}
  }

  &.currentPhase:not(.selectedPhase) {
    ${currentPhaseBar}

    &:hover {
      ${currentSelectedPhaseBar}
    }
  }

  &.selectedPhase:not(.currentPhase) {
    ${selectedPhaseBar}
  }

  &.selectedPhase.currentPhase {
    ${currentSelectedPhaseBar}
  }
`;

type Props = {
  projectId: string
  onPhaseSelected: (phaseId: string | null) => void;
};

type State = {
  locale: Locale | null;
  currentTenant: ITenant | null;
  phases: IPhases | null;
  currentPhaseId: string | null;
  selectedPhaseId: string | null;
  loaded: boolean;
};

export default class Timeline extends PureComponent<Props, State> {
  initialState: State;
  projectId$: BehaviorSubject<string | null>;
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    const initialState = {
      locale: null,
      currentTenant: null,
      phases: null,
      currentPhaseId: null,
      selectedPhaseId: null,
      loaded: false
    };
    this.initialState = initialState;
    this.state = initialState;
    this.subscriptions = [];
    this.projectId$ = new BehaviorSubject(null);
  }

  componentDidMount() {
    this.projectId$.next(this.props.projectId);

    const projectId$ = this.projectId$.pipe(distinctUntilChanged());
    const locale$ = localeStream().observable;
    const currentTenant$ = currentTenantStream().observable;

    this.subscriptions = [
      projectId$
        .pipe(
          tap(() => this.setState(this.initialState)),
          filter(projectId => isString(projectId)),
          switchMap((projectId: string) => {
            const phases$ = phasesStream(projectId).observable;

            return combineLatest(
              locale$,
              currentTenant$,
              phases$
            );
          })
        )
        .subscribe(([locale, currentTenant, phases]) => {
          const currentPhase = getCurrentPhase(phases.data);
          const currentPhaseId = currentPhase ? currentPhase.id : null;
          const selectedPhaseId = this.getDefaultSelectedPhaseId(currentPhaseId, phases);
          this.setSelectedPhaseId(selectedPhaseId);
          this.setState({ locale, currentTenant, phases, currentPhaseId, loaded: true });
        })
    ];
  }

  componentDidUpdate(_prevProps: Props, _prevState: State) {
    this.projectId$.next(this.props.projectId);
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getDefaultSelectedPhaseId(currentPhaseId: string | null, phases: IPhases | null) {
    let selectedPhaseId: string | null = null;

    if (isString(currentPhaseId)) {
      selectedPhaseId = currentPhaseId;
    } else if (phases && phases.data.length > 0) {
      forEach(phases.data, (phase) => {
        const phaseTime = pastPresentOrFuture([phase.attributes.start_at, phase.attributes.end_at]);

        if (phaseTime === 'present' || phaseTime === 'future') {
          selectedPhaseId = phase.id;
          return false;
        }

        return true;
      });

      if (!selectedPhaseId) {
        selectedPhaseId = phases.data[phases.data.length - 1].id;
      }
    }

    return selectedPhaseId;
  }

  setSelectedPhaseId = (selectedPhaseId: string | null) => {
    this.props.onPhaseSelected(selectedPhaseId);
    this.setState({ selectedPhaseId });
  }

  handleOnPhaseSelection = (phaseId: string) => (event: FormEvent<MouseEvent>) => {
    event.preventDefault();
    this.setSelectedPhaseId(phaseId);
  }

  handleOnPhaseSelectionFromDropdown = (phaseId: string) => {
    this.setSelectedPhaseId(phaseId);
  }

  goToNextPhase = () => {
    // todo
  }

  goToPreviousPhase = () => {
    // todo
  }

  render() {
    const className = this.props['className'];
    const { locale, currentTenant, phases, currentPhaseId, selectedPhaseId } = this.state;

    if (locale && currentTenant && phases && phases.data.length > 0) {
      const phaseIds = (phases ? phases.data.map(phase => phase.id) : null);
      const currentTenantLocales = currentTenant.data.attributes.settings.core.locales;
      const selectedPhase = (selectedPhaseId ? phases.data.find(phase => phase.id === selectedPhaseId) : null);
      const selectedPhaseStart = (selectedPhase ? moment(selectedPhase.attributes.start_at, 'YYYY-MM-DD').format('LL') : null);
      const selectedPhaseEnd = (selectedPhase ? moment(selectedPhase.attributes.end_at, 'YYYY-MM-DD').format('LL') : null);
      const selectedPhaseTitle = (selectedPhase ? getLocalized(selectedPhase.attributes.title_multiloc, locale, currentTenantLocales) : null);
      const selectedPhaseNumber = (selectedPhase ? indexOf(phaseIds, selectedPhaseId) + 1 : null);
      const isSelected = (selectedPhaseId !== null);
      const phaseStatus = (selectedPhase && pastPresentOrFuture([selectedPhase.attributes.start_at, selectedPhase.attributes.end_at]));

      return (
        <Container className={className}>
          <ContainerInner>
            <Header>
              <HeaderSectionsWrapper>
                <HeaderLeftSection>
                  <PhaseSummary>
                    {isSelected &&
                      <PhaseNumberWrapper className={`${isSelected && 'selected'} ${phaseStatus}`}>
                        <PhaseNumber className={`${isSelected && 'selected'} ${phaseStatus}`}>
                          {selectedPhaseNumber}
                        </PhaseNumber>
                      </PhaseNumberWrapper>
                    }

                    <HeaderTitleWrapper>
                      <HeaderTitle className={`${isSelected && 'selected'} ${phaseStatus}`}>
                        {selectedPhaseTitle || <FormattedMessage {...messages.noPhaseSelected} />}
                      </HeaderTitle>
                      <MobileDate>
                        {phaseStatus === 'past' && (
                          <FormattedMessage {...messages.endedOn} values={{ date: selectedPhaseEnd }} />
                        )}

                        {phaseStatus === 'present' && (
                          <FormattedMessage {...messages.endsOn} values={{ date: selectedPhaseEnd }} />
                        )}

                        {phaseStatus === 'future' && (
                          <FormattedMessage {...messages.startsOn} values={{ date: selectedPhaseStart }} />
                        )}
                      </MobileDate>
                    </HeaderTitleWrapper>
                  </PhaseSummary>
                </HeaderLeftSection>

                <HeaderRightSection>
                  <HeaderDate>
                    {isSelected &&
                      <HeaderSubtitle>
                        {phaseStatus === 'past' && (
                          <FormattedMessage {...messages.endedOn} values={{ date: selectedPhaseEnd }} />
                        )}

                        {phaseStatus === 'present' && (
                          <FormattedMessage {...messages.endsOn} values={{ date: selectedPhaseEnd }} />
                        )}

                        {phaseStatus === 'future' && (
                          <FormattedMessage {...messages.startsOn} values={{ date: selectedPhaseStart }} />
                        )}
                      </HeaderSubtitle>
                    }
                  </HeaderDate>

                  <IdeaButtonDesktop
                    size="1"
                    projectId={this.props.projectId}
                    phaseId={selectedPhaseId}
                  />

                  <MobilePhaseNavigation>
                    <PreviousPhaseButton
                      onClick={this.goToPreviousPhase}
                      icon="chevron-left"
                      style="secondary"
                      padding="10px 6px"
                      disabled={false}
                    />
                    <NextPhaseButton
                      onClick={this.goToNextPhase}
                      icon="chevron-right"
                      style="secondary"
                      padding="10px 6px"
                      disabled={false}
                    />
                  </MobilePhaseNavigation>
                </HeaderRightSection>
              </HeaderSectionsWrapper>

              <IdeaButtonMobile
                size="1"
                projectId={this.props.projectId}
                phaseId={selectedPhaseId}
              />
            </Header>

            <Phases>
              {phases.data.map((phase, index) => {
                const phaseTitle = getLocalized(phase.attributes.title_multiloc, locale, currentTenantLocales);
                const isFirst = (index === 0);
                const isLast = (index === phases.data.length - 1);
                const startIsoDate = getIsoDate(phase.attributes.start_at);
                const endIsoDate = getIsoDate(phase.attributes.end_at);
                const startMoment = moment(startIsoDate, 'YYYY-MM-DD');
                const endMoment = moment(endIsoDate, 'YYYY-MM-DD');
                const isCurrentPhase = (phase.id === currentPhaseId);
                const isSelectedPhase = (phase.id === selectedPhaseId);
                const numberOfDays = Math.abs(startMoment.diff(endMoment, 'days')) + 1;

                return (
                  <PhaseContainer
                    className={`${isFirst && 'first'} ${isLast && 'last'} ${isCurrentPhase && 'currentPhase'} ${isSelectedPhase && 'selectedPhase'}`}
                    key={index}
                    numberOfDays={numberOfDays}
                    onClick={this.handleOnPhaseSelection(phase.id)}
                  >
                    <PhaseBar>
                      {index + 1}
                      {!isLast && <PhaseArrow name="phase_arrow" />}
                    </PhaseBar>
                    <PhaseText
                      current={isCurrentPhase}
                      selected={isSelectedPhase}
                    >
                      {phaseTitle}
                    </PhaseText>
                  </PhaseContainer>
                );
              })}
            </Phases>
          </ContainerInner>
        </Container>
      );
    }

    return null;
  }
}
