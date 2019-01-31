import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { isEmpty } from 'lodash-es';

// router
import Link from 'utils/cl-router/Link';

// components
import Icon from 'components/UI/Icon';
import LazyImage, { Props as LazyImageProps } from 'components/LazyImage';
import AvatarBubbles from 'components/AvatarBubbles';
import Observer from '@researchgate/react-intersection-observer';

// services
import { getProjectUrl } from 'services/projects';
// import { isProjectModerator } from 'services/permissions/roles';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetProjectImages, { GetProjectImagesChildProps } from 'resources/GetProjectImages';
import GetAuthUser, { GetAuthUserChildProps } from 'resources/GetAuthUser';

// i18n
import T from 'components/T';
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage } from 'utils/cl-intl';
import injectIntl from 'utils/cl-intl/injectIntl';
import messages from './messages';

// style
import styled, { withTheme } from 'styled-components';
import { media, colors, fontSizes } from 'utils/styleUtils';
import { rgba, darken } from 'polished';

const Container = styled(Link)`
  width: calc(33% - 11px);
  min-height: 580px;
  display: flex;
  flex-direction: column;
  margin-bottom: 25px;
  position: relative;
  cursor: pointer;
  background: #fff;
  border-radius: 5px;
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
    width: calc(50% - 12px);
    min-height: 580px;
    padding-left: 30px;
    padding-right: 30px;

    ${media.smallerThanMinTablet`
      width: 100%;
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

  ${media.smallerThanMinTablet`
    width: 100%;
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

  &.small {

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

// const ProjectModeratorIcon = styled(Icon)`
//   width: 24px;
//   height: 24px;
//   fill: ${colors.draftYellow};
//   position: absolute;
//   top: 12px;
//   right: 12px;
// `;

const ProjectContent = styled.div`
  flex: 1;
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
  }
`;

const ContentHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: solid 1px #e8e8e8;

  &.small {
    padding-left: 30px;
    padding-right: 30px;
  }
`;

const ContentHeaderLeft = styled.div`
  flex-grow: 0;
  flex-shrink: 1;
  flex-basis: 112px;
  margin-right: 15px;
`;

const ContentHeaderRight = styled.div``;

const Countdown = styled.div``;

const TimeRemaining = styled.div`
  color: ${({ theme }) => theme.colorMain};
  font-size: ${fontSizes.small}px;
  font-weight: 500;
  margin-bottom: 6px;
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
  flex: 1;
  display: flex;
  flex-direction: column;
  padding-top: 20px;

  &.large {
    max-width: 400px;
    justify-content: center;
  }
`;

const ProjectTitle = styled.h3`
  color: ${({ theme }) => theme.colorMain};
  font-size: ${fontSizes.xl}px;
  line-height: normal;
  font-weight: 500;
  margin: 0;
  padding: 0;
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

const ArchivedLabelWrapper = styled.div`
  margin-bottom: 8px;
  display: flex;
`;

const ArchivedLabel = styled.span`
  color: ${colors.text};
  font-size: ${fontSizes.xs}px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 6px 12px;
  background: #e1e3e7;
`;

const ProjectMetaItems = styled.div`
  height: 100%;
  color: ${({ theme }) => theme.colors.label};
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
`;

const MetaItemIcon = styled(Icon)`
  width: 20px;
  height: 20px;
  fill: ${({ theme }) => theme.colorMain};
`;

const CommentIcon = MetaItemIcon.extend`
  width: 22px;
  height: 22px;
`;

const MetaItemText = styled.div`
  color: ${({ theme }) => theme.colorMain};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: normal;
  margin-left: 4px;
`;

export interface InputProps {
  projectId: string;
  size: 'small' | 'medium' | 'large';
}

interface DataProps {
  project: GetProjectChildProps;
  projectImages: GetProjectImagesChildProps;
  authUser: GetAuthUserChildProps;
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

  render() {
    const className = this.props['className'];
    const { visible } = this.state;
    const { project, size, projectImages, intl: { formatMessage } } = this.props;

    if (!isNilOrError(project)) {
      const imageUrl = (!isNilOrError(projectImages) && projectImages.length > 0 ? projectImages[0].attributes.versions.medium : null);
      const projectUrl = getProjectUrl(project);
      const isArchived = (project.attributes.publication_status === 'archived');
      const ideasCount = project.attributes.ideas_count;
      const showIdeasCount = !(project.attributes.process_type === 'continuous' && project.attributes.participation_method !== 'ideation');

      const timeRemaining = '5 days';

      const contentHeader = (
        <ContentHeader className={size}>
          <ContentHeaderLeft>
            <Countdown>
              <TimeRemaining>
                <FormattedMessage {...messages.remaining} values={{ timeRemaining }} />
              </TimeRemaining>
              <Observer onChange={this.handleIntersectionObserverOnChange}>
                <ProgressBar>
                  <ProgressBarOverlay progress={80} className={visible ? 'visible' : ''} />
                </ProgressBar>
              </Observer>
            </Countdown>

            {isArchived &&
              <ArchivedLabelWrapper>
                <ArchivedLabel>
                  <FormattedMessage {...messages.archived} />
                </ArchivedLabel>
              </ArchivedLabelWrapper>
            }
          </ContentHeaderLeft>

          <ContentHeaderRight>
            <ProjectLabel>
              <span>Allocate your budget</span>
            </ProjectLabel>
          </ContentHeaderRight>
        </ContentHeader>
      );

      return (
        <Container
          className={`${className} ${size} e2e-project-card ${isArchived ? 'archived' : ''}`}
          to={projectUrl}
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
              <ProjectTitle>
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

            <ContentFooter>
              <ContentFooterLeft>
                <AvatarBubbles
                  size={30}
                  userCountBgColor={this.props.theme.colorMain}
                  // context={{
                  //   type: 'project',
                  //   id: project.id
                  // }}
                />
              </ContentFooterLeft>

              <ContentFooterRight>
                {showIdeasCount && ideasCount > 0 &&
                  <ProjectMetaItems>
                      <MetaItem>
                        <MetaItemIcon name="idea2" />
                        <MetaItemText>
                          {ideasCount}
                        </MetaItemText>
                      </MetaItem>

                      <MetaItem>
                        <CommentIcon name="comment2" />
                        <MetaItemText>
                          {ideasCount}
                        </MetaItemText>
                      </MetaItem>
                  </ProjectMetaItems>
                }
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
  project: ({ projectId, render }) => <GetProject id={projectId}>{render}</GetProject>,
  projectImages: ({ projectId, render }) => <GetProjectImages projectId={projectId}>{render}</GetProjectImages>,
  authUser: <GetAuthUser />
});

const ProjectCardWithHoC = injectIntl<Props>(withTheme(ProjectCard as any) as any);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {(dataProps) => {
      const props = { ...inputProps, ...dataProps };
      return <ProjectCardWithHoC {...props} />;
    }}
  </Data>
);
