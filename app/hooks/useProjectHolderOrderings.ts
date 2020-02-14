import { useState, useEffect, useCallback } from 'react';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { distinctUntilChanged, switchMap, filter } from 'rxjs/operators';
import shallowCompare from 'utils/shallowCompare';
import { listProjectHolderOrderings, IProjectHolderOrderingData } from 'services/projectHolderOrderings';
import { isNilOrError } from 'utils/helperUtils';
import { unionBy, isString, isNumber } from 'lodash-es';

export interface InputProps {
  pageSize?: number;
}

export interface IOutput {
  list: IProjectHolderOrderingData[] | undefined | null;
  hasMore: boolean;
  loadingInitial: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
}

export default function useProjectHolderOrderings({ pageSize = 1000 }: InputProps) {
  const [list, setList] = useState<IProjectHolderOrderingData[] | undefined | null>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageNumber$] = useState(new BehaviorSubject<number>(null as any));
  const [pageSize$] = useState(new BehaviorSubject<number>(pageSize));

  const onLoadMore = useCallback(() => {
    if (hasMore) {
      setLoadingMore(true);
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [hasMore]);

  useEffect(() => {
    setPageNumber(1); // reset pageNumber when pageSize changes
    pageSize$.next(pageSize);
  }, [pageSize]);

  useEffect(() => {
    pageNumber$.next(pageNumber);
  }, [pageNumber]);

  useEffect(() => {
    const subscription = combineLatest(
      pageNumber$,
      pageSize$
    ).pipe(
      filter(([pageNumber, pageSize]) => !!(isNumber(pageNumber) && isNumber(pageSize))),
      distinctUntilChanged((prev, next) => shallowCompare(prev, next)),
      switchMap(([pageNumber, pageSize]) => {
        return listProjectHolderOrderings({
          queryParameters: {
            'page[number]': pageNumber,
            'page[size]': pageSize
          }
        }).observable;
      })
    ).subscribe((newList) => {
      setLoadingInitial(false);
      setLoadingMore(false);

      if (isNilOrError(newList)) {
        setList(null);
        setHasMore(false);
      } else {
        const selfLink = newList?.links?.self;
        const lastLink = newList?.links?.last;
        const hasMore = !!(isString(selfLink) && isString(lastLink) && selfLink !== lastLink);
        setList(prevList => !isNilOrError(prevList) ? unionBy(prevList, newList.data, 'id') : newList.data);
        setHasMore(hasMore);
      }
    });

    return () => subscription.unsubscribe();
  }, [pageNumber$, pageSize$]);

  return {
    list,
    hasMore,
    loadingInitial,
    loadingMore,
    onLoadMore
  };
}
