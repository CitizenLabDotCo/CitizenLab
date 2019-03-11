import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import ContentContainer from 'components/ContentContainer';
import ProjectNavbar from './ProjectNavbar';
import IdeaButton from 'components/IdeaButton';

// resources
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetEvents, { GetEventsChildProps } from 'resources/GetEvents';

// i18n
import T from 'components/T';
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled, { withTheme } from 'styled-components';
import { media, fontSizes } from 'utils/styleUtils';

const Container = styled.div`
  width: 100%;
  min-height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 40px;
  padding-bottom: 40px;
  position: relative;
  z-index: 3;
  background: #767676;

  ${media.smallerThanMinTablet`
    min-height: 200px;
  `}
`;

const HeaderContent = styled(ContentContainer)``;

const ArchivedLabelWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const ArchivedLabel = styled.span`
  color: #fff;
  font-size: ${fontSizes.small}px;
  font-weight: 500;
  text-transform: uppercase;
  border-radius: 5px;
  padding: 6px 12px;
  background: rgba(255, 255, 255, .45);
  margin-top: 15px;
`;

const HeaderTitle = styled.h2`
  color: #fff;
  font-size: ${fontSizes.xxxxxl}px;
  line-height: normal;
  font-weight: 500;
  text-align: center;
  overflow-wrap: break-word;
  word-wrap: break-word;
  word-break: break-word;
  margin: 0;
  padding: 0;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.xxxl}px;
    font-weight: 600;
  `}
`;

const HeaderOverlay = styled.div`
  background: #000;
  opacity: 0.55;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const HeaderImage: any = styled.div`
  background-image: url(${(props: any) => props.src});
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

const StyledIdeaButton = styled(IdeaButton)`
  margin-top: 30px;

  ${media.biggerThanMinTablet`
    display: none;
  `}
`;

interface InputProps {
  projectSlug: string;
  phaseId?: string | null;
}

interface DataProps {
  project: GetProjectChildProps;
  events: GetEventsChildProps;
}

interface Props extends InputProps, DataProps {
  theme: any;
}

interface State {}

class ProjectsShowPage extends PureComponent<Props, State> {
  render() {
    const { projectSlug, phaseId, project, theme } = this.props;

    if (!isNilOrError(project)) {
      const projectHeaderImageLarge = (project.attributes.header_bg.large || null);
      const projectType = project.attributes.process_type;
      const projectPublicationStatus = project.attributes.publication_status;
      const projectMethod = project.attributes.participation_method;

      return (
        <>
          <ProjectNavbar projectSlug={projectSlug} phaseId={phaseId} />
          <Container className={`${projectType} e2e-project-header-content`}>
            <HeaderImage src={projectHeaderImageLarge} />
            <HeaderOverlay />
            <HeaderContent className={projectType}>
              <HeaderTitle>
                <T value={project.attributes.title_multiloc} />
              </HeaderTitle>
              {projectPublicationStatus === 'archived' &&
                <ArchivedLabelWrapper>
                  <ArchivedLabel>
                    <FormattedMessage {...messages.archived} />
                  </ArchivedLabel>
                </ArchivedLabelWrapper>
              }
              {/* Continuous Ideation Idea Button */}
              {projectType === 'continuous' && projectMethod === 'ideation' &&
                <ButtonWrapper>
                  <StyledIdeaButton
                    projectId={project.id}
                    bgColor="#fff"
                    textColor={theme.colorMain}
                    fontWeight="500"
                    padding="13px 22px"
                  />
                </ButtonWrapper>
              }
            </HeaderContent>
          </Container>
        </>
      );
    }

    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  project: ({ projectSlug, render }) => <GetProject slug={projectSlug}>{render}</GetProject>,
  events: ({ project, render }) => <GetEvents projectId={(!isNilOrError(project) ? project.id : null)}>{render}</GetEvents>
});

const ProjectsShowPageWithHoC = withTheme<Props, State>(ProjectsShowPage);

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ProjectsShowPageWithHoC {...inputProps} {...dataProps} />}
  </Data>
);
