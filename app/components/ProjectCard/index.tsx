import React from 'react';
import { adopt } from 'react-adopt';
import { Link, browserHistory } from 'react-router';
import { isNilOrError } from 'utils/helperUtils';

// components
import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';
import LazyImage, { Props as LazyImageProps } from 'components/LazyImage';
import ProjectModeratorIndicator from 'components/ProjectModeratorIndicator';

// services
import { IProjectData } from 'services/projects';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetProjectImages, { GetProjectImagesChildProps } from 'resources/GetProjectImages';

// i18n
import T from 'components/T';
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage } from 'utils/cl-intl';
import injectIntl from 'utils/cl-intl/injectIntl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, colors } from 'utils/styleUtils';

const ProjectImageContainer =  styled.div`
  height: 190px;
  flex-grow: 0;
  flex-shrink: 0;
  flex-basis: 190px;
  display: flex;
  border-radius: 4px;
  margin-right: 10px;
  overflow: hidden;
  position: relative;

  ${media.smallerThanMaxTablet`
    width: 100%;
    flex-basis: 150px;
    margin: 0;
  `}
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
  flex: 1;
  width: 100%;
`;

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 5px;
  padding: 16px;
  margin-bottom: 25px;
  background: #fff;
  border-radius: 5px;
  border: solid 1px ${colors.separation};
  position: relative;

  ${media.biggerThanMaxTablet`
    min-height: 222px;
  `}

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 15px;
  `}
`;

const Mod = styled(ProjectModeratorIndicator)`
  position: absolute;
  top: .5rem;
  right: .5rem;
  width: 1rem;
`;

const ProjectContent = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  padding-top: 10px;
  padding-bottom: 15px;
  margin-right: 40px;
  margin-left: 30px;

  ${media.smallerThanMaxTablet`
    align-items: flex-start;
    margin: 0;
    padding: 15px;
    padding-top: 0px;
  `}
`;

const ProjectContentInner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const ProjectTitle = styled.h3`
  color: #333;
  font-size: 23px;
  line-height: 29px;
  font-weight: 500;
  margin: 0;
  padding: 0;

  ${media.smallerThanMaxTablet`
    padding-top: 20px;
  `}
`;

const ProjectDescription = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 16px;
  line-height: 24px;
  font-weight: 400;
  margin-top: 20px;
  width: 100%;
`;

const ProjectMetaItems = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 16px;
  font-weight: 400;
  line-height: 20px;
  display: flex;
  margin-top: 25px;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const IdeaCountIcon = styled(Icon)`
  height: 25px;
  width: 25px;
  fill: ${(props) => props.theme.colors.label};
  margin-right: 8px;
  margin-top: -5px;
  transition: all 100ms ease-out;
`;

const IdeaCountText = styled.div`
  color: ${(props) => props.theme.colors.label};
  font-size: 16px;
  font-weight: 400;
  line-height: 21px;
  transition: all 100ms ease-out;
`;

const IdeaCount = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    ${IdeaCountIcon} {
      fill: #000;
    }

    ${IdeaCountText} {
      color: #000;
      text-decoration: none;
    }
  }
`;

const ProjectButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin-right: 0px;
    margin-top: 20px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
  `}
`;

const ProjectButton = styled(Button) ``;

export interface InputProps {
  projectId: string;
}

interface DataProps {
  project: GetProjectChildProps;
  projectImages: GetProjectImagesChildProps;
}

interface Props extends InputProps, DataProps {}

interface State {}

class ProjectCard extends React.PureComponent<Props & InjectedIntlProps, State> {

  getProjectUrl = (project: IProjectData) => {
    const projectType = project.attributes.process_type;
    const rootProjectUrl = `/projects/${project.attributes.slug}`;
    const projectUrl = (projectType === 'timeline' ? `${rootProjectUrl}/process` : `${rootProjectUrl}/info`);

    return projectUrl;
  }

  getProjectIdeasUrl = (project: IProjectData) => {
    const projectType = project.attributes.process_type;
    const rootProjectUrl = `/projects/${project.attributes.slug}`;
    const projectUrl = (projectType === 'timeline' ? `${rootProjectUrl}/process` : `${rootProjectUrl}/ideas`);

    return projectUrl;
  }

  goToProject = () => {
    const { project } = this.props;

    if (!isNilOrError(project)) {
      const projectUrl = this.getProjectUrl(project);
      browserHistory.push(projectUrl);
    }
  }

  render() {
    const className = this.props['className'];
    const { project, projectImages, intl: { formatMessage } } = this.props;

    if (!isNilOrError(project)) {
      const imageUrl = (!isNilOrError(projectImages) && projectImages.length > 0 ? projectImages[0].attributes.versions.medium : null);
      const projectUrl = this.getProjectUrl(project);
      const projectIdeasUrl = this.getProjectIdeasUrl(project);
      const ideasCount = project.attributes.ideas_count;
      const showIdeasCount = !(project.attributes.process_type === 'continuous' && project.attributes.participation_method !== 'ideation');

      return (
        <Container className={className}>
          <Mod projectId={project.id} />

          <ProjectImageContainer>
            {imageUrl &&
              <T value={project.attributes.title_multiloc}>
                {projectTitle => (<ProjectImage src={imageUrl} alt={formatMessage(messages.imageAltText, { projectTitle })} cover />)}
              </T>
            }

            {!imageUrl &&
              <ProjectImagePlaceholder>
                <ProjectImagePlaceholderIcon name="project" />
              </ProjectImagePlaceholder>
            }
          </ProjectImageContainer>

          <ProjectContent>
            <ProjectContentInner>
              <ProjectTitle>
                <T value={project.attributes.title_multiloc} />
              </ProjectTitle>
              <ProjectDescription>
                <T value={project.attributes.description_preview_multiloc} />
              </ProjectDescription>
              <ProjectMetaItems>
                {showIdeasCount &&
                  <IdeaCount to={projectIdeasUrl}>
                    <IdeaCountIcon name="idea" />
                    <IdeaCountText>
                      <FormattedMessage
                        {...messages.xIdeas}
                        values={{
                          ideasCount,
                        }}
                      />
                    </IdeaCountText>
                  </IdeaCount>
                }
              </ProjectMetaItems>
            </ProjectContentInner>
          </ProjectContent>

          <ProjectButtonWrapper>
            <ProjectButton
              linkTo={projectUrl}
              text={<FormattedMessage {...messages.openProjectButton} />}
              style="primary"
              size="2"
              circularCorners={false}
            />
          </ProjectButtonWrapper>

        </Container>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  project: ({ projectId, render }) => <GetProject id={projectId}>{render}</GetProject>,
  projectImages: ({ projectId, render }) => <GetProjectImages projectId={projectId}>{render}</GetProjectImages>,
});

const ProjectCardWithHoC = injectIntl(ProjectCard);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ProjectCardWithHoC {...inputProps} {...dataProps} />}
  </Data>
);
