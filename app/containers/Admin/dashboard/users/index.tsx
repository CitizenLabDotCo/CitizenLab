// libraries
import React, { PureComponent } from 'react';
import moment, { Moment } from 'moment';
import { ThemeProvider } from 'styled-components';
import { adopt } from 'react-adopt';
import localize, { InjectedLocalized } from 'utils/localize';

// resources
import GetGroups, { GetGroupsChildProps } from 'resources/GetGroups';

// components
import {
  chartTheme,
  GraphsContainer,
  ControlBar,
} from '../';
import TimeControl from '../components/TimeControl';
import ChartFilters from '../components/ChartFilters';
import RegistrationFieldsToGraphs from './RegistrationFieldsToGraphs';
import MostActiveUsersChart from './charts/MostActiveUsersChart';
import AgeChart from './charts/AgeChart';

// i18n
import { injectIntl } from 'utils/cl-intl';
import messages from '../messages';
import { InjectedIntlProps } from 'react-intl';

// tracking
import { injectTracks } from 'utils/analytics';
import tracks from '../tracks';

// typings
import { IOption } from 'typings';

// utils
import { isNilOrError } from 'utils/helperUtils';

interface State {
  startAtMoment?: Moment | null;
  endAtMoment: Moment | null;
  currentGroupFilter: string | null;
}

interface DataProps {
  groups: GetGroupsChildProps;
}

interface Props extends DataProps { }

interface Tracks {
  trackFilterOnGroup: Function;
}

class UsersDashboard extends PureComponent<Props & InjectedIntlProps & InjectedLocalized & Tracks, State> {
  constructor(props: Props & InjectedIntlProps & InjectedLocalized & Tracks) {
    super(props as any);
    this.state = {
      startAtMoment: undefined,
      endAtMoment: moment(),
      currentGroupFilter: null
    };
  }

  handleChangeTimeRange = (startAtMoment: Moment | null | undefined, endAtMoment: Moment | null) => {
    this.setState({ startAtMoment, endAtMoment });
  }

  handleOnGroupFilter = (filter) => {
    this.props.trackFilterOnGroup({ extra: { group: filter } });
    this.setState({ currentGroupFilter: filter.value });
  }

  generateGroupFilterOptions = () => {
    const {
      groups,
      groups: { groupsList },
      localize } = this.props;

    let filterOptions: IOption[] = [];

    if (!isNilOrError(groups) && !isNilOrError(groupsList)) {
      filterOptions = groupsList.map((group) => (
        {
          value: group.id,
          label: localize(group.attributes.title_multiloc)
        }
      ));
    }

    return [{ value: '', label: 'All' }, ...filterOptions];
  }

  render() {
    const { currentGroupFilter, endAtMoment, startAtMoment } = this.state;
    const startAt = startAtMoment && startAtMoment.toISOString();
    const endAt = endAtMoment && endAtMoment.toISOString();
    const infoMessage = this.props.intl.formatMessage(messages.top10activeUsersDescription);

    return (
      <>
        <ControlBar>
          <TimeControl
            startAtMoment={startAtMoment}
            endAtMoment={endAtMoment}
            onChange={this.handleChangeTimeRange}
          />
        </ControlBar>

        <ChartFilters
          configuration={{
            showProjectFilter: false,
            showGroupFilter: true,
            showTopicFilter: false
          }}
          filters={{
            currentGroupFilter,
            currentProjectFilter: null,
            currentTopicFilter: null
          }}
          filterOptions={{
            projectFilterOptions: null,
            groupFilterOptions: this.generateGroupFilterOptions(),
            topicFilterOptions: null,
          }}
          onFilter={{
            onProjectFilter: null,
            onGroupFilter: this.handleOnGroupFilter,
            onTopicFilter: null,
          }}
        />

        <ThemeProvider theme={chartTheme}>
          <GraphsContainer>
            <AgeChart
              startAt={startAt}
              endAt={endAt}
              currentGroupFilter={currentGroupFilter}
            />
            <RegistrationFieldsToGraphs
              startAt={startAt}
              endAt={endAt}
              currentGroupFilter={currentGroupFilter}
            />
            <MostActiveUsersChart
              currentGroupFilter={currentGroupFilter}
              startAt={startAt}
              endAt={endAt}
              infoMessage={infoMessage}
              className="dynamicHeight"
            />
          </GraphsContainer>
        </ThemeProvider>
      </>
    );
  }
}

const Data = adopt<DataProps, {}>({
  groups: <GetGroups />
});

const UsersDashBoardWithHOCs = injectIntl(injectTracks<Props>({
  trackFilterOnGroup: tracks.filteredOnGroup,
})(localize<Props & Tracks>(UsersDashboard)));

export default () => (
  <Data>
    {dataProps => <UsersDashBoardWithHOCs {...dataProps} />}
  </Data>
);
