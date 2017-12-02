import * as React from 'react';
import * as _ from 'lodash';
import * as Rx from 'rxjs/Rx';

// router
import { Link, browserHistory } from 'react-router';

// components
import Icon from 'components/UI/Icon';
import Button from 'components/UI/Button';

// services
import { currentTenantStream, ITenant } from 'services/tenant';
import { projectByIdStream, IProject } from 'services/projects';
import { projectImageStream, IProjectImage } from 'services/projectImages';

// i18n
import T from 'components/T';
import { InjectedIntlProps } from 'react-intl';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
import { media, color } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 6px;
  padding: 10px;
  margin-bottom: 20px;
  background: #fff;
  border: solid 1px #e6e6e6;
  cursor: pointer;

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    align-items: left;
    padding: 20px;
  `}
`;

const ProjectImage: any = styled.div`
  flex-basis: 176px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 176px;
  height: 176px;
  border-radius: 6px;
  margin-right: 10px;
  background-image: url(${(props: any) => props.imageSrc});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  overflow: hidden;

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin: 0;
  `}
`;

const ProjectImagePlaceholder = styled.div`
  flex-basis: 176px;
  flex-shrink: 0;
  flex-grow: 0;
  width: 176px;
  height: 176px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 6px;
  margin-right: 10px;
  background: ${color('placeholderBg')};
  overflow: hidden;

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin: 0;
  `}
`;

const ProjectImagePlaceholderIcon = styled(Icon) `
  height: 45px;
  fill: #fff;
`;

const ProjectContent = styled.div`
  flex: 1;
  height: 100%;
  display: flex;
  flex-direction: column;
  margin-right: 30px;
  margin-left: 30px;

  ${media.smallerThanMaxTablet`
    margin: 0;
  `}

  ${media.phone`
    width: 100%;
    margin: 0;
    align-items: center;
  `}
`;

const ProjectTitle = styled.h3`
  color: #333;
  font-size: 21px;
  line-height: 25px;
  font-weight: 500;
  margin: 0;
  padding: 0;

  ${media.smallerThanMaxTablet`
    padding-top: 20px;
  `}

  ${media.phone`
    flex: 1;
    display: flex;
    justify-content: center;
    text-align: center;
  `}
`;

const ProjectDescription = styled.div`
  color: #84939E;
  font-size: 15px;
  font-weight: 300;
  line-height: 20px;
  margin-top: 10px;

  /* see https://stackoverflow.com/questions/3922739/limit-text-length-to-n-lines-using-css */
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 20px;
  max-height: 60px;

  ${media.phone`
    display: none;
  `}
`;

const ReadMoreWrapper = styled.div`
  margin-top: 10px;

  ${media.smallerThanMaxTablet`
    display: none;
  `}
`;

const ReadMore = styled.div`
  color: #84939E;
  font-size: 15px;
  font-weight: 400;
  text-decoration: underline;
  display: inline-block;
  cursor: pointer;

  &:hover {
    color: #000;
  }
`;

const ProjectButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 20px;

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin-top: 20px;
  `}

  ${media.phone`
    align-items: center;
    justify-content: center;
  `}
`;

const ProjectButton = styled(Button) ``;

type Props = {
  id: string;
};

type State = {
  currentTenant: ITenant | null;
  project: IProject | null;
  projectImage: IProjectImage | null;
};

class ProjectCard extends React.PureComponent<Props & InjectedIntlProps, State> {
  state: State;
  subscriptions: Rx.Subscription[];

  constructor(props: Props) {
    super(props as any);
    this.state = {
      currentTenant: null,
      project: null,
      projectImage: null
    };
    this.subscriptions = [];
  }

  componentWillMount() {
    const { id } = this.props;
    const currentTenant$ = currentTenantStream().observable;
    const project$ = projectByIdStream(id).observable.switchMap((project) => {
      const projectImages = project.data.relationships.project_images.data;

      if (projectImages && projectImages.length > 0) {
        return projectImageStream(project.data.id, projectImages[0].id).observable.map(projectImage => ({ project, projectImage }));
      }

      return Rx.Observable.of(null).map(() => ({ project, projectImage: null }));
    });

    this.subscriptions = [
      Rx.Observable.combineLatest(
        currentTenant$,
        project$
      ).subscribe(([currentTenant, { project, projectImage }]) => {
        this.setState({ currentTenant, project, projectImage });
      })
    ];
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  goToProject = () => {
    const { project } = this.state;

    if (project) {
      browserHistory.push(`/projects/${project.data.attributes.slug}`);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { currentTenant, project, projectImage } = this.state;

    if (currentTenant && project) {
      const tenantLogo = currentTenant.data.attributes.logo.medium;
      const slug = project.data.attributes.slug;
      const titleMultiloc = project.data.attributes.title_multiloc;
      const descriptionMultiloc = project.data.attributes.description_multiloc;
      const ideasCount = project.data.attributes.ideas_count;
      const imageUrl = (projectImage ? projectImage.data.attributes.versions.medium : null);

      return (
        <Container onClick={this.goToProject}>
          {imageUrl && <ProjectImage imageSrc={imageUrl} />}

          {!imageUrl &&
            <ProjectImagePlaceholder>
              <ProjectImagePlaceholderIcon name="project" />
            </ProjectImagePlaceholder>
          }

          <ProjectContent>
            <ProjectTitle><T value={titleMultiloc} /></ProjectTitle>
            <ProjectDescription><T value={descriptionMultiloc} /></ProjectDescription>
            <ReadMoreWrapper>
              <ReadMore onClick={this.goToProject}>
                <FormattedMessage {...messages.readMore} />
              </ReadMore>
            </ReadMoreWrapper>
          </ProjectContent>

          <ProjectButtonWrapper>
            <ProjectButton
              onClick={this.goToProject}
              text={formatMessage(messages.openProjectButton)}
              style="primary-outlined"
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

export default injectIntl<Props>(ProjectCard);
