import React, { PureComponent } from 'react';
import { Subscription, BehaviorSubject, combineLatest } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';
import { map, sortBy } from 'lodash-es';
import { withTheme } from 'styled-components';
import { BarChart, Bar, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';
import localize, { InjectedLocalized } from 'utils/localize';
import { ideasByProjectStream, IIdeasByProject, commentsByProjectStream, ICommentsByProject, votesByProjectStream, IVotesByProject } from 'services/stats';
import { injectIntl } from 'utils/cl-intl';
import { InjectedIntlProps } from 'react-intl';
import messages from '../messages';
import EmptyGraph from './EmptyGraph';

import { IResource } from '../summary';

interface Props {
  startAt: string;
  endAt: string;
  currentProjectFilter: string;
  currentGroupFilter: string;
  currentTopicFilter: string;
  selectedResource: IResource;
}

type IGraphFormat = {
  name: any,
  value: any,
  code: any
}[];

interface State {
  serie: IGraphFormat | null;
}

class ResourceByProjectWithFilterChart extends PureComponent<Props & InjectedLocalized & InjectedIntlProps, State> {
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
        this.currentProjectFilter$.pipe(
          filter(endAt => endAt !== null)
        ),
        this.currentGroupFilter$.pipe(
          filter(endAt => endAt !== null)
        ),
        this.currentTopicFilter$.pipe(
          filter(endAt => endAt !== null)
        )
      ).pipe(
        switchMap(([startAt, endAt, selectedResource, currentGroupFilter, currentTopicFilter]) => {
          const queryParameters = {
            startAt,
            endAt,
            // TODO group: (currentGroupFilter === 'all') ? undefined : currentGroupFilter,
            // TODO project: (currentTopicFilter === 'all') ? undefined : currentTopicFilter,
          };
          if (selectedResource === 'Ideas') {
            return ideasByProjectStream({
              queryParameters
            }).observable;
          } else if (selectedResource === 'Comments') {
            return commentsByProjectStream({
              queryParameters
            }).observable;
          } else {
            return votesByProjectStream({
              queryParameters
            }).observable;
          }
        })
      ).subscribe((serie) => {
        const convertedSerie = this.convertToGraphFormat(serie);
        if (this.props.currentProjectFilter !== 'all') {
          this.setState({ serie: this.filterByProject(convertedSerie) });
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

    if (this.props.selectedResource !== prevProps.selectedResource) {
      this.selectedResource$.next(this.props.selectedResource);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
  }

  convertToGraphFormat = (serie: IIdeasByProject | IVotesByProject | ICommentsByProject) => {
    if (serie) {
      const { data, projects } = serie;
      const { localize } = this.props;

      const mapped = map(data, (count: number, projectId: string) => ({
        name: localize(projects[projectId].title_multiloc),
        value: count,
        code: projectId,
      }));
      return sortBy(mapped, 'name');
    }

    return null;
  }

  filterByProject = (serie: IGraphFormat | null) => {
    if (serie) {
      const { currentProjectFilter } = this.props;
      const selectedProject = serie.find(item => item.code === currentProjectFilter);
      const selectedProjectCount = selectedProject ? selectedProject.value : 0;
      const filteredSerie = serie.map(item => {
        const { value, ...rest } = item;
        return { value: value - selectedProjectCount, ...rest };
      }).filter(item => item.code !== currentProjectFilter);
      filteredSerie.unshift({
        name: selectedProject ? selectedProject.name : 'selected project',
        value: 0,
        code: currentProjectFilter,
      });
      return filteredSerie;
    }

    return null;
  }

  render() {
    const theme = this.props['theme'];
    const { serie } = this.state;
    const { selectedResource, intl: { formatMessage }, currentProjectFilter } = this.props;
    if (!serie || serie.every(item => item.value === 0)) {
      return (<EmptyGraph unit={selectedResource} />);

    } else {
      const unitName = (currentProjectFilter !== 'all')
        ? formatMessage(messages.resourceByProjectDifference, {
          resourceName: formatMessage(messages[selectedResource]),
          project: serie[0].name
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
    }
  }
}

export default localize<Props>(injectIntl<Props & InjectedLocalized>(withTheme(ResourceByProjectWithFilterChart as any) as any));
