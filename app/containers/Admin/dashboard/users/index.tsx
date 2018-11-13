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
  Row,
  GraphCard,
  GraphCardInner,
  GraphCardTitle,
  ControlBar,
  IResolution
} from '../';
import TimeControl from '../components/TimeControl';
import ResolutionControl from '../components/ResolutionControl';
import GenderChart from '../components/charts/GenderChart';
import AgeChart from '../components/charts/AgeChart';
import ChartFilters from '../components/ChartFilters';

// i18n
import { FormattedMessage } from 'utils/cl-intl';
import messages from '../messages';

// typings
import { IOption } from 'typings';

// utils
import { isNilOrError } from 'utils/helperUtils';

interface State {
  resolution: IResolution;
  startAtMoment?: Moment | null;
  endAtMoment: Moment | null;
  currentGroupFilter: string | null;
}

interface DataProps {
  groups: GetGroupsChildProps;
}

interface Props extends DataProps { }

class UsersDashboard extends PureComponent<Props & InjectedLocalized, State> {
  constructor(props: Props & InjectedLocalized) {
    super(props);
    this.state = {
      resolution: 'month',
      startAtMoment: undefined,
      endAtMoment: moment(),
      currentGroupFilter: null
    };
  }

  changeResolution = (resolution: IResolution) => {
    this.setState({ resolution });
  }

  handleChangeTimeRange = (startAtMoment: Moment | null | undefined, endAtMoment: Moment | null) => {
    const timeDiff = endAtMoment && startAtMoment && moment.duration(endAtMoment.diff(startAtMoment));
    const resolution = timeDiff ? (timeDiff.asMonths() > 6 ? 'month' : timeDiff.asWeeks() > 4 ? 'week' : 'day')
      : 'month';
    this.setState({ startAtMoment, endAtMoment, resolution });
  }

  handleOnGroupFilter = (filter) => {
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

    filterOptions = [{ value: '', label: 'All' }, ...filterOptions];
    return filterOptions;
  }

  render() {
    const { resolution, currentGroupFilter, endAtMoment, startAtMoment } = this.state;
    const startAt = startAtMoment && startAtMoment.toISOString();
    const endAt = endAtMoment && endAtMoment.toISOString();

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
            onChange={this.changeResolution}
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
            <Row>
              <GraphCard className="first halfWidth">
                <GraphCardInner>
                  <GraphCardTitle>
                    <FormattedMessage {...messages.usersByGenderTitle} />
                  </GraphCardTitle>
                  <GenderChart startAt={startAt} endAt={endAt} currentGroupFilter={currentGroupFilter} />
                </GraphCardInner>
              </GraphCard>
              <GraphCard className="halfWidth">
                <GraphCardInner>
                  <GraphCardTitle>
                    <FormattedMessage {...messages.usersByAgeTitle} />
                  </GraphCardTitle>
                  <AgeChart startAt={startAt} endAt={endAt} currentGroupFilter={currentGroupFilter} />
                </GraphCardInner>
              </GraphCard>
            </Row>
          </GraphsContainer>
        </ThemeProvider>
      </>
    );
  }
}

const Data = adopt<DataProps, {}>({
  groups: <GetGroups />
});

const UsersDashBoardWithHOCs = localize<Props>(UsersDashboard);

export default () => (
  <Data>
    {dataProps => <UsersDashBoardWithHOCs {...dataProps} />}
  </Data>
);
