import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';
import { size, isEqual } from 'lodash-es';

// components
import ProjectCard from 'components/ProjectCard';
import Spinner from 'components/UI/Spinner';
import Button from 'components/UI/Button';
import SelectAreas from './SelectAreas';
import SelectPublicationStatus from './SelectPublicationStatus';
import SendFeedback from 'components/SendFeedback';
// import MediaQuery from 'react-responsive';

// resources
import GetProjects, { GetProjectsChildProps, InputProps as GetProjectsInputProps, SelectedPublicationStatus  } from 'resources/GetProjects';
import GetTenant, { GetTenantChildProps } from 'resources/GetTenant';
import GetLocale, { GetLocaleChildProps } from 'resources/GetLocale';
import GetWindowSize, { GetWindowSizeChildProps } from 'resources/GetWindowSize';

// i18n
import { FormattedMessage, injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from './messages';
import { getLocalized } from 'utils/i18n';

// style
import styled, { withTheme } from 'styled-components';
import { media, fontSizes, viewportWidths } from 'utils/styleUtils';
import { darken, rgba } from 'polished';

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
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
`;

const Header = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 35px;
  border-bottom: 1px solid #d1d1d1;

  ${media.smallerThanMinTablet`
    justify-content: center;
    border: none;
  `};
`;

const Title = styled.h2`
  display: flex;
  align-items: center;
  color: ${({ theme }) => theme.colorText};
  margin: 0;
  margin-right: 45px;
  font-weight: 500;
  font-size: ${fontSizes.xl}px;

  ${media.smallerThanMinTablet`
    margin: 0;
    font-size: ${fontSizes.large}px;
    text-align: center;
  `};
`;

const FilterArea = styled.div`
  height: 60px;
  display: flex;
  align-items: center;

  &.publicationstatus {
    margin-right: 30px;
  }

  ${media.smallerThanMinTablet`
    display: none;
  `};
`;

const ProjectsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const EmptyContainer = styled.div`
  width: 100%;
  min-height: 200px;
  color: ${({ theme }) => theme.colorText};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0;
  margin-bottom: 43px;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.08);
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
  color: ${({ theme }) => theme.colorText};
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
  color: ${({ theme }) => theme.colorText};
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
  margin-top: 40px;

  ${media.smallerThanMinTablet`
    flex-direction: column;
    margin-top: 20px;
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

const ShowMoreButton = styled(Button)``;

const SendFeedbackGhostItem = styled(SendFeedback)`
  visibility: hidden;
  margin-right: auto;

  ${media.smallerThanMinTablet`
    display: none;
  `}
`;

const StyledSendFeedback = styled(SendFeedback)`
  margin-left: auto;

  ${media.smallerThanMinTablet`
    margin-left: 0;
  `}
`;

interface DataProps {
  projects: GetProjectsChildProps;
  tenant: GetTenantChildProps;
  locale: GetLocaleChildProps;
  windowSize: GetWindowSizeChildProps;
}

interface InputProps extends GetProjectsInputProps {
  showTitle: boolean;
  showPublicationStatusFilter: boolean;
  showSendFeedback: boolean;
}

interface Props extends InputProps, DataProps {
  theme: any;
}

interface State {
  cardSizes: ('small' | 'medium' | 'large')[];
}

class ProjectCards extends PureComponent<Props & InjectedIntlProps, State> {
  emptyArray: string[] = [];

  constructor(props) {
    super(props);
    this.state = {
      cardSizes: []
    };
  }

  componentDidMount() {
    this.calculateProjectCardsLayout();
  }

  componentDidUpdate() {
    this.calculateProjectCardsLayout();
  }

  calculateProjectCardsLayout = () => {
    const { projects, windowSize } = this.props;

    if (
      !isNilOrError(projects) &&
      projects.projectsList &&
      projects.projectsList.length > 0 &&
      windowSize
    ) {
      const { projectsList } = projects;
      const initialProjectsCount = size(projectsList.slice(0, 6));
      const isOdd = (number: number) => number % 2 === 1;
      const biggerThanSmallTablet = (windowSize >= viewportWidths.smallTablet);
      const biggerThanLargeTablet = (windowSize >= viewportWidths.largeTablet);

      const cardSizes = projectsList.map((_project, index) => {
        let cardSize: 'small' | 'medium' | 'large' = (biggerThanSmallTablet && !biggerThanLargeTablet ? 'medium' : 'small');

        if (index < 6) {
          if (biggerThanSmallTablet && !biggerThanLargeTablet) {
            if ((!isOdd(initialProjectsCount) && (index === 0 || index === 1)) || (isOdd(initialProjectsCount) && index === 0)) {
              cardSize = 'large';
            }
          }

          if (biggerThanLargeTablet) {
            if (initialProjectsCount === 1 && index === 0) {
              cardSize = 'large';
            } else if (initialProjectsCount === 2) {
              cardSize = 'medium';
            } else if (initialProjectsCount === 3) {
              if (index === 0) {
                cardSize = 'large';
              } else {
                cardSize = 'medium';
              }
            } else if (initialProjectsCount === 4 && index === 0) {
              cardSize = 'large';
            } else if (initialProjectsCount === 5 && (index === 0 || index === 1)) {
              cardSize = 'medium';
            } else if (initialProjectsCount === 6) {
              if (index === 0) {
                cardSize = 'large';
              } else if (index === 1 || index === 2) {
                cardSize = 'medium';
              }
            }
          }
        }

        return cardSize;
      });

      if (!isEqual(this.state.cardSizes, cardSizes)) {
        this.setState({ cardSizes });
      }
    }
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
    const { tenant, locale, showTitle, showPublicationStatusFilter, showSendFeedback, theme } = this.props;
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

          {!querying && hasProjects && projectsList && (
            <ProjectsList id="e2e-projects-list">
              {projectsList.map((project, index) => {
                return <ProjectCard key={project.id} projectId={project.id} size={this.state.cardSizes[index]} />;
              })}
            </ProjectsList>
          )}

          <Footer>
            {/* Hipster way to center and right-align the other two items in this container */}
            <SendFeedbackGhostItem showFeedbackText={true} />

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
                  textColor={theme.colorText}
                  textHoverColor={darken(0.1, theme.colorText)}
                  bgColor={rgba(theme.colorMain, 0.05)}
                  bgHoverColor={rgba(theme.colorMain, 0.1)}
                  fontWeight="500"
                />
              </ShowMoreButtonWrapper>
            }

            {showSendFeedback &&
              <StyledSendFeedback showFeedbackText={true} />
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
  windowSize: <GetWindowSize debounce={50} />,
  projects: ({ render, ...getProjectsInputProps }) => <GetProjects {...getProjectsInputProps}>{render}</GetProjects>,
});

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <ProjectCardsWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
