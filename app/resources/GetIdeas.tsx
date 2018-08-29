import React from 'react';
import { get, isString, isEmpty, omitBy, isNil, isEqual, isBoolean } from 'lodash';
import { Subscription, Subject, BehaviorSubject } from 'rxjs';
import { merge } from 'rxjs/observable/merge';
import { combineLatest } from 'rxjs/observable/combineLatest';
import { map, startWith, distinctUntilChanged, tap, debounceTime, mergeScan, switchMap } from 'rxjs/operators';
import { ideasStream, IIdeaData, IdeaPublicationStatus } from 'services/ideas';
import shallowCompare from 'utils/shallowCompare';
import { getPageNumberFromUrl, getSortAttribute, getSortDirection, SortDirection } from 'utils/paginationUtils';

export type SortAttribute = 'new' | 'trending' | 'popular' | 'author_name' | 'upvotes_count' | 'downvotes_count' | 'status';
export type Sort =  'new' | '-new' | 'trending' | '-trending' | 'popular' | '-popular' | 'author_name' | '-author_name' | 'upvotes_count' | '-upvotes_count' | 'downvotes_count' | '-downvotes_count' | 'status' | '-status';
export type PublicationStatus = IdeaPublicationStatus;

export interface InputProps {
  type: 'load-more' | 'paginated';
  pageNumber?: number;
  pageSize: number;
  projectId?: string;
  phaseId?: string;
  authorId?: string;
  sort: Sort;
  search?: string;
  topics?: string[];
  areas?: string[];
  ideaStatusId?: string;
  publicationStatus?: PublicationStatus;
  boundingBox?: number[];
  cache?: boolean;
}

interface IQueryParameters {
  'page[number]': number;
  'page[size]': number;
  project: string | undefined;
  phase: string | undefined;
  author: string | undefined;
  sort: Sort;
  search: string | undefined;
  topics: string[] | undefined;
  areas: string[] | undefined;
  idea_status: string | undefined;
  publication_status: PublicationStatus | undefined;
  bounding_box: number[] | undefined;
}

interface IAccumulator {
  ideas: IIdeaData[] | null;
  queryParameters: IQueryParameters;
  hasMore: boolean;
}

type children = (renderProps: GetIdeasChildProps) => JSX.Element | null;

interface Props extends InputProps {
  children?: (obj: GetIdeasChildProps) => JSX.Element | null;
}

export type GetIdeasChildProps = State & {
  onLoadMore: () => void;
  onChangePage: (pageNumber: number) => void;
  onChangeProject: (projectId: string) => void;
  onChangePhase: (phaseId: string) => void;
  onChangeSearchTerm: (search: string) => void;
  onChangeSorting: (sort: string) => void;
  onChangeTopics: (topics: string[]) => void;
  onChangeAreas: (areas: string[]) => void;
  onChangeIdeaStatus: (ideaStatus: string) => void;
  onChangePublicationStatus: (publicationStatus: PublicationStatus) => void;
};

interface State {
  queryParameters: IQueryParameters;
  searchValue: string | undefined;
  ideasList: IIdeaData[] | undefined| null;
  hasMore: boolean;
  querying: boolean;
  loadingMore: boolean;
  sortAttribute: SortAttribute;
  sortDirection: SortDirection;
  currentPage: number;
  lastPage: number;
}

export default class GetIdeas extends React.Component<Props, State> {
  queryParameters$: BehaviorSubject<IQueryParameters>;
  search$: Subject<string | undefined>;
  subscriptions: Subscription[];

  constructor(props: Props) {
    super(props);
    this.state = {
      // defaults
      queryParameters: {
        'page[number]': 1,
        'page[size]': this.props.pageSize,
        sort: this.props.sort,
        project: undefined,
        phase: undefined,
        author: undefined,
        search: undefined,
        topics: undefined,
        areas: undefined,
        idea_status: undefined,
        publication_status: undefined,
        bounding_box: undefined
      },
      searchValue: undefined,
      ideasList: undefined,
      hasMore: false,
      querying: true,
      loadingMore: false,
      sortAttribute: getSortAttribute<Sort, SortAttribute>(this.props.sort),
      sortDirection: getSortDirection<Sort>(this.props.sort),
      currentPage: 1,
      lastPage: 1
    };
    const queryParameters = this.getQueryParameters(this.state, this.props);
    this.queryParameters$ = new BehaviorSubject(queryParameters);
    this.search$ = new Subject();
    this.subscriptions = [];
  }

  componentDidMount() {
    const queryParameters = this.getQueryParameters(this.state, this.props);
    const startAccumulatorValue: IAccumulator = { queryParameters, ideas: null, hasMore: false };
    const queryParametersInput$ = this.queryParameters$.pipe(
      distinctUntilChanged((x, y) => shallowCompare(x, y))
    );
    const queryParametersSearch$ = queryParametersInput$.pipe(
      map(queryParameters => queryParameters.search),
      distinctUntilChanged()
    );
    const search$ = merge(
      this.search$.pipe(
        tap(searchValue => this.setState({ searchValue })),
        debounceTime(500)
      ),
      queryParametersSearch$.pipe(
        tap(searchValue => this.setState({ searchValue }))
      )
    ).pipe(
      startWith(queryParameters.search),
      map(searchValue => ((isString(searchValue) && !isEmpty(searchValue)) ? searchValue : undefined)),
      distinctUntilChanged()
    );

    const queryParametersOutput$ = combineLatest(
      queryParametersInput$,
      search$
    ).pipe(
      map(([queryParameters, search]) => ({ ...queryParameters, search }))
    );

    if (!this.props.type || this.props.type === 'load-more') {
      this.subscriptions = [
        queryParametersOutput$.pipe(
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

            return ideasStream({ queryParameters: newQueryParameters }).observable.pipe(
              map((ideas) => {
                const cacheStream = (isBoolean(this.props.cache) ? this.props.cache : true);
                const selfLink = get(ideas, 'links.self');
                const lastLink = get(ideas, 'links.last');
                const hasMore = (isString(selfLink) && isString(lastLink) && selfLink !== lastLink);

                return {
                  queryParameters,
                  cacheStream,
                  hasMore,
                  ideas: (!isLoadingMore ? ideas.data : [...(acc.ideas || []), ...ideas.data])
                };
              })
            );
          }, startAccumulatorValue)
        ).subscribe(({ ideas, queryParameters, hasMore }) => {
          this.setState({ queryParameters, hasMore, ideasList: ideas, querying: false, loadingMore: false });
        })
      ];
    } else {
      this.subscriptions = [
        queryParametersOutput$.pipe(
          switchMap((queryParameters) => {
            const cacheStream = (isBoolean(this.props.cache) ? this.props.cache : true);
            const oldPageNumber = this.state.queryParameters['page[number]'];
            const newPageNumber = queryParameters['page[number]'];
            queryParameters['page[number]'] = (newPageNumber !== oldPageNumber ? newPageNumber : 1);

            return ideasStream({
              queryParameters,
              cacheStream
            }).observable.pipe(
              map(ideas => ({ queryParameters, ideas }))
            );
          })
        )
        .subscribe(({ ideas, queryParameters }) => {
          this.setState({
            queryParameters,
            ideasList: (ideas ? ideas.data : null),
            querying: false,
            loadingMore: false,
            sortAttribute: getSortAttribute<Sort, SortAttribute>(queryParameters.sort),
            sortDirection: getSortDirection<Sort>(queryParameters.sort),
            currentPage: getPageNumberFromUrl(ideas.links.self) || 1,
            lastPage: getPageNumberFromUrl(ideas.links.last) || 1
          });
        })
      ];
    }
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
    const InputPropsQueryParameters: IQueryParameters = {
      'page[number]': props.pageNumber as number,
      'page[size]': props.pageSize,
      project: props.projectId,
      phase: props.phaseId,
      author: props.authorId,
      sort: props.sort,
      search: props.search,
      topics: props.topics,
      areas: props.areas,
      idea_status: props.ideaStatusId,
      publication_status: props.publicationStatus,
      bounding_box: props.boundingBox
    };

    return {
      ...state.queryParameters,
      ...omitBy(InputPropsQueryParameters, isNil)
    };
  }

  handleSortOnChange = (newSortAttribute: SortAttribute) => {
    const { sort: oldSort } = this.state.queryParameters;
    const oldSortAttribute = getSortAttribute<Sort, SortAttribute>(oldSort);
    const oldSortDirection = getSortDirection<Sort>(oldSort);
    const newSortDirection = (newSortAttribute === oldSortAttribute && oldSortDirection === 'descending') ? 'ascending' : 'descending';
    const newSortDirectionSymbol = (newSortDirection === 'descending' ? '-' : '');
    const sort = `${newSortDirectionSymbol}${newSortAttribute}` as Sort;

    this.queryParameters$.next({
      ...this.state.queryParameters,
      sort
    });
  }

  loadMore = () => {
    if (!this.state.loadingMore) {
      this.queryParameters$.next({
        ...this.state.queryParameters,
        'page[number]': this.state.queryParameters['page[number]'] + 1
      });
    }
  }

  handleChangePage = (pageNumber: number) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      'page[number]': pageNumber
    });
  }

  handleProjectOnChange = (projectId: string) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      project: projectId
    });
  }

  handlePhaseOnChange = (phaseId: string) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      phase: phaseId
    });
  }

  handleSearchOnChange = (search: string) => {
    this.search$.next(search);
  }

  handleTopicsOnChange = (topics: string[]) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      topics
    });
  }

  handleAreasOnchange = (areas: string[]) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      areas
    });
  }

  handleIdeaStatusOnChange = (ideaStatus: string) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      idea_status: ideaStatus
    });
  }

  handlePublicationStatusOnChange = (publicationStatus: PublicationStatus) => {
    this.queryParameters$.next({
      ...this.state.queryParameters,
      publication_status: publicationStatus
    });
  }

  render() {
    const { children } = this.props;
    return (children as children)({
      ...this.state,
      onLoadMore: this.loadMore,
      onChangePage: this.handleChangePage,
      onChangeProject: this.handleProjectOnChange,
      onChangePhase: this.handlePhaseOnChange,
      onChangeSearchTerm: this.handleSearchOnChange,
      onChangeSorting: this.handleSortOnChange,
      onChangeTopics: this.handleTopicsOnChange,
      onChangeAreas: this.handleAreasOnchange,
      onChangeIdeaStatus: this.handleIdeaStatusOnChange,
      onChangePublicationStatus: this.handlePublicationStatusOnChange
    });
  }
}
