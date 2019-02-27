import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty, get, capitalize, isNumber, round } from 'lodash-es';
import moment from 'moment';
import Observer from '@researchgate/react-intersection-observer';

// router
import Link from 'utils/cl-router/Link';

// components
import Icon from 'components/UI/Icon';
import LazyImage, { Props as LazyImageProps } from 'components/LazyImage';
import AvatarBubbles from 'components/AvatarBubbles';

// services
import { getProjectUrl } from 'services/projects';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetProjectImages, { GetProjectImagesChildProps } from 'resources/GetProjectImages';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';
import GetAvatars, { GetAvatarsChildProps } from 'resources/GetAvatars';

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
  border-radius: 5px;
  border: solid 1px #f0f0f0;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
  transition: all 200ms ease;

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
      min-height: auto;
    `}
  }

  &.small,
  &.medium {
    padding-top: 20px;
    padding-bottom: 30px;
  }

  &:hover {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.12);
    transform: translate(0px, -2px);
  }

  &:focus {
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.3);
    transform: translate(0px, -2px);
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

const ProjectImage = styled<LazyImageProps>(LazyImage)`
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
    margin-top: 18px;
    margin-bottom: 35px;
    margin-left: 68px;
    margin-right: 32px;

    ${media.smallerThanMaxTablet`
      margin-left: 20px;
      margin-right: 20px;
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
const ContentHeaderPadding = 13;

const ContentHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  &.noContent {
    ${media.biggerThanMinTablet`
      height: ${ContentHeaderHeight + ContentHeaderPadding}px;
    `}
  }

  &.hasRightContent.noLeftContent {
    justify-content: flex-end;
  }

  &.hasContent {
    padding-bottom: ${ContentHeaderPadding}px;

    &.large {
      border-bottom: solid 1px #e8e8e8;
    }
  }

  &.small {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const ContentHeaderLeft = styled.div`
  min-height: ${ContentHeaderHeight}px;
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 120px;
  margin-right: 10px;

  ${media.smallerThanMinTablet`
    margin-right: 0px;
  `};
`;

const ContentHeaderRight = styled.div`
  min-height: ${ContentHeaderHeight}px;

  ${media.smallerThanMinTablet`
    display: none;
  `};
`;

const Countdown = styled.div`
  margin-top: 4px;
`;

const TimeRemaining = styled.div`
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  margin-bottom: 7px;
  white-space: nowrap;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 5px;
  border-radius: 5px;
  background: #d6dade;
`;

const ProgressBarOverlay: any = styled.div`
  width: 0px;
  height: 100%;
  border-radius: 5px;
  background: #fc3428;
  transition: width 1000ms cubic-bezier(0.19, 1, 0.22, 1);
  will-change: width;

  &.visible {
    width: ${(props: any) => props.progress}%;
  }
`;

const ProjectLabel = styled.div`
  color: ${({ theme }) => theme.colorSecondary};
  font-size: ${fontSizes.small}px;
  font-weight: 400;
  white-space: nowrap;
  padding-left: 18px;
  padding-right: 18px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-radius: 5px;
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
  color: ${({ theme }) => theme.colorText};
  font-size: ${fontSizes.xl}px;
  line-height: normal;
  font-weight: 500;
  margin: 0;
  padding: 0;

  &:hover {
    text-decoration: underline;
  }
`;

const ProjectDescription = styled.div`
  color: ${({ theme }) => theme.colors.secondaryText};
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
`;

const ContentFooterSection = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;

const ContentFooterLeft = ContentFooterSection.extend``;

const ContentFooterRight = ContentFooterSection.extend``;

const ArchivedLabel = styled.span`
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

const CommentIcon = MetaItemIcon.extend`
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
  layout?: 'dynamic' | 'threecolumns';
  className?: string;
}

interface DataProps {
  project: GetProjectChildProps;
  projectImages: GetProjectImagesChildProps;
  authUser: GetAuthUserChildProps;
  phase: GetPhaseChildProps;
  avatars: GetAvatarsChildProps;
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

  handleIntersectionObserverOnChange = (event, unobserve) => {
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

  handleAvatarBubblesOnClick = (projectId: string) => () => {
    trackEventByName(tracks.clickOnAvatarBubbles, { extra: { projectId } });
  }

  render() {
    const { visible } = this.state;
    const { project, phase, size, projectImages, intl: { formatMessage }, layout, className } = this.props;

    if (!isNilOrError(project)) {
      const participationMethod = (!isNilOrError(phase) ? phase.attributes.participation_method : project.attributes.participation_method);
      const postingEnabled = (!isNilOrError(phase) ? phase.attributes.posting_enabled : project.attributes.posting_enabled);
      const votingEnabled = (!isNilOrError(phase) ? phase.attributes.voting_enabled : project.attributes.voting_enabled);
      const commentingEnabled = (!isNilOrError(phase) ? phase.attributes.commenting_enabled : project.attributes.commenting_enabled);
      const imageUrl = (!isNilOrError(projectImages) && projectImages.length > 0 ? projectImages[0].attributes.versions.medium : null);
      const projectUrl = getProjectUrl(project);
      const isArchived = (project.attributes.publication_status === 'archived');
      const ideasCount = project.attributes.ideas_count;
      const commentsCount = project.attributes.comments_count;
      const showAvatars = project.relationships.avatars.data.length > 0;
      const showIdeasCount = !(project.attributes.process_type === 'continuous' && project.attributes.participation_method !== 'ideation') && ideasCount > 0;
      const showCommentsCount = (commentsCount > 0);
      const showContentFooter = (showAvatars || showIdeasCount || showCommentsCount);
      const startAt = get(phase, 'attributes.start_at');
      const endAt = get(phase, 'attributes.end_at');
      const timeRemaining = (endAt ? capitalize(moment.duration(moment(endAt).diff(moment())).humanize()) : null);
      let countdown: JSX.Element | null = null;
      let ctaMessage: JSX.Element | null = null;

      console.log(this.props.avatars);

      if (isArchived) {
        countdown = (
          <ArchivedLabel>
            <FormattedMessage {...messages.archived} />
          </ArchivedLabel>
        );
      } else if (timeRemaining) {
        const totalDays = (timeRemaining ? moment.duration(moment(endAt).diff(moment(startAt))).asDays() : null);
        const pastDays = (timeRemaining ? moment.duration(moment(moment()).diff(moment(startAt))).asDays() : null);
        const progress = (timeRemaining && isNumber(pastDays) && isNumber(totalDays) ?  round((pastDays / totalDays) * 100, 1) : null);

        countdown = (
          <Countdown>
            <TimeRemaining className={size}>
              <FormattedMessage {...messages.remaining} values={{ timeRemaining }} />
            </TimeRemaining>
            <Observer onChange={this.handleIntersectionObserverOnChange}>
              <ProgressBar>
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
      } else if (participationMethod === 'ideation' && postingEnabled) {
        ctaMessage = <FormattedMessage {...messages.postYourIdea} />;
      } else if (participationMethod === 'ideation' && votingEnabled) {
        ctaMessage = <FormattedMessage {...messages.vote} />;
      } else if (participationMethod === 'ideation' && commentingEnabled) {
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

          {ctaMessage !== null &&
            <ContentHeaderRight className={`${size} ${countdown ? 'hasProgressBar' : ''}`}>
              <ProjectLabel onClick={this.handleCTAOnClick(project.id)}>
                {ctaMessage}
              </ProjectLabel>
            </ContentHeaderRight>
          }
        </ContentHeader>
      );

      return (
        <Container
          className={`${className} ${layout} ${size} ${isArchived ? 'archived' : ''} e2e-project-card`}
          to={projectUrl}
          onClick={this.handleProjectCardOnClick(project.id)}
        >
          {size !== 'large' && contentHeader}

          <ProjectImageContainer className={size}>
            <ProjectImagePlaceholder>
              <ProjectImagePlaceholderIcon name="project" />
            </ProjectImagePlaceholder>

            {imageUrl &&
              <T value={project.attributes.title_multiloc}>
                {projectTitle => (
                  <ProjectImage
                    src={imageUrl}
                    alt={formatMessage(messages.imageAltText, { projectTitle })}
                    cover={true}
                  />
                )}
              </T>
            }
          </ProjectImageContainer>

          <ProjectContent className={size}>
            {size === 'large' && contentHeader}

            <ContentBody className={size}>
              <ProjectTitle onClick={this.handleProjectTitleOnClick(project.id)}>
                <T value={project.attributes.title_multiloc} />
              </ProjectTitle>

              <T value={project.attributes.description_preview_multiloc}>
                {(description) => {
                  if (!isEmpty(description)) {
                    return (
                      <ProjectDescription>
                        {description}
                      </ProjectDescription>
                    );
                  }

                  return null;
                }}
              </T>
            </ContentBody>

            {showContentFooter &&
              <ContentFooter>
                <ContentFooterLeft>
                  {showAvatars &&
                    <AvatarBubbles
                      onClick={this.handleAvatarBubblesOnClick(project.id)}
                      size={30}
                      limit={3}
                      userCountBgColor={this.props.theme.colorMain}
                      context={{
                        type: 'project',
                        id: project.id
                      }}
                    />
                  }
                </ContentFooterLeft>

                <ContentFooterRight>
                    <ProjectMetaItems>
                      {showIdeasCount &&
                        <MetaItem className="first">
                          <MetaItemIcon name="idea2" />
                          <MetaItemText>
                            {ideasCount}
                          </MetaItemText>
                        </MetaItem>
                      }

                      {showCommentsCount &&
                        <MetaItem>
                          <CommentIcon name="comment2" />
                          <MetaItemText>
                            {commentsCount}
                          </MetaItemText>
                        </MetaItem>
                      }
                    </ProjectMetaItems>
                </ContentFooterRight>
              </ContentFooter>
            }
          </ProjectContent>
        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  authUser: <GetAuthUser />,
  project: ({ projectId, render }) => <GetProject id={projectId}>{render}</GetProject>,
  projectImages: ({ projectId, render }) => <GetProjectImages projectId={projectId}>{render}</GetProjectImages>,
  phase: ({ project, render }) => <GetPhase id={get(project, 'relationships.current_phase.data.id')}>{render}</GetPhase>,
  avatars: ({ project, render }) => {
    let avatarIds: string[] = [];

    if (!isNilOrError(project) && project.relationships.avatars.data) {
      avatarIds = project.relationships.avatars.data.map(avatar => avatar.id);
    }

    return <GetAvatars ids={avatarIds}>{render}</GetAvatars>;
  },
});

const ProjectCardWithHoC = withTheme<Props, State>(injectIntl<Props>(ProjectCard));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => {
      const props = { ...inputProps, ...dataProps };
      return <ProjectCardWithHoC {...props} />;
    }}
  </Data>
);
