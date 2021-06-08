import { useState, useEffect } from 'react';
import { getPageNumberFromUrl } from 'utils/paginationUtils';
import {
  insightsInputsStream,
  IInsightsInputData,
} from '../services/insightsInputs';

const defaultPageSize = 20;

interface Options {
  pageSize: number;
  pageNumber: number;
}

export interface IUseInpightsInputsOutput {
  list: IInsightsInputData[] | undefined | null;
  loading: boolean;
  onChangePage: (pageNumber: number) => void;
  currentPage: number;
}

const useInsightsInputs = (viewId: string, options?: Partial<Options>) => {
  const [insightsInputs, setInsightsInputs] = useState<
    IInsightsInputData[] | undefined | null | Error
  >(undefined);

  const [currentPage, setCurrentPage] = useState<number | null>(
    options?.pageNumber || null
  );
  const [lastPage, setLastPage] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    setLoading(true);
    const subscription = insightsInputsStream(viewId, {
      queryParameters: {
        'page[number]': options?.pageNumber || 1,
        'page[size]': options?.pageSize || defaultPageSize,
      },
    }).observable.subscribe((insightsInputs) => {
      setInsightsInputs(insightsInputs.data);
      setCurrentPage(getPageNumberFromUrl(insightsInputs.links?.self));
      setLastPage(getPageNumberFromUrl(insightsInputs.links?.last));
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, [options]);
  return {
    currentPage,
    lastPage,
    loading,
    list: insightsInputs,
  };
};

export default useInsightsInputs;
