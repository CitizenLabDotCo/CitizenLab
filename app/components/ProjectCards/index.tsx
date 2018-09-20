import React, { PureComponent } from 'react';

// components
import ProjectCard from 'components/ProjectCard';
import Icon from 'components/UI/Icon';
import Spinner from 'components/UI/Spinner';
import Button from 'components/UI/Button';
import SelectAreas from './SelectAreas';
import SelectPublicationStatus from './SelectPublicationStatus';

// resources
import GetProjects, { GetProjectsChildProps, InputProps as GetProjectsInputProps, SelectedPublicationStatus } from 'resources/GetProjects';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from './messages';

// style
import styled from 'styled-components';
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

const FiltersArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  ${media.smallerThanMaxTablet`
    justify-content: flex-start;
  `};
`;

const FilterArea = styled.div`
  height: 60px;
  display: flex;
  align-items: center;

  &.publicationstatus {
    margin-right: 30px;
  }

  ${media.smallerThanMaxTablet`
    height: 30px;
  `}
`;

const ProjectsList = styled.div`
  display: flex;
  flex-direction: column;

  ${media.smallerThanMaxTablet`
    flex-direction: row;
    flex-wrap: wrap;
    margin-left: -13px;
    margin-right: -13px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 0;
  padding-top: 100px;
  padding-bottom: 100px;
  border-radius: 5px;
  border: solid 1px ${colors.separation};
  background: #fff;
`;

const ProjectIcon = styled(Icon)`
  height: 45px;
  fill: #999;
`;

const EmptyMessage = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const EmptyMessageLine = styled.div`
  color: #999;
  font-size: ${fontSizes.large}px;
  font-weight: 400;
  line-height: 25px;
  text-align: center;
`;

const LoadMoreButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
`;

const LoadMoreButton = styled(Button)``;

interface InputProps extends GetProjectsInputProps {}

interface Props extends InputProps, GetProjectsChildProps {}

interface State {}

class ProjectCards extends PureComponent<Props, State> {
  emptyArray: string[] = [];

  constructor(props: Props) {
    super(props);
    this.state = {};
  }

  loadMore = () => {
    this.props.onLoadMore();
  }

  handleAreasOnChange = (areas: string[]) => {
    this.props.onChangeAreas(areas);
  }

  handlePublicationStatusOnChange = (status: SelectedPublicationStatus) => {
    this.props.onChangePublicationStatus(status);
  }

  render() {
    const { queryParameters, projectsList, hasMore, querying, loadingMore, hideAllFilters } = this.props;
    const hasProjects = (projectsList && projectsList.length > 0);
    const selectedAreas = (queryParameters.areas || this.emptyArray);

    return (
      <Container id="e2e-projects-container">
        {hideAllFilters !== true &&
          <FiltersArea id="e2e-projects-filters">
            <FilterArea className="publicationstatus">
              <SelectPublicationStatus onChange={this.handlePublicationStatusOnChange} />
            </FilterArea>

            <FilterArea>
              <SelectAreas selectedAreas={selectedAreas} onChange={this.handleAreasOnChange} />
            </FilterArea>
          </FiltersArea>
        }

        {querying &&
          <Loading id="projects-loading">
            <Spinner />
          </Loading>
        }

        {!querying && !hasProjects &&
          <EmptyContainer id="projects-empty">
            <ProjectIcon name="idea" />
            <EmptyMessage>
              <EmptyMessageLine>
                <FormattedMessage {...messages.noProjects} />
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

        {!querying && hasMore &&
          <LoadMoreButtonWrapper>
            <LoadMoreButton
              onClick={this.loadMore}
              style="secondary"
              size="2"
              text={<FormattedMessage {...messages.loadMore} />}
              processing={loadingMore}
              circularCorners={false}
              fullWidth={true}
              height="60px"
            />
          </LoadMoreButtonWrapper>
        }
      </Container>
    );
  }
}

export default (inputProps: InputProps) => (
  <GetProjects {...inputProps}>
    {projects => <ProjectCards {...inputProps} {...projects} />}
  </GetProjects>
);
