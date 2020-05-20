import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty, get, isNumber, round } from 'lodash-es';
import moment from 'moment';
import Observer from '@researchgate/react-intersection-observer';
import bowser from 'bowser';

// router
import Link from 'utils/cl-router/Link';

// components
import Icon from 'components/UI/Icon';
import LazyImage from 'components/LazyImage';
import AvatarBubbles from 'components/AvatarBubbles';

// services
import { getProjectUrl } from 'services/projects';
import { getIdeaPostingRules } from 'services/ideaPostingRules';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetProjectImages, { GetProjectImagesChildProps } from 'resources/GetProjectImages';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';

// i18n
import T from 'components/T';
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage } from 'utils/cl-intl';
import injectIntl from 'utils/cl-intl/injectIntl';
import messages from './messages';

// tracking
import { trackEventByName } from 'utils/analytics';
import tracks from './tracks';

// style
import styled, { withTheme } from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { ScreenReaderOnly } from 'utils/a11y';
import { rgba, darken } from 'polished';

const Container = styled(Link)`
  width: calc(33% - 12px);
  min-height: 560px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;
  cursor: pointer;
  background: #fff;
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-shadow: 0px 2px 2px -1px rgba(152, 162, 179, 0.3), 0px 1px 5px -2px rgba(152, 162, 179, 0.3);

  &.large {
    width: 100%;
    min-height: 450px;
    flex-direction: row;
    align-items: stretch;
    justify-content: space-between;

    ${media.smallerThanMinTablet`
      width: 100%;
    `}
  }

  &.medium {
    width: calc(50% - 13px);
    min-height: 580px;
    padding-left: 30px;
    padding-right: 30px;

    ${media.smallerThanMinTablet`
      width: 100%;
    `}
  }

  &.small {
    &.threecolumns {
      ${media.smallerThanMaxTablet`
        width: calc(50% - 13px);
      `}

      ${media.smallerThanMinTablet`
        width: 100%;
        min-height: 460px;
      `}
    }

    ${media.smallerThanMinTablet`
      min-height: 400px;
    `}
  }

  &.small,
  &.medium {
    padding-top: 20px;
    padding-bottom: 30px;
  }

  &.desktop {
    transition: all 180ms ease-out;

    &:hover {
      box-shadow: 0px 4px 12px 0px rgba(152, 162, 179, 0.35), 0px 2px 2px -1px rgba(152, 162, 179, 0.3);
      transform: translate(0px, -2px);
    }
  }

  ${media.smallerThanMinTablet`
    width: 100%;
    min-height: 460px;
  `}
`;

const ProjectImageContainer =  styled.div`
  width: 100%;
  height: 254px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 254px;
  display: flex;
  margin-right: 10px;
  overflow: hidden;
  position: relative;

  &.large {
    width: 50%;
    height: 100%;
    flex-basis: 50%;
    border-top-left-radius: 4px;
    border-bottom-left-radius: 4px;
  }
`;

const ProjectImagePlaceholder = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${colors.placeholderBg};
`;

const ProjectImagePlaceholderIcon = styled(Icon) `
  height: 45px;
  fill: #fff;
`;

const ProjectImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
`;

const ProjectContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  &.large {
    padding-top: 18px;
    padding-bottom: 35px;
    padding-left: 68px;
    padding-right: 32px;

    ${media.smallerThanMaxTablet`
      padding-left: 20px;
      padding-right: 20px;
    `}
  }

  &.small {
    padding-left: 30px;
    padding-right: 30px;

    ${media.smallerThanMinTablet`
      padding-left: 20px;
      padding-right: 20px;
    `};
  }
`;

const ContentHeaderHeight = 39;
const ContentHeaderBottomMargin = 13;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  &.noContent {
    ${media.biggerThanMinTablet`
      height: ${ContentHeaderHeight + ContentHeaderBottomMargin}px;
    `}
  }

  &.hasRightContent.noLeftContent {
    justify-content: flex-end;
  }

  &.hasContent {
    margin-bottom: ${ContentHeaderBottomMargin}px;

    &.large {
      margin-bottom: 0px;
      padding-bottom: ${ContentHeaderBottomMargin}px;
      border-bottom: solid 1px #e8e8e8;
    }
  }

  &.small {
    padding-left: 30px;
    padding-right: 30px;

    ${media.smallerThanMinTablet`
      padding-left: 20px;
      padding-right: 20px;
    `}

    ${media.smallPhone`
      padding-left: 10px;
      padding-right: 10px;
    `}
  }
`;

const ContentHeaderLeft = styled.div`
  min-height: ${ContentHeaderHeight}px;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 140px;
  margin-right: 15px;
`;

const ContentHeaderRight = styled.div`
  min-height: ${ContentHeaderHeight}px;
`;

const Countdown = styled.div`
  margin-top: 4px;
`;

const TimeRemaining = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  margin-bottom: 8px;
`;

const ProgressBar = styled.div`
  width: 100%;
  max-width: 130px;
  height: 5px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  background: #d6dade;
`;

const ProgressBarOverlay: any = styled.div`
  width: 0px;
  height: 100%;
  border-radius: ${(props: any) => props.theme.borderRadius};
  background: ${colors.clRed};
  transition: width 1000ms cubic-bezier(0.19, 1, 0.22, 1);
  will-change: width;

  &.visible {
    width: ${(props: any) => props.progress}%;
  }
`;

const ProjectLabel = styled.div`
  // darkened to have higher chances of solid color contrast
  color: ${({ theme }) => darken(0.05, theme.colorSecondary)};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  padding-left: 16px;
  padding-right: 16px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: ${(props: any) => props.theme.borderRadius};
  background: ${({ theme }) => rgba(theme.colorSecondary, 0.1)};
  transition: all 200ms ease;
  cursor: pointer;

  &:hover {
    color: ${({ theme }) => darken(0.2, theme.colorSecondary)};
    background: ${({ theme }) => rgba(theme.colorSecondary, 0.15)};
  }
`;

const ContentBody = styled.div`
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  &.large {
    max-width: 400px;
    justify-content: center;
  }
`;

const ProjectTitle = styled.h3`
  line-height: normal;
  font-weight: 500;
  font-size: ${fontSizes.xl}px;
  color: ${({ theme }) => theme.colorText};
  margin: 0;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectDescription = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.base}px;
  line-height: normal;
  font-weight: 300;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  margin-top: 15px;
`;

const ContentFooter = styled.div`
  height: 53px;
  flex-shrink: 0;
  flex-grow: 0;
  flex-basis: 53px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 16px;
  margin-top: 30px;
  border-top: solid 1px #e8e8e8;

  &.hidden {
    border: none;

    &.large {
      margin-top: 0px;
    }

    &:not(.large) {
      ${media.smallerThanMinTablet`
        height: 20px;
        flex-basis: 20px;
        margin: 0px;
        padding: 0px;
      `}
    }
  }
`;

const ContentFooterSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ContentFooterLeft = styled(ContentFooterSection)``;

const ContentFooterRight = styled(ContentFooterSection)``;

const ContentHeaderLabel = styled.span`
  height: ${ContentHeaderHeight}px;
  color: ${colors.label};
  font-size: ${fontSizes.small}px;
  font-weight: 500;
  text-transform: uppercase;
  display: flex;
  align-items: center;
`;

const ProjectMetaItems = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  display: flex;
`;

const MetaItem = styled.div`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  margin-left: 24px;

  &.first {
    margin-left: 0px;
  }

  ${media.smallerThanMinTablet`
    margin-left: 20px;
  `};
`;

const MetaItemIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colorMain};
`;

const CommentIcon = styled(MetaItemIcon)`
  width: 23px;
  height: 23px;
`;

const MetaItemText = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  margin-left: 3px;
`;

export interface InputProps {
  projectId: string;
  size: 'small' | 'medium' | 'large';
  layout?: 'dynamic' | 'threecolumns' | 'twocolumns';
  className?: string;
}

interface DataProps {
  project: GetProjectChildProps;
  projectImages: GetProjectImagesChildProps;
  authUser: GetAuthUserChildProps;
  phase: GetPhaseChildProps;
}

interface Props extends InputProps, DataProps {
  theme?: any;
}

interface State {
  visible: boolean;
}

class ProjectCard extends PureComponent<Props & InjectedIntlProps, State> {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    };
  }

  handleIntersection = (event: IntersectionObserverEntry, unobserve: () => void) => {
    if (event.isIntersecting) {
      this.setState({ visible: true });
      unobserve();
    }
  }

  handleProjectCardOnClick = (projectId: string) => () => {
    trackEventByName(tracks.clickOnProjectCard, { extra: { projectId } });
  }

  handleCTAOnClick = (projectId: string) => () => {
    trackEventByName(tracks.clickOnProjectCardCTA, { extra: { projectId } });
  }

  handleProjectTitleOnClick = (projectId: string) => () => {
    trackEventByName(tracks.clickOnProjectTitle, { extra: { projectId } });
  }

  render() {
    const { visible } = this.state;
    const { authUser, project, phase, size, projectImages, intl: { formatMessage }, layout, className } = this.props;

    if (!isNilOrError(project)) {
      const postingPermission = getIdeaPostingRules({ project, phase, authUser });
      const participationMethod = (!isNilOrError(phase) ? phase.attributes.participation_method : project.attributes.participation_method);
      const canPost = !!((!isNilOrError(phase) ? phase.attributes.posting_enabled : project.attributes.posting_enabled) && postingPermission.enabled);
      const canVote = !!((!isNilOrError(phase) ? phase.attributes.voting_enabled : project.attributes.voting_enabled) && get(project, 'attributes.action_descriptor.voting.enabled'));
      const canComment = !!((!isNilOrError(phase) ? phase.attributes.commenting_enabled : project.attributes.commenting_enabled) && get(project, 'attributes.action_descriptor.commenting.enabled'));
      const imageUrl = (!isNilOrError(projectImages) && projectImages.length > 0 ? projectImages[0].attributes.versions.medium : null);
      const projectUrl = getProjectUrl(project);
      const isFinished = (project.attributes.timeline_active === 'past');
      const isArchived = (project.attributes.publication_status === 'archived');
      const ideasCount = project.attributes.ideas_count;
      const commentsCount = project.attributes.comments_count;
      const hasAvatars = (project.relationships.avatars && project.relationships.avatars.data && project.relationships.avatars.data.length > 0);
      const showIdeasCount = !(project.attributes.process_type === 'continuous' && project.attributes.participation_method !== 'ideation') && ideasCount > 0;
      const showCommentsCount = (commentsCount > 0);
      const showFooter = (hasAvatars || showIdeasCount || showCommentsCount);
      const avatarIds = (project.relationships.avatars && project.relationships.avatars.data ? project.relationships.avatars.data.map(avatar => avatar.id) : []);
      const startAt = get(phase, 'attributes.start_at');
      const endAt = get(phase, 'attributes.end_at');
      const timeRemaining = (endAt ? moment.duration(moment(endAt).endOf('day').diff(moment())).humanize() : null);
      let countdown: JSX.Element | null = null;
      let ctaMessage: JSX.Element | null = null;

      if (isArchived) {
        countdown = (
          <ContentHeaderLabel className="e2e-project-card-archived-label">
            <FormattedMessage {...messages.archived} />
          </ContentHeaderLabel>
        );
      } else if (isFinished) {
        countdown = (
          <ContentHeaderLabel>
            <FormattedMessage {...messages.finished} />
          </ContentHeaderLabel>
        );
      } else if (timeRemaining) {
        const totalDays = (timeRemaining ? moment.duration(moment(endAt).diff(moment(startAt))).asDays() : null);
        const pastDays = (timeRemaining ? moment.duration(moment(moment()).diff(moment(startAt))).asDays() : null);
        const progress = (timeRemaining && isNumber(pastDays) && isNumber(totalDays) ?  round((pastDays / totalDays) * 100, 1) : null);

        countdown = (
          <Countdown className="e2e-project-card-time-remaining">
            <TimeRemaining className={size}>
              <FormattedMessage {...messages.remaining} values={{ timeRemaining }} />
            </TimeRemaining>
            <Observer onChange={this.handleIntersection}>
              <ProgressBar aria-hidden>
                <ProgressBarOverlay progress={progress} className={visible ? 'visible' : ''} />
              </ProgressBar>
            </Observer>
          </Countdown>
        );
      }

      if (participationMethod === 'budgeting') {
        ctaMessage = <FormattedMessage {...messages.allocateYourBudget} />;
      } else if (participationMethod === 'information') {
        ctaMessage = <FormattedMessage {...messages.learnMore} />;
      } else if (participationMethod === 'survey') {
        ctaMessage = <FormattedMessage {...messages.takeTheSurvey} />;
      } else if (participationMethod === 'poll') {
        ctaMessage = <FormattedMessage {...messages.takeThePoll} />;
      } else if (participationMethod === 'ideation' && canPost) {
        ctaMessage = <FormattedMessage {...messages.postYourIdea} />;
      } else if (participationMethod === 'ideation' && canVote) {
        ctaMessage = <FormattedMessage {...messages.vote} />;
      } else if (participationMethod === 'ideation' && canComment) {
        ctaMessage = <FormattedMessage {...messages.comment} />;
      } else if (participationMethod === 'ideation') {
        ctaMessage = <FormattedMessage {...messages.viewTheIdeas} />;
      }

      const contentHeader = (
        <ContentHeader className={`${size} ${!ctaMessage ? 'noRightContent' : 'hasContent hasRightContent'} ${!countdown ? 'noLeftContent' : 'hasContent hasLeftContent'} ${!ctaMessage && !countdown ? 'noContent' : ''}`}>
          {countdown !== null &&
            <ContentHeaderLeft className={size}>
              {countdown}
            </ContentHeaderLeft>
          }

          {ctaMessage !== null && !isFinished && !isArchived &&
            <ContentHeaderRight className={`${size} ${countdown ? 'hasProgressBar' : ''}`}>
              <ProjectLabel onClick={this.handleCTAOnClick(project.id)} className="e2e-project-card-cta">
                {ctaMessage}
              </ProjectLabel>
            </ContentHeaderRight>
          }
        </ContentHeader>
      );

      const screenReaderContent = (
        <ScreenReaderOnly>
          <ProjectTitle>
            <FormattedMessage {...messages.a11y_projectTitle} />
            <T value={project.attributes.title_multiloc} />
          </ProjectTitle>

          <ProjectDescription>
            <FormattedMessage {...messages.a11y_projectDescription} />
            <T value={project.attributes.description_preview_multiloc} />
          </ProjectDescription>
        </ScreenReaderOnly>
      );

      return (
        <Container
          className={`${className} ${layout} ${size} ${isArchived ? 'archived' : ''} ${!(bowser.mobile || bowser.tablet) ? 'desktop' : 'mobile'} e2e-project-card e2e-admin-publication-card`}
          to={projectUrl}
          onClick={this.handleProjectCardOnClick(project.id)}
        >
          {screenReaderContent}
          {size !== 'large' && contentHeader}

          <ProjectImageContainer className={size}>
            <ProjectImagePlaceholder>
              <ProjectImagePlaceholderIcon name="project" />
            </ProjectImagePlaceholder>

            {imageUrl &&
              <ProjectImage
                src={imageUrl}
                alt=""
                cover={true}
              />
            }
          </ProjectImageContainer>

          <ProjectContent className={size}>
            {size === 'large' && contentHeader}

            <ContentBody className={size} aria-hidden>
              <ProjectTitle className="e2e-project-card-project-title" onClick={this.handleProjectTitleOnClick(project.id)}>
                <T value={project.attributes.title_multiloc} />
              </ProjectTitle>

              <T value={project.attributes.description_preview_multiloc}>
                {(description) => {
                  if (!isEmpty(description)) {
                    return (
                      <ProjectDescription className="e2e-project-card-project-description-preview">
                        {description}
                      </ProjectDescription>
                    );
                  }

                  return null;
                }}
              </T>
            </ContentBody>

            <ContentFooter className={`${size} ${!showFooter ? 'hidden' : ''}`}>
              <ContentFooterLeft>
                {hasAvatars &&
                  <AvatarBubbles
                    size={32}
                    limit={3}
                    userCountBgColor={this.props.theme.colorMain}
                    avatarIds={avatarIds}
                    userCount={project.attributes.avatars_count}
                  />
                }
              </ContentFooterLeft>

              <ContentFooterRight>
                <ProjectMetaItems>
                  {showIdeasCount &&
                    <MetaItem className="first">
                      <MetaItemIcon ariaHidden name="idea2" />
                      <MetaItemText aria-hidden>
                        {ideasCount}
                      </MetaItemText>
                      <ScreenReaderOnly>
                        {formatMessage(messages.xIdeas, { ideasCount })}
                      </ScreenReaderOnly>
                    </MetaItem>
                  }

                  {showCommentsCount &&
                    <MetaItem>
                      <CommentIcon ariaHidden name="comments" />
                      <MetaItemText aria-hidden>
                        {commentsCount}
                      </MetaItemText>
                      <ScreenReaderOnly>
                        {formatMessage(messages.xComments, { commentsCount })}
                      </ScreenReaderOnly>
                    </MetaItem>
                  }
                </ProjectMetaItems>
              </ContentFooterRight>
            </ContentFooter>
          </ProjectContent>
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  project: ({ projectId, render }) => <GetProject projectId={projectId}>{render}</GetProject>,
  projectImages: ({ projectId, render }) => <GetProjectImages projectId={projectId}>{render}</GetProjectImages>,
  phase: ({ project, render }) => <GetPhase id={get(project, 'relationships.current_phase.data.id')}>{render}</GetPhase>
});

const ProjectCardWithHoC = withTheme(injectIntl<Props>(ProjectCard));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => {
      const props = { ...inputProps, ...dataProps };
      return <ProjectCardWithHoC {...props} />;
    }}
  </Data>
);
