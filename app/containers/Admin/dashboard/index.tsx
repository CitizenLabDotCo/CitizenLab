import React, { PureComponent } from 'react';
import * as moment from 'moment';
import HelmetIntl from 'components/HelmetIntl';
import styled, { ThemeProvider } from 'styled-components';
import { Link } from 'react-router';
import messages from './messages';
import { FormattedMessage } from 'utils/cl-intl';
import FeatureFlag from 'components/FeatureFlag';
import Warning from 'components/UI/Warning';
import TimeControl from './components/TimeControl';
import IntervalControl from './components/IntervalControl';
import GenderChart from './components/GenderChart';
import AgeChart from './components/AgeChart';
import IdeasByTimeChart from './components/IdeasByTimeChart';
import UsersByTimeChart from './components/UsersByTimeChart';
import IdeasByTopicChart from './components/IdeasByTopicChart';
import { Flex, Box } from 'grid-styled';
import { colors } from 'utils/styleUtils';

const StyledWarning = styled(Warning)`
  margin-bottom: 30px;
`;

const ControlBar = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const GraphCard: any = styled.div`
  background: ${colors.adminContentBackground};
  border: solid 1px ${colors.adminBorder};
  border-radius: 5px;
  height: ${(props: any) => props.dynamicHeight ? 'auto' : '350px'};
  padding: 20px;
  flex-direction: column;
  display: flex;
  align-items: center;
`;

const GraphCardTitle = styled.h3`
  font-size: 20px;
  font-weight: 400;
  align-self: flex-start;
  padding-bottom: 20px;
`;

interface Props {}

interface State {
  interval: 'weeks' | 'months' | 'years';
  intervalIndex: number;
}

export default class DashboardPage extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      interval: 'months',
      intervalIndex: 0
    };
  }

  changeInterval = (interval: 'weeks' | 'months' | 'years') => {
    this.setState({ interval, intervalIndex: 0 });
  }

  changeIntervalIndex = (intervalIndex: number) => {
    this.setState({ intervalIndex });
  }

  chartTheme = (theme) => {
    return {
      ...theme,
      chartStroke: colors.clIconAccent,
      chartFill: colors.clIconAccent,
      barFill: colors.adminContentBackground,
      chartLabelColor: colors.adminSecondaryTextColor,
      chartLabelSize: 13
    };
  }

  render() {
    const { interval, intervalIndex } = this.state;
    const startAtMoment = moment().startOf(interval).add(intervalIndex, interval);
    const endAtMoment = moment(startAtMoment).add(1, interval);
    const startAt = startAtMoment.toISOString();
    const endAt = endAtMoment.toISOString();
    const resolution = (interval === 'years' ? 'month' : 'day');

    return (
      <>
        <HelmetIntl
          title={messages.helmetTitle}
          description={messages.helmetDescription}
        />

        {/* <FeatureFlag name={'clustering'}> */}
          <StyledWarning
            text={
              <FormattedMessage
                {...messages.tryOutInsights}
                values={{
                  insightsLink: <Link to={`/admin/clusterings`}><FormattedMessage {...messages.insightsLinkText} /></Link>
                }}
              />
            }
          />
        {/* </FeatureFlag> */}

        <ControlBar>
          <TimeControl
            value={intervalIndex}
            interval={interval}
            onChange={this.changeIntervalIndex}
            currentTime={startAtMoment}
          />
          <IntervalControl
            value={interval}
            onChange={this.changeInterval}
          />
        </ControlBar>
        <ThemeProvider theme={this.chartTheme}>
          <Flex mx={-10} my={20} flexWrap="wrap">
            <Box width={[1, 1, 1 / 2]} p={10}>
              <GraphCard >
                <GraphCardTitle>
                  <FormattedMessage {...messages.usersByGenderTitle} />
                </GraphCardTitle>
                <GenderChart startAt={startAt} endAt={endAt} />
              </GraphCard>
            </Box>
            <Box width={[1, 1, 1 / 2]} p={10}>
              <GraphCard>
                <GraphCardTitle>
                  <FormattedMessage {...messages.usersByAgeTitle} />
                </GraphCardTitle>
                <AgeChart startAt={startAt} endAt={endAt} />
              </GraphCard>
            </Box>
            <Box width={1} p={10}>
              <GraphCard>
                <GraphCardTitle>
                  <FormattedMessage {...messages.usersByTimeTitle} />
                </GraphCardTitle>
                <UsersByTimeChart startAt={startAt} endAt={endAt} resolution={resolution} />
              </GraphCard>
            </Box>
            <Box width={[1, 1, 1 / 2]} p={10}>
              <GraphCard>
                <GraphCardTitle>
                  <FormattedMessage {...messages.ideasByTimeTitle} />
                </GraphCardTitle>
                <IdeasByTimeChart startAt={startAt} endAt={endAt} resolution={resolution} />
              </GraphCard>
            </Box>
            <Box width={[1, 1, 1 / 2]} p={10}>
              <GraphCard dynamicHeight>
                <GraphCardTitle>
                  <FormattedMessage {...messages.ideasByTopicTitle} />
                </GraphCardTitle>
                <IdeasByTopicChart startAt={startAt} endAt={endAt} />
              </GraphCard>
            </Box>
          </Flex>
        </ThemeProvider>
      </>
    );
  }
}
