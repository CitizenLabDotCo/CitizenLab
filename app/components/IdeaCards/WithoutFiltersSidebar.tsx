import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import { isNilOrError } from 'utils/helperUtils';

// components
import IdeaCard from 'components/IdeaCard';
import IdeasMap from 'components/IdeasMap';
import Icon from 'components/UI/Icon';
import Spinner from 'components/UI/Spinner';
import TopicFilterDropdown from './TopicFilterDropdown';
import SelectSort from './SortFilterDropdown';
import ProjectFilterDropdown from './ProjectFilterDropdown';
import SearchInput from 'components/UI/SearchInput';
import Button from 'components/UI/Button';
import ViewButtons from 'components/PostCardsComponents/ViewButtons';

// resources
import GetWindowSize, { GetWindowSizeChildProps } from 'resources/GetWindowSize';
import GetIdeas, { Sort, GetIdeasChildProps, InputProps as GetIdeasInputProps } from 'resources/GetIdeas';
import GetProject, { GetProjectChildProps } from 'resources/GetProject';
import GetPhase, { GetPhaseChildProps } from 'resources/GetPhase';

// i18n
import messages from './messages';
import { InjectedIntlProps } from 'react-intl';
import { FormattedMessage, injectIntl } from 'utils/cl-intl';

// style
import styled, { withTheme } from 'styled-components';
import { media, colors, fontSizes, viewportWidths } from 'utils/styleUtils';
import { rgba } from 'polished';

// typings
import { ParticipationMethod } from 'services/participationContexts';
import { IParticipationContextType } from 'typings';

const Container = styled.div`
  width: 100%;
`;

const Loading = styled.div`
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.06);
`;

const FiltersArea = styled.div`
  width: 100%;
  min-height: 54px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;

  &.mapView {
    justify-content: flex-end;
  }

  ${media.smallerThanMaxTablet`
    flex-direction: column;
    align-items: stretch;
  `}
`;

const FilterArea = styled.div`
  display: flex;
  align-items: center;

  ${media.smallerThanMaxTablet`
    align-items: stretch;
  `}
`;

const LeftFilterArea = styled(FilterArea)`
  &.hidden {
    display: none;
  }

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin-bottom: 22px;
  `}
`;

const RightFilterArea = styled(FilterArea)`
  &.hidden {
    display: none;
  }

  ${media.smallerThanMaxTablet`
    width: 100%;
    display: flex;
    justify-content: space-between;
  `}

  ${media.smallerThanMinTablet`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
  `}
`;

const DropdownFilters = styled.div`
  ${media.smallerThanMinTablet`
    &.hasViewButtons {
      margin-top: 20px;
    }
  `}

  &.hidden {
    display: none;
  }
`;

const StyledViewButtons = styled(ViewButtons)`
  margin-left: 25px;

  ${media.smallerThanMaxTablet`
    margin-left: 0px;
  `}
`;

const StyledSearchInput = styled(SearchInput)`
  width: 300px;
  margin-right: 30px;

  ${media.smallerThanMaxTablet`
    width: 100%;
    margin-right: 0px;
  `}
`;

const IdeasList: any = styled.div`
  margin-left: -13px;
  margin-right: -13px;
  display: flex;
  flex-wrap: wrap;
`;

const StyledIdeaCard = styled(IdeaCard)`
  flex-grow: 0;
  width: calc(100% * (1/3) - 26px);
  margin-left: 13px;
  margin-right: 13px;

  ${media.smallerThanMaxTablet`
    width: calc(100% * (1/2) - 26px);
  `};

  ${media.smallerThanMinTablet`
    width: 100%;
  `};
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
  background: #fff;
  border-radius: ${(props: any) => props.theme.borderRadius};
  box-shadow: 1px 2px 2px rgba(0, 0, 0, 0.06);
`;

const IdeaIcon = styled(Icon)`
  width: 43px;
  height: 43px;
  fill: ${colors.label};
`;

const EmptyMessage = styled.div`
  padding-left: 20px;
  padding-right: 20px;
  margin-top: 20px;
  margin-bottom: 30px;
`;

const EmptyMessageLine = styled.div`
  color: ${colors.label};
  font-size: ${fontSizes.medium}px;
  font-weight: 500;
  line-height: normal;
  text-align: center;
`;

const Footer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 30px;

  ${media.smallerThanMinTablet`
    flex-direction: column;
    align-items: stretch;
    margin-top: 0px;
  `}
`;

const ShowMoreButton = styled(Button)``;

interface InputProps extends GetIdeasInputProps  {
  showViewToggle?: boolean | undefined;
  defaultView?: 'card' | 'map' | null | undefined;
  participationMethod?: ParticipationMethod | null;
  participationContextId?: string | null;
  participationContextType?: IParticipationContextType | null;
  className?: string;
  allowProjectsFilter?: boolean;
}

interface DataProps {
  windowSize: GetWindowSizeChildProps;
  ideas: GetIdeasChildProps;
  project: GetProjectChildProps;
  phase: GetPhaseChildProps;
}

interface Props extends InputProps, DataProps {
  theme: any;
}

interface State {
  selectedView: 'card' | 'map';
}

class WithoutFiltersSidebar extends PureComponent<Props & InjectedIntlProps, State> {
  static defaultProps = {
    showViewToggle: false
  };

  constructor(props: Props & InjectedIntlProps) {
    super(props);
    this.state = {
      selectedView: (props.defaultView || 'card')
    };
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.phaseId !== prevProps.phaseId) {
      this.setState({ selectedView: this.props.defaultView || 'card' });
    }
  }

  loadMore = () => {
    this.props.ideas.onLoadMore();
  }

  handleSearchOnChange = (search: string) => {
    this.props.ideas.onChangeSearchTerm(search);
  }

  handleProjectsOnChange = (projects: string[]) => {
    this.props.ideas.onChangeProjects(projects);
  }

  handleSortOnChange = (sort: Sort) => {
    this.props.ideas.onChangeSorting(sort);
  }

  handleTopicsOnChange = (topics: string[]) => {
    this.props.ideas.onChangeTopics(topics);
  }

  selectView = (selectedView: 'card' | 'map') => {
    this.setState({ selectedView });
  }

  searchPlaceholder = this.props.intl.formatMessage(messages.searchPlaceholder);
  searchAriaLabel = this.props.intl.formatMessage(messages.searchPlaceholder);

  render() {
    const { selectedView } = this.state;
    const {
      participationMethod,
      participationContextId,
      participationContextType,
      windowSize,
      ideas,
      project,
      phase,
      className,
      theme,
      allowProjectsFilter,
      showViewToggle
    } = this.props;
    const {
      queryParameters,
      list,
      hasMore,
      querying,
      loadingMore
    } = ideas;
    const hasIdeas = (!isNilOrError(list) && list.length > 0);
    const showListView = (selectedView === 'card');
    const showMapView = (selectedView === 'map');
    const biggerThanLargeTablet = (windowSize && windowSize >= viewportWidths.largeTablet);
    // TODO
    const locationEnabled = true;

    const showViewButtons = !!(locationEnabled && showViewToggle);

    return (
      <Container id="e2e-ideas-container" className={className}>
        <FiltersArea id="e2e-ideas-filters" className={`${showMapView && 'mapView'}`}>
          <LeftFilterArea className={`${showMapView && 'hidden'}`}>
            <StyledSearchInput
              className="e2e-search-ideas-input"
              placeholder={this.searchPlaceholder}
              ariaLabel={this.searchAriaLabel}
              onChange={this.handleSearchOnChange}
            />
          </LeftFilterArea>

          <RightFilterArea>
            <DropdownFilters className={`${showMapView ? 'hidden' : 'visible'} ${showViewButtons ? 'hasViewButtons' : ''}`}>
              <SelectSort onChange={this.handleSortOnChange} alignment={biggerThanLargeTablet ? 'right' : 'left'} />
              {allowProjectsFilter && <ProjectFilterDropdown onChange={this.handleProjectsOnChange} />}
              <TopicFilterDropdown onChange={this.handleTopicsOnChange} alignment={biggerThanLargeTablet ? 'right' : 'left'} />
            </DropdownFilters>

            {showViewButtons &&
              <StyledViewButtons
                selectedView={selectedView}
                onClick={this.selectView}
              />
            }
          </RightFilterArea>
        </FiltersArea>

        {showListView && querying &&
          <Loading id="ideas-loading">
            <Spinner />
          </Loading>
        }

        {!querying && !hasIdeas && !showMapView &&
          <EmptyContainer id="ideas-empty">
            <IdeaIcon ariaHidden name="idea" />
            <EmptyMessage>
              <EmptyMessageLine>
                <FormattedMessage {...messages.noIdeasForFilter} />
              </EmptyMessageLine>
            </EmptyMessage>
          </EmptyContainer>
        }

        {showListView && !querying && hasIdeas && list &&
          <IdeasList id="e2e-ideas-list">
            {list.map((idea) => (
              <StyledIdeaCard
                key={idea.id}
                ideaId={idea.id}
                participationMethod={participationMethod}
                participationContextId={participationContextId}
                participationContextType={participationContextType}
              />
            ))}
          </IdeasList>
        }

        {showListView && !querying && hasMore &&
          <Footer>
            <ShowMoreButton
              id="e2e-idea-cards-show-more-button"
              onClick={this.loadMore}
              buttonStyle="secondary"
              text={<FormattedMessage {...messages.showMore} />}
              processing={loadingMore}
              height="50px"
              icon="showMore"
              iconPos="left"
              textColor={theme.colorText}
              bgColor={rgba(theme.colorText, 0.08)}
              bgHoverColor={rgba(theme.colorText, 0.12)}
              fontWeight="500"
            />
          </Footer>
        }

        {showMapView &&
          <IdeasMap projectIds={queryParameters.projects} phaseId={queryParameters.phase} />
        }
      </Container>
    );
  }
}

const Data = adopt<DataProps, InputProps>({
  windowSize: <GetWindowSize />,
  ideas: ({ render, children, ...getIdeasInputProps }) => <GetIdeas {...getIdeasInputProps} pageSize={12} sort="random">{render}</GetIdeas>,
  project: ({ participationContextType, participationContextId, render }) => <GetProject projectId={participationContextType === 'project' ? participationContextId : null}>{render}</GetProject>,
  phase: ({ participationContextType, participationContextId, render }) => <GetPhase id={participationContextType === 'phase' ? participationContextId : null}>{render}</GetPhase>,
});

const WithoutFiltersSidebarWithHoCs = withTheme(injectIntl(WithoutFiltersSidebar));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <WithoutFiltersSidebarWithHoCs {...inputProps} {...dataProps} />}
  </Data>
);
