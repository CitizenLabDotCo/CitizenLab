import { Component } from 'react';
import isEqual from 'lodash/isEqual';
import get from 'lodash/get';
import isString from 'lodash/isString';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';
import { Subscription, BehaviorSubject } from 'rxjs';
import { distinctUntilChanged, mergeScan, map } from 'rxjs/operators';
import { projectsStream, IProjectData } from 'services/projects';
import shallowCompare from 'utils/shallowCompare';

export type SortAttribute = 'new' | 'trending' | 'popular';
export type Sort =  'new' | '-new' | 'trending' | '-trending' | 'popular' | '-popular';
export type PublicationStatus = 'draft' | 'published' | 'archived';
export type SelectedPublicationStatus = 'all' | 'published' | 'archived';

export interface InputProps {
  pageNumber?: number;
  pageSize?: number;
  sort?: Sort;
  areas?: string[];
  topics?: string[];
  publicationStatuses: PublicationStatus[];
  hideAllFilters?: boolean;
  filterCanModerate?: boolean;
}

interface IQueryParameters {
  'page[number]'?: number;
  'page[size]'?: number;
  sort?: Sort;
  areas?: string[];
  topics?: string[];
  publication_statuses?: PublicationStatus[];
  filter_can_moderate?: boolean;
}

interface IAccumulator {
  projects: IProjectData[] | null;
  queryParameters: IQueryParameters;
  hasMore: boolean;
}

type children = (renderProps: GetProjectsChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: children;
}

export type GetProjectsChildProps = State & {
  onLoadMore: () => void;
  onChangeSorting: (sort: Sort) => void;
  onChangeAreas: (areas: string[]) => void;
  onChangeTopics: (topics: string[]) => void;
  onChangePublicationStatus: (publicationStatus: SelectedPublicationStatus) => void;
};

interface State {
  queryParameters: IQueryParameters;
  projectsList: IProjectData[] | undefined | null;
  hasMore: boolean;
  querying: boolean;
  loadingMore: boolean;
}

export default class GetProjects extends Component<Props, State> {
  private queryParameters$: BehaviorSubject<IQueryParameters>;
  private subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      // defaults
      queryParameters: {
        'page[number]': (props.pageNumber || 1),
        'page[size]': (props.pageSize || 250),
        sort: props.sort,
        areas: props.areas,
        topics: props.topics,
        publication_statuses: props.publicationStatuses
      },
      projectsList: undefined,
      hasMore: false,
      querying: true,
      loadingMore: false
    };

    const queryParameters = this.getQueryParameters(this.state, this.props);
    this.queryParameters$ = new BehaviorSubject(queryParameters);
    this.subscriptions = [];
  }

  componentDidMount() {
    const queryParameters = this.getQueryParameters(this.state, this.props);
    const startAccumulatorValue: IAccumulator = { queryParameters, projects: null, hasMore: false };

    this.subscriptions = [
      this.queryParameters$.pipe(
        distinctUntilChanged((x, y) => shallowCompare(x, y)),
        mergeScan<IQueryParameters, IAccumulator>((acc, queryParameters) => {
          const isLoadingMore = (acc.queryParameters['page[number]'] !== queryParameters['page[number]']);
          const pageNumber = (isLoadingMore ? queryParameters['page[number]'] : 1);
          const newQueryParameters: IQueryParameters = {
            ...queryParameters,
            'page[number]': pageNumber
          };

          this.setState({
            querying: !isLoadingMore,
            loadingMore: isLoadingMore,
          });

          return projectsStream({ queryParameters: newQueryParameters }).observable.pipe(map((projects) => {
            const selfLink = get(projects, 'links.self');
            const lastLink = get(projects, 'links.last');
            const hasMore = (isString(selfLink) && isString(lastLink) && selfLink !== lastLink);

            return {
              queryParameters,
              hasMore,
              projects: (!isLoadingMore ? projects.data : [...(acc.projects || []), ...projects.data])
            };
          }));
        }, startAccumulatorValue)
      ).subscribe(({ projects, queryParameters, hasMore }) => {
        this.setState({
          queryParameters,
          hasMore,
          projectsList: projects,
          querying: false,
          loadingMore: false
        });
      })
    ];
  }

  componentDidUpdate(prevProps: Props, _prevState: State) {
    const { children: prevChildren, ...prevPropsWithoutChildren } = prevProps;
    const { children: nextChildren, ...nextPropsWithoutChildren } = this.props;

    if (!isEqual(prevPropsWithoutChildren, nextPropsWithoutChildren)) {
      const queryParameters = this.getQueryParameters(this.state, this.props);
      this.queryParameters$.next(queryParameters);
    }
  }

  componentWillUnmount() {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  getQueryParameters = (state: State, props: Props) => {
    return {
      ...state.queryParameters,
      ...omitBy({
        'page[number]': props.pageNumber,
        'page[size]': props.pageSize,
        sort: props.sort,
        areas: props.areas,
        topics: props.topics,
        publication_statuses: props.publicationStatuses,
        filter_can_moderate: props.filterCanModerate,
      }, isNil)
    };
  }

  loadMore = () => {
    if (!this.state.loadingMore) {
      this.queryParameters$.next({
        ...this.state.queryParameters,
        'page[number]': (this.state.queryParameters['page[number]'] || 0) + 1
      });
    }
  }

  handleSortOnChange = (sort: Sort) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      sort
    });
  }

  handleAreasOnChange = (areas: string[]) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      areas
    });
  }

  handleTopicsOnChange = (topics: string[]) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      topics
    });
  }

  handlePublicationStatusOnChange = (publicationStatus: SelectedPublicationStatus) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      publication_statuses: (publicationStatus === 'all' ? ['published', 'archived'] : [publicationStatus])
    });
  }

  render() {
    const { children } = this.props;
    return (children as children)({
      ...this.state,
      onLoadMore: this.loadMore,
      onChangeSorting: this.handleSortOnChange,
      onChangeAreas: this.handleAreasOnChange,
      onChangeTopics: this.handleTopicsOnChange,
      onChangePublicationStatus: this.handlePublicationStatusOnChange
    });
  }
}
