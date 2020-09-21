import React, { PureComponent, lazy, Suspense } from 'react';
import { sortBy, last, isUndefined, isString } from 'lodash-es';
import { isNilOrError, getFormattedBudget } from 'utils/helperUtils';
import { adopt } from 'react-adopt';

// typings
import { IParticipationContextType } from 'typings';

// analytics
import { trackEvent } from 'utils/analytics';
import tracks from './tracks';

// router
import { withRouter, WithRouterProps } from 'react-router';

// components
import IdeaSharingButton from './Buttons/IdeaSharingButton';
import IdeaMeta from './IdeaMeta';
import Title from 'components/PostShowComponents/Title';
import IdeaProposedBudget from './IdeaProposedBudget';
import Body from 'components/PostShowComponents/Body';
import Image from 'components/PostShowComponents/Image';
import OfficialFeedback from 'components/PostShowComponents/OfficialFeedback';
import Modal from 'components/UI/Modal';
import AssignBudgetWrapper from './CTABox/ParticipatoryBudgetingCTABox/BudgetAssignment/AssignBudgetWrapper';
import SharingModalContent from 'components/PostShowComponents/SharingModalContent';
import FeatureFlag from 'components/FeatureFlag';
import PostedBy from './PostedBy';
import IdeaMoreActions from './IdeaMoreActions';
import { Spinner } from 'cl2-component-library';
import ProjectLink from './ProjectLink';
import TranslateButton from 'components/UI/TranslateButton';
import PlatformFooter from 'containers/PlatformFooter';
const LazyComments = lazy(() =>
  import('components/PostShowComponents/Comments')
);
import LoadingComments from 'components/PostShowComponents/Comments/LoadingComments';
import MetaInformation from './MetaInformation';
import MobileSharingButtonComponent from './Buttons/MobileSharingButtonComponent';
import RightColumnDesktop from './RightColumnDesktop';

// utils
import { pastPresentOrFuture } from 'utils/dateUtils';
import isFieldEnabled from './isFieldEnabled';

// resources
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetIdeaImages, {
  GetIdeaImagesChildProps,
} from 'resources/GetIdeaImages';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetIdea, { GetIdeaChildProps } from 'resources/GetIdea';
import GetPhases, { GetPhasesChildProps } from 'resources/GetPhases';
import GetWindowSize, {
  GetWindowSizeChildProps,
} from 'resources/GetWindowSize';
import GetOfficialFeedbacks, {
  GetOfficialFeedbacksChildProps,
} from 'resources/GetOfficialFeedbacks';
import GetPermission, {
  GetPermissionChildProps,
} from 'resources/GetPermission';
import GetIdeaCustomFieldsSchemas, {
  GetIdeaCustomFieldsSchemasChildProps,
} from 'resources/GetIdeaCustomFieldsSchemas';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';

// i18n
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage } from 'utils/cl-intl';
import injectIntl from 'utils/cl-intl/injectIntl';
import messages from './messages';
import injectLocalize, { InjectedLocalized } from 'utils/localize';

// animations
import CSSTransition from 'react-transition-group/CSSTransition';

// style
import styled from 'styled-components';
import { media, viewportWidths } from 'utils/styleUtils';
import { ScreenReaderOnly } from 'utils/a11y';
import {
  columnsGapDesktop,
  columnsGapTablet,
  pageContentMaxWidth,
} from './styleConstants';

const contentFadeInDuration = 250;
const contentFadeInEasing = 'cubic-bezier(0.19, 1, 0.22, 1)';
const contentFadeInDelay = 150;

const Loading = styled.div`
  width: 100vw;
  height: calc(100vh - ${(props) => props.theme.menuHeight}px);
  display: flex;
  align-items: center;
  justify-content: center;

  ${media.smallerThanMaxTablet`
    height: calc(100vh - ${(props) => props.theme.mobileTopBarHeight}px);
  `}
`;

const Container = styled.main<{ insideModal: boolean }>`
  display: flex;
  flex-direction: column;
  min-height: calc(
    100vh -
      ${(props) =>
        props.insideModal
          ? props.theme.menuHeight
          : props.theme.menuHeight + props.theme.footerHeight}px
  );
  background: #fff;
  opacity: 0;

  ${media.smallerThanMaxTablet`
    min-height: calc(100vh - ${(props) =>
      props.insideModal
        ? props.theme.mobileMenuHeight
        : props.theme.mobileMenuHeight}px - ${(props) =>
    props.theme.mobileTopBarHeight}px);
  `}

  &.content-enter {
    opacity: 0;

    &.content-enter-active {
      opacity: 1;
      transition: opacity ${contentFadeInDuration}ms ${contentFadeInEasing}
        ${contentFadeInDelay}ms;
    }
  }

  &.content-enter-done {
    opacity: 1;
  }
`;

const IdeaContainer = styled.div`
  width: 100%;
  max-width: ${pageContentMaxWidth}px;
  display: flex;
  flex-direction: column;
  margin: 0;
  margin-left: auto;
  margin-right: auto;
  padding: 0;
  padding-top: 60px;
  padding-left: 60px;
  padding-right: 60px;
  position: relative;

  ${media.smallerThanMaxTablet`
    padding-top: 35px;
  `}

  ${media.smallerThanMinTablet`
    padding-top: 25px;
    padding-left: 15px;
    padding-right: 15px;
  `}
`;

const Content = styled.div`
  width: 100%;
  display: flex;

  ${media.smallerThanMaxTablet`
    display: block;
  `}
`;

const LeftColumn = styled.div`
  flex: 2;
  margin: 0;
  padding: 0;
  padding-right: ${columnsGapDesktop}px;

  ${media.tablet`
    padding-right: ${columnsGapTablet}px;
  `}

  ${media.smallerThanMaxTablet`
    padding: 0;
  `}
`;

const StyledTranslateButton = styled(TranslateButton)`
  margin-bottom: 20px;
`;

const IdeaHeader = styled.div`
  margin-top: -5px;
  margin-bottom: 28px;

  ${media.smallerThanMaxTablet`
    margin-top: 0px;
    margin-bottom: 45px;
  `}
`;

const StyledProjectLink = styled(ProjectLink)`
  margin-bottom: 70px;
  display: block;
`;

export const BodySectionTitle = styled.h2`
  font-size: ${(props) => props.theme.fontSizes.medium}px;
  font-weight: 400;
  line-height: 28px;
`;

const StyledBody = styled(Body)`
  margin-bottom: 40px;
`;

const StyledIdeaProposedBudget = styled(IdeaProposedBudget)`
  margin-bottom: 20px;
`;

const MobileMetaInformation = styled(MetaInformation)`
  ${media.biggerThanMaxTablet`
    display: none;
  `}
`;

const AuthorActionsContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 25px;
`;

const StyledIdeaMoreActions = styled(IdeaMoreActions)`
  margin-left: auto;
`;

const AssignBudgetControlMobile = styled.div`
  margin-top: 40px;
  margin-bottom: 40px;

  ${media.biggerThanMaxTablet`
    display: none;
  `}
`;

const MobileIdeaSharingButton = styled(IdeaSharingButton)`
  ${media.biggerThanMaxTablet`
    display: none;
  `}
`;

const StyledOfficialFeedback = styled(OfficialFeedback)`
  margin-top: 80px;
  margin-bottom: 80px;
`;

const Comments = styled.div`
  margin-bottom: 120px;
`;

interface DataProps {
  idea: GetIdeaChildProps;
  locale: GetLocaleChildProps;
  project: GetProjectChildProps;
  phases: GetPhasesChildProps;
  ideaImages: GetIdeaImagesChildProps;
  windowSize: GetWindowSizeChildProps;
  officialFeedbacks: GetOfficialFeedbacksChildProps;
  postOfficialFeedbackPermission: GetPermissionChildProps;
  ideaCustomFieldsSchemas: GetIdeaCustomFieldsSchemasChildProps;
  tenant: GetTenantChildProps;
}

interface InputProps {
  ideaId: string | null;
  projectId: string;
  insideModal?: boolean;
  className?: string;
}

interface Props extends DataProps, InputProps {}

interface IActionInfos {
  participationContextType: IParticipationContextType | null;
  participationContextId: string | null;
  budgetingDescriptor: any | null;
  showBudgetControl: boolean | null;
  showVoteControl: boolean | null;
}

interface State {
  loaded: boolean;
  spamModalVisible: boolean;
  ideaIdForSocialSharing: string | null;
  translateButtonClicked: boolean;
  actionInfos: IActionInfos | null;
}

export class IdeasShow extends PureComponent<
  Props & InjectedIntlProps & InjectedLocalized & WithRouterProps,
  State
> {
  constructor(props) {
    super(props);
    this.state = {
      loaded: false,
      spamModalVisible: false,
      ideaIdForSocialSharing: null,
      translateButtonClicked: false,
      actionInfos: null,
    };
  }

  componentDidMount() {
    const newIdeaId = this.props.location.query?.['new_idea_id'];

    this.setLoaded();

    if (isString(newIdeaId)) {
      setTimeout(() => {
        this.setState({ ideaIdForSocialSharing: newIdeaId });
      }, 1500);

      window.history.replaceState(null, '', window.location.pathname);
    }
  }

  componentDidUpdate() {
    this.setLoaded();
  }

  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    const { actionInfos } = prevState;
    const { idea, project, phases } = nextProps;
    let stateToUpdate: Partial<State> | null = null;

    if (
      !actionInfos &&
      !isNilOrError(idea) &&
      !isNilOrError(project) &&
      !isUndefined(phases)
    ) {
      const upvotesCount = idea.attributes.upvotes_count;
      const downvotesCount = idea.attributes.downvotes_count;
      const votingEnabled = idea.attributes.action_descriptor.voting.enabled;
      const votingDisabledReason =
        idea.attributes.action_descriptor.voting.disabled_reason;
      const cancellingEnabled =
        idea.attributes.action_descriptor.voting.cancelling_enabled;
      const votingFutureEnabled =
        idea.attributes.action_descriptor.voting.future_enabled;
      const pbProject =
        project.attributes.process_type === 'continuous' &&
        project.attributes.participation_method === 'budgeting'
          ? project
          : null;
      const pbPhase =
        !pbProject && !isNilOrError(phases)
          ? phases.find(
              (phase) => phase.attributes.participation_method === 'budgeting'
            )
          : null;
      const pbPhaseIsActive =
        pbPhase &&
        pastPresentOrFuture([
          pbPhase.attributes.start_at,
          pbPhase.attributes.end_at,
        ]) === 'present';
      const lastPhase = !isNilOrError(phases)
        ? last(sortBy(phases, [(phase) => phase.attributes.end_at]))
        : null;
      const lastPhaseHasPassed = lastPhase
        ? pastPresentOrFuture([
            lastPhase.attributes.start_at,
            lastPhase.attributes.end_at,
          ]) === 'past'
        : false;
      const pbPhaseIsLast = pbPhase && lastPhase && lastPhase.id === pbPhase.id;
      const showBudgetControl = !!(
        pbProject ||
        (pbPhase && (pbPhaseIsActive || (lastPhaseHasPassed && pbPhaseIsLast)))
      );
      const shouldVerify =
        !votingEnabled && votingDisabledReason === 'not_verified';
      const verifiedButNotPermitted =
        !shouldVerify && votingDisabledReason === 'not_permitted';
      const showVoteControl = !!(
        !showBudgetControl &&
        (votingEnabled ||
          cancellingEnabled ||
          votingFutureEnabled ||
          upvotesCount > 0 ||
          downvotesCount > 0 ||
          shouldVerify ||
          verifiedButNotPermitted)
      );
      const budgetingDescriptor =
        idea?.attributes?.action_descriptor?.budgeting || null;
      let participationContextType: IParticipationContextType | null = null;
      let participationContextId: string | null = null;

      if (pbProject) {
        participationContextType = 'project';
      } else if (pbPhase) {
        participationContextType = 'phase';
      }

      if (!isNilOrError(pbProject)) {
        participationContextId = pbProject.id;
      } else if (!isNilOrError(pbPhase)) {
        participationContextId = pbPhase.id;
      }

      stateToUpdate = {
        ...(stateToUpdate || {}),
        actionInfos: {
          participationContextType,
          participationContextId,
          budgetingDescriptor,
          showBudgetControl,
          showVoteControl,
        },
      };
    }

    return stateToUpdate;
  }

  setLoaded = () => {
    const { loaded } = this.state;
    const { idea, ideaImages, project, officialFeedbacks } = this.props;

    if (
      !loaded &&
      !isNilOrError(idea) &&
      !isUndefined(ideaImages) &&
      !isNilOrError(project) &&
      !isUndefined(officialFeedbacks.officialFeedbacksList)
    ) {
      this.setState({ loaded: true });
    }
  };

  closeIdeaSocialSharingModal = () => {
    this.setState({ ideaIdForSocialSharing: null });
  };

  onTranslateIdea = () => {
    this.setState((prevState) => {
      // analytics
      if (prevState.translateButtonClicked === true) {
        trackEvent(tracks.clickGoBackToOriginalIdeaCopyButton);
      } else if (prevState.translateButtonClicked === false) {
        trackEvent(tracks.clickTranslateIdeaButton);
      }

      return {
        translateButtonClicked: !prevState.translateButtonClicked,
      };
    });
  };

  render() {
    const {
      locale,
      idea,
      localize,
      ideaImages,
      windowSize,
      className,
      postOfficialFeedbackPermission,
      projectId,
      ideaCustomFieldsSchemas,
      tenant,
    } = this.props;
    const {
      loaded,
      ideaIdForSocialSharing,
      translateButtonClicked,
      actionInfos,
    } = this.state;
    const { formatMessage } = this.props.intl;
    let content: JSX.Element | null = null;

    if (
      !isNilOrError(idea) &&
      !isNilOrError(locale) &&
      !isNilOrError(tenant) &&
      !isNilOrError(ideaCustomFieldsSchemas) &&
      loaded
    ) {
      // If the user deletes their profile, authorId can be null
      const authorId = idea.relationships?.author?.data?.id || null;
      const titleMultiloc = idea.attributes.title_multiloc;
      const ideaTitle = localize(titleMultiloc);
      const statusId = idea.relationships.idea_status.data.id;
      const ideaImageLarge =
        ideaImages?.[0]?.attributes?.versions?.large || null;
      const ideaId = idea.id;
      const proposedBudget = idea.attributes?.proposed_budget;
      const ideaBody = localize(idea?.attributes?.body_multiloc);
      const participationContextType =
        actionInfos?.participationContextType || null;
      const participationContextId =
        actionInfos?.participationContextId || null;
      const budgetingDescriptor = actionInfos?.budgetingDescriptor || null;
      const showBudgetControl = actionInfos?.showBudgetControl || null;
      const showVoteControl = actionInfos?.showVoteControl || null;
      const biggerThanLargeTablet = windowSize
        ? windowSize > viewportWidths.largeTablet
        : false;
      const smallerThanLargeTablet = windowSize
        ? windowSize <= viewportWidths.largeTablet
        : false;
      const proposedBudgetEnabled = isFieldEnabled(
        'proposed_budget',
        ideaCustomFieldsSchemas,
        locale
      );

      const showTranslateButton =
        !isNilOrError(idea) &&
        !isNilOrError(locale) &&
        !idea.attributes.title_multiloc[locale];

      content = (
        <>
          <IdeaMeta ideaId={ideaId} />

          <IdeaContainer>
            <StyledProjectLink projectId={projectId} />

            <Content id="e2e-idea-show-page-content">
              <LeftColumn>
                <IdeaHeader>
                  <Title
                    postType="idea"
                    postId={ideaId}
                    title={ideaTitle}
                    locale={locale}
                    translateButtonClicked={translateButtonClicked}
                  />
                </IdeaHeader>

                <AuthorActionsContainer>
                  <PostedBy authorId={authorId} ideaId={ideaId} />
                  <StyledIdeaMoreActions idea={idea} hasLeftMargin={true} />
                </AuthorActionsContainer>

                {ideaImageLarge && (
                  <Image src={ideaImageLarge} alt="" id="e2e-idea-image" />
                )}

                <ScreenReaderOnly>
                  <FormattedMessage
                    tagName="h2"
                    {...messages.invisibleTitleContent}
                  />
                </ScreenReaderOnly>
                <FeatureFlag name="machine_translations">
                  {showTranslateButton && (
                    <StyledTranslateButton
                      translateButtonClicked={translateButtonClicked}
                      onClick={this.onTranslateIdea}
                    />
                  )}
                </FeatureFlag>

                {proposedBudget && proposedBudgetEnabled && (
                  <>
                    <BodySectionTitle>
                      <FormattedMessage {...messages.proposedBudgetTitle} />
                    </BodySectionTitle>
                    <StyledIdeaProposedBudget
                      formattedBudget={getFormattedBudget(
                        locale,
                        proposedBudget,
                        tenant.attributes.settings.core.currency
                      )}
                    />
                    <BodySectionTitle>
                      <FormattedMessage {...messages.bodyTitle} />
                    </BodySectionTitle>
                  </>
                )}

                <StyledBody
                  postType="idea"
                  postId={ideaId}
                  locale={locale}
                  body={ideaBody}
                  translateButtonClicked={translateButtonClicked}
                />

                <MobileMetaInformation
                  ideaId={ideaId}
                  projectId={projectId}
                  statusId={statusId}
                />

                {showBudgetControl &&
                  participationContextId &&
                  participationContextType &&
                  budgetingDescriptor &&
                  smallerThanLargeTablet && (
                    <AssignBudgetControlMobile>
                      <AssignBudgetWrapper
                        ideaId={ideaId}
                        projectId={projectId}
                        participationContextId={participationContextId}
                        participationContextType={participationContextType}
                        budgetingDescriptor={budgetingDescriptor}
                      />
                    </AssignBudgetControlMobile>
                  )}

                <MobileIdeaSharingButton
                  ideaId={ideaId}
                  buttonComponent={<MobileSharingButtonComponent />}
                />

                <StyledOfficialFeedback
                  postId={ideaId}
                  postType="idea"
                  permissionToPost={postOfficialFeedbackPermission}
                />

                <Comments>
                  <Suspense fallback={<LoadingComments />}>
                    <LazyComments postId={ideaId} postType="idea" />
                  </Suspense>
                </Comments>
              </LeftColumn>

              {biggerThanLargeTablet && (
                <Suspense fallback={<Spinner />}>
                  <RightColumnDesktop
                    ideaId={ideaId}
                    projectId={projectId}
                    statusId={statusId}
                    showVoteControl={showVoteControl}
                    showBudgetControl={showBudgetControl}
                    participationContextId={participationContextId}
                    participationContextType={participationContextType}
                    budgetingDescriptor={budgetingDescriptor}
                  />
                </Suspense>
              )}
            </Content>
          </IdeaContainer>

          {this.props.insideModal && <PlatformFooter />}
        </>
      );
    }

    return (
      <>
        {!loaded && (
          <Loading>
            <Spinner />
          </Loading>
        )}

        <CSSTransition
          classNames="content"
          in={loaded}
          timeout={{
            enter: contentFadeInDuration + contentFadeInDelay,
            exit: 0,
          }}
          enter={true}
          exit={false}
        >
          <Container
            id="e2e-idea-show"
            className={className}
            insideModal={!!this.props.insideModal}
          >
            {content}
          </Container>
        </CSSTransition>

        <FeatureFlag name="ideaflow_social_sharing">
          <Modal
            opened={!!ideaIdForSocialSharing}
            close={this.closeIdeaSocialSharingModal}
            hasSkipButton={true}
            skipText={<FormattedMessage {...messages.skipSharing} />}
          >
            {ideaIdForSocialSharing && (
              <SharingModalContent
                postType="idea"
                postId={ideaIdForSocialSharing}
                title={formatMessage(messages.shareTitle)}
                subtitle={formatMessage(messages.shareSubtitle)}
              />
            )}
          </Modal>
        </FeatureFlag>
      </>
    );
  }
}

const IdeasShowWithHOCs = injectLocalize<Props>(
  injectIntl(withRouter(IdeasShow))
);

const Data = adopt<DataProps, InputProps>({
  locale: <GetLocale />,
  tenant: <GetTenant />,
  windowSize: <GetWindowSize />,
  idea: ({ ideaId, render }) => <GetIdea ideaId={ideaId}>{render}</GetIdea>,
  ideaImages: ({ ideaId, render }) => (
    <GetIdeaImages ideaId={ideaId}>{render}</GetIdeaImages>
  ),
  project: ({ projectId, render }) => (
    <GetProject projectId={projectId}>{render}</GetProject>
  ),
  phases: ({ projectId, render }) => (
    <GetPhases projectId={projectId}>{render}</GetPhases>
  ),
  officialFeedbacks: ({ ideaId, render }) => (
    <GetOfficialFeedbacks postId={ideaId} postType="idea">
      {render}
    </GetOfficialFeedbacks>
  ),
  postOfficialFeedbackPermission: ({ project, render }) => (
    <GetPermission
      item={!isNilOrError(project) ? project : null}
      action="moderate"
    >
      {render}
    </GetPermission>
  ),
  ideaCustomFieldsSchemas: ({ projectId, render }) => {
    return (
      <GetIdeaCustomFieldsSchemas projectId={projectId}>
        {render}
      </GetIdeaCustomFieldsSchemas>
    );
  },
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => <IdeasShowWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
