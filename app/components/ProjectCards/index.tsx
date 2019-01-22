import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import ProjectCard from 'components/ProjectCard';
import Spinner from 'components/UI/Spinner';
import Button from 'components/UI/Button';
import SelectAreas from './SelectAreas';
import SelectPublicationStatus from './SelectPublicationStatus';
import SendFeedback from 'components/SendFeedback';

// resources
import GetProjects, { GetProjectsChildProps, InputProps as GetProjectsInputProps, SelectedPublicationStatus  } from 'resources/GetProjects';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { getLocalized } from 'utils/i18n';

// style
import styled, { withTheme } from 'styled-components';
import { media, fontSizes, colors } from 'utils/styleUtils';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const Loading = styled.div`
  width: 100%;
  height: 300px;
  background: #fff;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: solid 1px ${colors.separation};
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 33px;
  border-bottom: 1px solid #D1D1D1;
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  color: ${(props: any) => props.theme.colorText};
  margin-bottom: 0;
  margin-right: 40px;
  font-weight: 600;
  font-size: ${fontSizes.xl}px;

  ${media.largePhone`
    font-size: ${fontSizes.large}px;
  `};
`;

const FilterArea = styled.div`
  height: 60px;
  display: flex;
  align-items: center;

  &.publicationstatus {
    margin-right: 30px;
  }
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 43px;

  ${media.smallerThanMaxTablet`
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -13px;
    margin-right: -13px;
  `};

  ${media.largePhone`
    margin-bottom: 23px;
  `};
`;

const StyledProjectCard = styled(ProjectCard)`
  ${media.smallerThanMaxTablet`
    flex-grow: 0;
    width: calc(100% * (1/2) - 26px);
    margin-left: 13px;
    margin-right: 13px;
  `};

  ${media.smallerThanMinTablet`
    width: 100%;
  `}
`;

const EmptyContainer = styled.div`
  width: 100%;
  min-height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  margin-bottom: 43px;
  border-radius: 5px;
  border: 1px solid ${colors.adminSeparation};
  background: #fff;
  color: ${(props: any) => props.theme.colorText};
  position: relative;
`;

const EmptyProjectsImage = styled.img`
  width: 100%;
  height: auto;

  ${media.smallerThanMaxTablet`
    &.objectFitCoverSupported {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    &:not(.objectFitCoverSupported) {
      width: auto;
      height: 100%;
    }
  `}
`;

const EmptyMessage = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: ${(props: any) => props.theme.colorText};
`;

const EmptyMessageTitle = styled.h2`
  font-weight: 600;
  font-size: ${fontSizes.xl}px;
  white-space: nowrap;
  margin-bottom: 5px;

  ${media.smallerThanMinTablet`
    font-size: ${fontSizes.large}px;
  `};
`;

const EmptyMessageLine = styled.p`
  color: ${(props: any) => props.theme.colorText};
  font-size: ${fontSizes.base}px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
`;

const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;

  ${media.smallerThanMinTablet`
    flex-direction: column;
  `}
`;

const ShowMoreButtonWrapper = styled.div`
  ${media.smallerThanMinTablet`
    margin-bottom: 60px;
  `}

  ${media.largePhone`
    margin-bottom: 40px;
  `}
`;

const ShowMoreButton = styled(Button)`
  color: ${(props: any) => props.theme.colorText};
`;

const SendFeedbackGhostItem = styled(SendFeedback)`
  visibility: hidden;
  margin-right: auto;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const SSendFeedback = styled(SendFeedback)`
  margin-left: auto;

  ${media.smallerThanMinTablet`
    margin-left: 0;
  `}
`;

interface DataProps {
  projects: GetProjectsChildProps;
  tenant: GetTenantChildProps;
  locale: GetLocaleChildProps;
}

interface InputProps extends GetProjectsInputProps {
  showTitle: boolean;
  showPublicationStatusFilter: boolean;
  showSendFeedback: boolean;
}

interface Props extends InputProps, DataProps {}

interface State {}

class ProjectCards extends PureComponent<Props & InjectedIntlProps, State> {
  emptyArray: string[] = [];

  constructor(props) {
    super(props);
    this.state = {};
  }

  showMore = () => {
    this.props.projects.onLoadMore();
  }

  handlePublicationStatusOnChange = (status: SelectedPublicationStatus) => {
    this.props.projects.onChangePublicationStatus(status);
  }

  handleAreasOnChange = (areas: string[]) => {
    this.props.projects.onChangeAreas(areas);
  }

  render() {
    const { tenant, locale, showTitle, showPublicationStatusFilter, showSendFeedback } = this.props;
    const { queryParameters, projectsList, hasMore, querying, loadingMore } = this.props.projects;
    const hasProjects = (projectsList && projectsList.length > 0);
    const selectedAreas = (queryParameters.areas || this.emptyArray);
    const EmptyProjectsImageSrc: string = require('assets/img/landingpage/no_projects_image.svg');
    const objectFitCoverSupported = (window['CSS'] && CSS.supports('object-fit: cover'));

    if (!isNilOrError(tenant) && locale) {
      const organizationNameMulitiLoc = tenant.attributes.settings.core.organization_name;
      const tenantLocales = tenant.attributes.settings.core.locales;
      const tenantName = getLocalized(organizationNameMulitiLoc, locale, tenantLocales);

      return (
        <Container id="e2e-projects-container">
          <Header>
            {showTitle &&
              <Title>
                {this.props.intl.formatMessage(messages.currentlyWorkingOn, { tenantName })}
              </Title>
            }

            {showPublicationStatusFilter &&
              <FilterArea className="publicationstatus">
                <SelectPublicationStatus onChange={this.handlePublicationStatusOnChange} />
              </FilterArea>
            }

            <FilterArea>
              <SelectAreas selectedAreas={selectedAreas} onChange={this.handleAreasOnChange} />
            </FilterArea>
          </Header>

          {querying &&
            <Loading id="projects-loading">
              <Spinner />
            </Loading>
          }

          {!querying && !hasProjects &&
            <EmptyContainer id="projects-empty">
              <EmptyProjectsImage src={EmptyProjectsImageSrc} className={objectFitCoverSupported ? 'objectFitCoverSupported' : ''} />
              <EmptyMessage>
                <EmptyMessageTitle>
                  <FormattedMessage {...messages.noProjectYet} />
                </EmptyMessageTitle>
                <EmptyMessageLine>
                  <FormattedMessage {...messages.stayTuned} />
                </EmptyMessageLine>
              </EmptyMessage>
            </EmptyContainer>
          }

          {!querying && hasProjects && projectsList &&
            <ProjectsList id="e2e-projects-list">
              {projectsList.map((project) => (
                <StyledProjectCard key={project.id} projectId={project.id} />
              ))}
            </ProjectsList>
          }

          <Footer>
            {/* Hipster way to center and right-align the other two items in this container */}
            <SendFeedbackGhostItem showFeedbackText={true}/>

            {!querying && hasMore &&
              <ShowMoreButtonWrapper>
                <ShowMoreButton
                  onClick={this.showMore}
                  size="1"
                  style="secondary"
                  text={<FormattedMessage {...messages.showMore} />}
                  processing={loadingMore}
                  height="50px"
                  icon="showMore"
                  iconPos="left"
                  textColor={this.props['theme'].colorText}
                  fontWeight="500"
                />
              </ShowMoreButtonWrapper>
            }

            {showSendFeedback &&
              <SSendFeedback showFeedbackText={true} />
            }
          </Footer>
        </Container>
      );
    }

    return null;
  }
}

const ProjectCardsWithHOCs = injectIntl(withTheme(ProjectCards) as any);

const Data = adopt<DataProps, InputProps>({
  tenant: <GetTenant />,
  locale: <GetLocale />,
  projects: ({ render, ...getProjectsInputProps }) => <GetProjects {...getProjectsInputProps}>{render}</GetProjects>
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ProjectCardsWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
