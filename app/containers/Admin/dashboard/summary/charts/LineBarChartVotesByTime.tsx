// libraries
import React from 'react';
import { Subscription, combineLatest } from 'rxjs';
import { map, merge, isEmpty } from 'lodash-es';

// styling
import { withTheme } from 'styled-components';
import { rgba } from 'polished';

// services
import {
  votesByTimeStream,
  votesByTimeCumulativeStream,
  votesByTimeXlsxEndpoint,
  IVotesByTime,
} from 'services/stats';

// components
import ExportMenu from '../../components/ExportMenu';
import {
  Line,
  Label,
  Bar,
  Tooltip,
  XAxis,
  YAxis,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  ComposedChart,
} from 'recharts';
import {
  IResolution,
  GraphCard,
  NoDataContainer,
  GraphCardInner,
  GraphCardHeader,
  GraphCardTitle,
  GraphCardFigureContainer,
  GraphCardFigure,
  GraphCardFigureChange,
} from '../..';

// i18n
import messages from '../../messages';
import { injectIntl, FormattedMessage } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';

type ISerie = {
  cumulatedTotal: number;
  date: string | number;
  up: number;
  down: number;
  total: number;
  code: string;
}[];

type State = {
  serie: ISerie | null;
};

type Props = {
  className?: string;
  startAt: string | null | undefined;
  endAt: string | null;
  resolution: IResolution;
  currentProjectFilter: string | undefined;
  currentGroupFilter: string | undefined;
  currentTopicFilter: string | undefined;
  currentProjectFilterLabel: string | undefined;
  currentGroupFilterLabel: string | undefined;
  currentTopicFilterLabel: string | undefined;
};

class LineBarChartVotesByTime extends React.PureComponent<
  Props & InjectedIntlProps,
  State
> {
  combined$: Subscription;
  currentChart: React.RefObject<any>;

  constructor(props: Props) {
    super(props as any);
    this.state = {
      serie: null,
    };

    this.currentChart = React.createRef();
  }

  componentDidMount() {
    const {
      startAt,
      endAt,
      resolution,
      currentGroupFilter,
      currentTopicFilter,
      currentProjectFilter,
    } = this.props;

    this.resubscribe(
      startAt,
      endAt,
      resolution,
      currentGroupFilter,
      currentTopicFilter,
      currentProjectFilter
    );
  }

  componentDidUpdate(prevProps: Props) {
    const {
      startAt,
      endAt,
      resolution,
      currentGroupFilter,
      currentTopicFilter,
      currentProjectFilter,
    } = this.props;

    if (
      startAt !== prevProps.startAt ||
      endAt !== prevProps.endAt ||
      resolution !== prevProps.resolution ||
      currentGroupFilter !== prevProps.currentGroupFilter ||
      currentTopicFilter !== prevProps.currentTopicFilter ||
      currentProjectFilter !== prevProps.currentProjectFilter
    ) {
      this.resubscribe(
        startAt,
        endAt,
        resolution,
        currentGroupFilter,
        currentTopicFilter,
        currentProjectFilter
      );
    }
  }

  componentWillUnmount() {
    this.combined$.unsubscribe();
  }

  convertAndMergeSeries(barSerie: IVotesByTime, lineSerie: IVotesByTime) {
    const { up, down, total } = barSerie.series;
    let convertedLineSerie;
    let convertedBarSerie;

    if (!isEmpty(total) && !isEmpty(lineSerie.series.total)) {
      convertedBarSerie = map(total, (value, key) => ({
        total: value,
        down: down[key],
        up: up[key],
        date: key,
        code: key,
      }));

      convertedLineSerie = map(lineSerie.series.total, (value, key) => ({
        cumulatedTotal: value,
        date: key,
        code: key,
      }));
    } else {
      return null;
    }

    merge(convertedBarSerie, convertedLineSerie);
    return convertedBarSerie;
  }

  resubscribe(
    startAt: string | null | undefined,
    endAt: string | null,
    resolution: IResolution,
    currentGroupFilter: string | undefined,
    currentTopicFilter: string | undefined,
    currentProjectFilter: string | undefined
  ) {
    if (this.combined$) {
      this.combined$.unsubscribe();
    }

    const queryParameters = {
      queryParameters: {
        start_at: startAt,
        end_at: endAt,
        interval: resolution,
        project: currentProjectFilter,
        group: currentGroupFilter,
        topic: currentTopicFilter,
      },
    };

    const barStreamObservable = votesByTimeStream(queryParameters).observable;
    const lineStreamObservable = votesByTimeCumulativeStream(queryParameters)
      .observable;
    this.combined$ = combineLatest(
      barStreamObservable,
      lineStreamObservable
    ).subscribe(([barSerie, lineSerie]) => {
      const convertedAndMergedSeries = this.convertAndMergeSeries(
        barSerie,
        lineSerie
      );
      this.setState({ serie: convertedAndMergedSeries });
    });
  }

  formatTick = (date: string) => {
    const { resolution } = this.props;
    const { formatDate } = this.props.intl;

    return formatDate(date, {
      day: resolution === 'month' ? undefined : '2-digit',
      month: 'short',
    });
  };

  formatLabel = (date: string) => {
    const { resolution } = this.props;
    const { formatDate } = this.props.intl;

    return formatDate(date, {
      day: resolution === 'month' ? undefined : '2-digit',
      month: 'long',
      year: 'numeric',
    });
  };

  formatSerieChange = (serieChange: number) => {
    if (serieChange > 0) {
      return `(+${serieChange.toString()})`;
    } else if (serieChange < 0) {
      return `(${serieChange.toString()})`;
    }
    return null;
  };

  getFormattedNumbers(serie: ISerie | null) {
    if (serie) {
      const firstSerieValue = serie[0].cumulatedTotal;
      const lastSerieValue = serie[serie.length - 1].cumulatedTotal;
      const serieChange = lastSerieValue - firstSerieValue;
      let typeOfChange: 'increase' | 'decrease' | '' = '';

      if (serieChange > 0) {
        typeOfChange = 'increase';
      } else if (serieChange < 0) {
        typeOfChange = 'decrease';
      }

      return {
        typeOfChange,
        totalNumber: lastSerieValue,
        formattedSerieChange: this.formatSerieChange(serieChange),
      };
    }

    return {
      totalNumber: null,
      formattedSerieChange: null,
      typeOfChange: '',
    };
  }

  render() {
    const {
      chartLabelSize,
      chartLabelColor,
      chartStroke,
      chartFill,
      animationBegin,
      animationDuration,
    } = this.props['theme'];
    const { formatMessage } = this.props.intl;
    const { serie } = this.state;
    const formattedNumbers = this.getFormattedNumbers(serie);
    const { className } = this.props;
    const {
      totalNumber,
      formattedSerieChange,
      typeOfChange,
    } = formattedNumbers;

    return (
      <GraphCard className={className}>
        <GraphCardInner>
          <GraphCardHeader>
            <GraphCardTitle>
              <FormattedMessage {...messages.ideaVotesByTimeTitle} />
            </GraphCardTitle>
            <GraphCardFigureContainer>
              <GraphCardFigure>{totalNumber}</GraphCardFigure>
              <GraphCardFigureChange className={typeOfChange}>
                {formattedSerieChange}
              </GraphCardFigureChange>
            </GraphCardFigureContainer>
            {serie && (
              <ExportMenu
                svgNode={this.currentChart}
                xlsxEndpoint={votesByTimeXlsxEndpoint}
                name={formatMessage(messages.ideaVotesByTimeTitle)}
                {...this.props}
              />
            )}
          </GraphCardHeader>
          {!serie ? (
            <NoDataContainer>
              <FormattedMessage {...messages.noData} />
            </NoDataContainer>
          ) : (
            <ResponsiveContainer>
              <ComposedChart
                data={serie}
                margin={{ right: 40 }}
                ref={this.currentChart}
              >
                <CartesianGrid stroke="#f5f5f5" strokeWidth={0.5} />
                <XAxis
                  dataKey="date"
                  interval="preserveStartEnd"
                  stroke={chartLabelColor}
                  fontSize={chartLabelSize}
                  tick={{ transform: 'translate(0, 7)' }}
                  tickFormatter={this.formatTick}
                />
                <YAxis
                  stroke={chartLabelColor}
                  fontSize={chartLabelSize}
                  yAxisId="cumulatedTotal"
                >
                  <Label
                    value={formatMessage(messages.total)}
                    angle={-90}
                    position={'center'}
                    offset={-20}
                  />
                </YAxis>
                <YAxis yAxisId="barValue" orientation="right">
                  <Label
                    value={formatMessage(messages.perPeriod, {
                      period: this.props.resolution,
                    })}
                    angle={90}
                    position={'center'}
                    offset={-20}
                  />
                </YAxis>
                <Tooltip
                  isAnimationActive={false}
                  labelFormatter={this.formatLabel}
                />
                <Line
                  type="monotone"
                  dataKey="cumulatedTotal"
                  name={formatMessage(messages.total)}
                  dot={false}
                  stroke={chartStroke}
                  yAxisId="cumulatedTotal"
                />
                <Bar
                  dataKey="up"
                  name={formatMessage(messages.numberOfVotesUp)}
                  dot={false}
                  fill={rgba(chartFill, 0.5)}
                  animationDuration={animationDuration}
                  animationBegin={animationBegin}
                  stackId="1"
                  yAxisId="barValue"
                />
                <Bar
                  dataKey="down"
                  name={formatMessage(messages.numberOfVotesDown)}
                  dot={false}
                  fill={rgba(chartFill, 0.7)}
                  stackId="1"
                  animationDuration={animationDuration}
                  animationBegin={animationBegin}
                  stroke="none"
                  yAxisId="barValue"
                />

                <Legend
                  wrapperStyle={{
                    paddingTop: '20px',
                  }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          )}
        </GraphCardInner>
      </GraphCard>
    );
  }
}

export default injectIntl<Props>(
  withTheme(LineBarChartVotesByTime as any) as any
);
