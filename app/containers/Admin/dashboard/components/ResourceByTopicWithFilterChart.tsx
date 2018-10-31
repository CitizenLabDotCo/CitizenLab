import React, { PureComponent } from 'react';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { map, sortBy } from 'lodash-es';
import { withTheme } from 'styled-components';
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import localize, { InjectedLocalized } from 'utils/localize';
import { ideasByTopicStream, IIdeasByTopic, commentsByTopicStream, ICommentsByTopic, votesByTopicStream, IVotesByTopic } from 'services/stats';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../messages';
import EmptyGraph from './EmptyGraph';

import { IResource } from '../summary';
import { IGraphFormat, IOption } from 'typings';

interface Props {
  startAt: string;
  endAt: string;
  currentProjectFilter: string | null;
  currentGroupFilter: string | null;
  currentTopicFilter: string | null;
  topicOptions: IOption[];
  selectedResource: IResource;
}

interface State {
  serie: IGraphFormat | null;
}

class ResourceByTopicWithFilterChart extends PureComponent<Props & InjectedLocalized & InjectedIntlProps, State> {
  startAt$: BehaviorSubject<string | null>;
  endAt$: BehaviorSubject<string | null>;
  currentGroupFilter$: BehaviorSubject<string | null>;
  currentTopicFilter$: BehaviorSubject<string | null>;
  currentProjectFilter$: BehaviorSubject<string | null>;
  selectedResource$: BehaviorSubject<IResource | null>;
  subscriptions: Subscription[];

  constructor(props) {
    super(props);
    this.state = {
      serie: null,
    };
    this.subscriptions = [];
    this.startAt$ = new BehaviorSubject(null);
    this.endAt$ = new BehaviorSubject(null);
    this.selectedResource$ = new BehaviorSubject(null);
    this.currentGroupFilter$ = new BehaviorSubject(null);
    this.currentTopicFilter$ = new BehaviorSubject(null);
    this.currentProjectFilter$ = new BehaviorSubject(null);
  }

  componentDidMount() {
    this.startAt$.next(this.props.startAt);
    this.endAt$.next(this.props.endAt);
    this.selectedResource$.next(this.props.selectedResource);
    this.currentGroupFilter$.next(this.props.currentGroupFilter);
    this.currentTopicFilter$.next(this.props.currentTopicFilter);
    this.currentProjectFilter$.next(this.props.currentProjectFilter);

    this.subscriptions = [
      combineLatest(
        this.startAt$.pipe(
          filter(startAt => startAt !== null)
        ),
        this.endAt$.pipe(
          filter(endAt => endAt !== null)
        ),
        this.selectedResource$.pipe(
          filter(endAt => endAt !== null)
        ),
        this.currentGroupFilter$,
        this.currentProjectFilter$,
        this.currentTopicFilter$
      ).pipe(
        switchMap(([startAt, endAt, selectedResource, currentGroupFilter, currentProjectFilter]) => {
          const queryParameters = {
            startAt,
            endAt,
            project: currentProjectFilter,
            group: currentGroupFilter,
          };
          if (selectedResource === 'Ideas') {
            return ideasByTopicStream({
              queryParameters
            }).observable;
          } else if (selectedResource === 'Comments') {
            return commentsByTopicStream({
              queryParameters
            }).observable;
          } else {
            return votesByTopicStream({
              queryParameters
            }).observable;
          }
        })
      ).subscribe((serie) => {
        const convertedSerie = this.convertToGraphFormat(serie);
        if (this.props.currentTopicFilter) {
          this.setState({ serie: this.filterByTopic(convertedSerie) });
        } else { this.setState({ serie: convertedSerie }); }
      })
    ];
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.startAt !== prevProps.startAt) {
      this.startAt$.next(this.props.startAt);
    }

    if (this.props.endAt !== prevProps.endAt) {
      this.endAt$.next(this.props.endAt);
    }
    if (this.props.currentGroupFilter !== prevProps.currentGroupFilter) {
      this.currentGroupFilter$.next(this.props.currentGroupFilter);
    }

    if (this.props.currentTopicFilter !== prevProps.currentTopicFilter) {
      this.currentTopicFilter$.next(this.props.currentTopicFilter);
    }
    if (this.props.currentProjectFilter !== prevProps.currentProjectFilter) {
      this.currentProjectFilter$.next(this.props.currentProjectFilter);
    }

    if (this.props.selectedResource !== prevProps.selectedResource) {
      this.selectedResource$.next(this.props.selectedResource);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  convertToGraphFormat = (serie: IIdeasByTopic | IVotesByTopic | ICommentsByTopic) => {
    if (serie) {
      const { data, topics } = serie;
      const { localize } = this.props;

      const mapped = map(data, (count: number, topicId: string) => ({
        name: localize(topics[topicId].title_multiloc),
        value: count,
        code: topicId,
      }));
      return sortBy(mapped, 'name');
    }

    return null;
  }

  filterByTopic = (serie: IGraphFormat | null) => {
    if (serie) {
      const { currentTopicFilter, topicOptions, intl: { formatMessage } } = this.props;
      const selectedTopic = serie.find(item => item.code === currentTopicFilter);
      const selectedTopicCount = selectedTopic ? selectedTopic.value : 0;
      const filteredSerie = serie.map(item => {
        const { value, ...rest } = item;
        return { value: value - selectedTopicCount, ...rest };
      }).filter(item => item.code !== currentTopicFilter);
      let topicName;
      if (selectedTopic) {
        topicName = selectedTopic.name;
      } else {
        const foundOption = topicOptions.find(option => option.value === currentTopicFilter);
        topicName = foundOption ? foundOption.label : formatMessage(messages.selectedTopic);
      }
      filteredSerie.unshift({
        name: topicName,
        value: 0,
        code: currentTopicFilter,
      });
      return filteredSerie;
    }

    return null;
  }

  render() {
    const theme = this.props['theme'];
    const { serie } = this.state;
    const { selectedResource, intl: { formatMessage }, currentTopicFilter } = this.props;
    const isEmpty = !serie || serie.every(item => item.value === 0);

    if (!isEmpty) {
      const unitName = (currentTopicFilter && serie)
        ? formatMessage(messages.resourceByTopicDifference, {
          resourceName: formatMessage(messages[selectedResource]),
          topic: serie[0].name
        })
        : formatMessage(messages[selectedResource]);

      return (
        <ResponsiveContainer width="100%" height={serie && (serie.length * 50)}>
          <BarChart data={serie} layout="vertical">
            <Bar
              dataKey="value"
              name={unitName}
              fill={theme.chartFill}
              label={{ fill: theme.barFill, fontSize: theme.chartLabelSize }}
            />
            <YAxis
              dataKey="name"
              type="category"
              width={150}
              stroke={theme.chartLabelColor}
              fontSize={theme.chartLabelSize}
              tickLine={false}
            />
            <XAxis
              stroke={theme.chartLabelColor}
              fontSize={theme.chartLabelSize}
              type="number"
              tick={{ transform: 'translate(0, 7)' }}
            />
            <Tooltip isAnimationActive={false} />
          </BarChart>
        </ResponsiveContainer>
      );
    } else {
      return (<EmptyGraph unit={selectedResource} />);
    }
  }
}

export default localize<Props>(injectIntl<Props & InjectedLocalized>(withTheme(ResourceByTopicWithFilterChart as any) as any));
