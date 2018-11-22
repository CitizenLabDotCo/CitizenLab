// libraries
import React, { PureComponent } from 'react';
import { adopt } from 'react-adopt';
import moment, { Moment } from 'moment';
import { ThemeProvider } from 'styled-components';

// components
import { chartTheme, GraphsContainer, ControlBar, Column, IResolution } from '../';
import BarChartActiveUsersByTime from './charts/BarChartActiveUsersByTime';
import ChartFilters from '../components/ChartFilters';
import CumulativeAreaChart from './charts/CumulativeAreaChart';
import SelectableResourceByProjectChart from './charts/SelectableResourceByProjectChart';
import SelectableResourceByTopicChart from './charts/SelectableResourceByTopicChart';
import ResolutionControl from '../components/ResolutionControl';
import LineChartVotesByTime from './charts/LineChartVotesByTime';
import TimeControl from '../components/TimeControl';

// typings
import { IOption } from 'typings';

// tracking
import { injectTracks } from 'utils/analytics';
import tracks from '../tracks';

// i18n
import messages from '../messages';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import localize, { InjectedLocalized } from 'utils/localize';

// resources
import GetProjects, { GetProjectsChildProps } from 'resources/GetProjects';
import GetGroups, { GetGroupsChildProps } from 'resources/GetGroups';
import GetTopics, { GetTopicsChildProps } from 'resources/GetTopics';
import { isNilOrError } from 'utils/helperUtils';
import { ITopicData } from 'services/topics';
import {
  usersByTimeCumulativeStream,
  activeUsersByTimeStream,
  ideasByTimeCumulativeStream,
  commentsByTimeCumulativeStream,
} from 'services/stats';

export type IResource = 'ideas' | 'comments' | 'votes';

interface InputProps {
  onlyModerator?: boolean;
}

interface DataProps {
  projects: GetProjectsChildProps;
  groups: GetGroupsChildProps;
  topics: GetTopicsChildProps;
}

interface Props extends InputProps, DataProps { }

interface State {
  resolution: IResolution;
  startAtMoment?: Moment | null | undefined;
  endAtMoment: Moment | null;
  currentProjectFilter: string | null;
  currentGroupFilter: string | null;
  currentTopicFilter: string | null;
  currentResourceByTopic: IResource;
  currentResourceByProject: IResource;
  projectFilterOptions: IOption[];
}

interface Tracks {
  trackFilterOnGroup: Function;
  trackFilterOnProject: Function;
  trackFilterOnTopic: Function;
  trackResourceChange: Function;
}

interface PropsHithHoCs extends Props, InjectedIntlProps, InjectedLocalized, Tracks { }

class DashboardPageSummary extends PureComponent<PropsHithHoCs, State> {
  resourceOptions: IOption[];
  groupFilterOptions: IOption[];
  topicFilterOptions: IOption[];

  constructor(props: PropsHithHoCs) {
    super(props);
    const { onlyModerator, projects: { projectsList }, intl: { formatMessage } } = props;
    this.resourceOptions = [
      { value: 'ideas', label: formatMessage(messages.ideas) },
      { value: 'comments', label: formatMessage(messages.comments) },
      { value: 'votes', label: formatMessage(messages.votes) }
    ];
    this.groupFilterOptions = this.generateGroupsOptions();
    this.topicFilterOptions = this.generateTopicOptions();
    this.state = {
      resolution: 'month',
      startAtMoment: undefined,
      endAtMoment: moment(),
      currentProjectFilter: onlyModerator
        ? (projectsList && projectsList.length > 0 ? projectsList[0].id : null)
        : null,
      currentGroupFilter: null,
      currentTopicFilter: null,
      currentResourceByTopic: 'ideas',
      currentResourceByProject: 'ideas',
      projectFilterOptions: this.generateProjectOptions()
    };
  }

  componentDidUpdate(prevProps: Props) {
    const { projects: { projectsList }, topics, groups, onlyModerator } = this.props;

    if (projectsList !== prevProps.projects.projectsList) {
      this.setState({ projectFilterOptions: this.generateProjectOptions() });
      if (onlyModerator && this.state.currentProjectFilter === null) {
        this.setState({ currentProjectFilter: (projectsList && projectsList.length > 0 ? projectsList[0].id : null) });
      }
    }

    if (topics !== prevProps.topics) {
      this.topicFilterOptions = this.generateTopicOptions();
    }

    if (groups !== prevProps.groups) {
      this.groupFilterOptions = this.generateGroupsOptions();
    }
  }

  handleChangeResolution = (resolution: IResolution) => {
    this.setState({ resolution });
  }

  handleChangeTimeRange = (startAtMoment: Moment | null | undefined, endAtMoment: Moment | null) => {
    const timeDiff = endAtMoment && startAtMoment && moment.duration(endAtMoment.diff(startAtMoment));
    const resolution = timeDiff ? (timeDiff.asMonths() > 6 ? 'month' : timeDiff.asWeeks() > 4 ? 'week' : 'day')
      : 'month';
    this.setState({ startAtMoment, endAtMoment, resolution });
  }

  handleOnProjectFilter = (filter) => {
    this.props.trackFilterOnProject({ extra: { project: filter } });
    this.setState({ currentProjectFilter: filter.value });
  }

  handleOnGroupFilter = (filter) => {
    this.props.trackFilterOnGroup({ extra: { group: filter } });
    this.setState({ currentGroupFilter: filter.value });
  }

  handleOnTopicFilter = (filter) => {
    this.props.trackFilterOnTopic({ extra: { topic: filter } });
    this.setState({ currentTopicFilter: filter.value });
  }

  onResourceByTopicChange = (option) => {
    this.props.trackResourceChange({
      extra:
        { newResource: option, graph: 'resourceByTopic' }
    });
    this.setState({ currentResourceByTopic: option.value });
  }

  onResourceByProjectChange = (option) => {
    this.props.trackResourceChange({
      extra:
        { newResource: option, graph: 'resourceByProject' }
    });
    this.setState({ currentResourceByProject: option.value });
  }

  generateProjectOptions = () => {
    const {
      projects,
      projects: { projectsList },
      localize,
      onlyModerator,
      intl: {
        formatMessage
      }
    } = this.props;
    let filterOptions: IOption[] = [];
    if (!isNilOrError(projects) && !isNilOrError(projectsList)) {
      filterOptions = projectsList.map((project) => (
        {
          value: project.id,
          label: localize(project.attributes.title_multiloc),
        }
      ));
    }

    if (!onlyModerator) {
      filterOptions = [{ value: '', label: formatMessage(messages.allProjects) }, ...filterOptions];
    }

    return filterOptions;
  }

  generateGroupsOptions = () => {
    const {
      groups,
      groups: {
        groupsList
      },
      intl: {
        formatMessage
      },
      localize
    } = this.props;

    let filterOptions: IOption[] = [];

    if (!isNilOrError(groups) && !isNilOrError(groupsList)) {
      filterOptions = groupsList.map((group) => (
        {
          value: group.id,
          label: localize(group.attributes.title_multiloc)
        }
      ));
    }

    return [{ value: '', label: formatMessage(messages.allGroups) }, ...filterOptions];
  }

  generateTopicOptions = () => {
    const {
      topics,
      localize,
      intl: {
        formatMessage
      }
    } = this.props;

    let filterOptions: IOption[] = [];

    if (!isNilOrError(topics)) {
      filterOptions = topics.filter(topic =>
        !isNilOrError(topic)).map((topic: ITopicData) => {
          return {
            value: topic.id,
            label: localize(topic.attributes.title_multiloc),
          };
        });
    }

    return [{ value: '', label: formatMessage(messages.allTopics) }, ...filterOptions];
  }

  render() {
    const {
      resolution,
      startAtMoment,
      endAtMoment,
      currentProjectFilter,
      currentGroupFilter,
      currentTopicFilter,
      projectFilterOptions
    } = this.state;
    const startAt = startAtMoment && startAtMoment.toISOString();
    const endAt = endAtMoment && endAtMoment.toISOString();

    const { projects, projects: { projectsList }, intl: { formatMessage } } = this.props;

    const infoMessage = formatMessage(messages.activeUsersDescription);

    if (projects && !isNilOrError(projectsList)) {
      return (
        <>
          <ControlBar>
            <TimeControl
              startAtMoment={startAtMoment}
              endAtMoment={endAtMoment}
              onChange={this.handleChangeTimeRange}
            />
            <ResolutionControl
              value={resolution}
              onChange={this.handleChangeResolution}
            />
          </ControlBar>

          <ChartFilters
            configuration={{
              showProjectFilter: true,
              showGroupFilter: true,
              showTopicFilter: true
            }}

            currentProjectFilter={currentProjectFilter}
            currentGroupFilter={currentGroupFilter}
            currentTopicFilter={currentTopicFilter}

            projectFilterOptions={projectFilterOptions}
            groupFilterOptions={this.groupFilterOptions}
            topicFilterOptions={this.topicFilterOptions}

            onProjectFilter={this.handleOnProjectFilter}
            onGroupFilter={this.handleOnGroupFilter}
            onTopicFilter={this.handleOnTopicFilter}
          />

          <ThemeProvider theme={chartTheme}>
            <GraphsContainer>
              <CumulativeAreaChart
                graphTitleMessageKey="usersByTimeTitle"
                graphUnit="users"
                startAt={startAt}
                endAt={endAt}
                resolution={resolution}
                stream={usersByTimeCumulativeStream}
                {...this.state}
              />
              <BarChartActiveUsersByTime
                graphUnit="users"
                graphUnitMessageKey="activeUsers"
                graphTitleMessageKey="activeUsersByTimeTitle"
                startAt={startAt}
                endAt={endAt}
                resolution={resolution}
                stream={activeUsersByTimeStream}
                infoMessage={infoMessage}
                {...this.state}
              />
              <CumulativeAreaChart
                graphTitleMessageKey="ideasByTimeTitle"
                graphUnit="ideas"
                startAt={startAt}
                endAt={endAt}
                resolution={resolution}
                stream={ideasByTimeCumulativeStream}
                {...this.state}
              />
              <CumulativeAreaChart
                graphTitleMessageKey="commentsByTimeTitle"
                graphUnit="comments"
                startAt={startAt}
                endAt={endAt}
                resolution={resolution}
                stream={commentsByTimeCumulativeStream}
                {...this.state}
              />
              <Column>
                <LineChartVotesByTime
                  className="fullWidth"
                  startAt={startAt}
                  endAt={endAt}
                  resolution={resolution}
                  {...this.state}
                />
                <SelectableResourceByProjectChart
                  className="dynamicHeight fullWidth"
                  onResourceByProjectChange={this.onResourceByProjectChange}
                  resourceOptions={this.resourceOptions}
                  projectOptions={this.state.projectFilterOptions}
                  startAt={startAt}
                  endAt={endAt}
                  {...this.state}
                />
              </Column>
              <Column>
                <SelectableResourceByTopicChart
                  className="fullWidth dynamicHeight"
                  topicOptions={this.topicFilterOptions}
                  onResourceByTopicChange={this.onResourceByTopicChange}
                  resourceOptions={this.resourceOptions}
                  startAt={startAt}
                  endAt={endAt}
                  {...this.state}
                />
              </Column>
            </GraphsContainer>
          </ThemeProvider>
        </>
      );
    }
    return null;
  }
}

const Data = adopt<DataProps, InputProps>({
  projects: (
    <GetProjects
      publicationStatuses={['draft', 'published', 'archived']}
      filterCanModerate={true}
    />),
  groups: <GetGroups />,
  topics: <GetTopics />,
});

const DashboardPageSummaryWithHOCs = injectTracks<Props>({
  trackFilterOnGroup: tracks.filteredOnGroup,
  trackFilterOnProject: tracks.filteredOnProject,
  trackFilterOnTopic: tracks.filteredOnTopic,
  trackResourceChange: tracks.choseResource,
})(localize<Props & Tracks>(injectIntl(DashboardPageSummary)));

export default (inputProps: InputProps) => (
  <Data {...inputProps}>
    {dataProps => <DashboardPageSummaryWithHOCs {...inputProps} {...dataProps} />}
  </Data>
);
