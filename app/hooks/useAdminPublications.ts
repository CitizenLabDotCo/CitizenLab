import { useState, useEffect, useCallback } from 'react';
import { distinctUntilChanged } from 'rxjs/operators';
import { listAdminPublications } from 'services/adminPublications';
import { PublicationStatus } from 'services/projects';
import { isNilOrError } from 'utils/helperUtils';
import { unionBy, isString } from 'lodash-es';
import { Multiloc } from 'typings';

export interface InputProps {
  pageSize?: number;
  areaFilter?: string[];
  publicationStatusFilter: PublicationStatus[];
  noEmptyFolder?: boolean;
  folderId?: string | null;
}

export type IAdminPublicationContent = {
  id: string;
  publicationType: 'project' | 'projectFolder';
  publicationId: string;
  attributes: {
    parent_id?: string;
    ordering: number;
    publication_status: PublicationStatus;
    children_count: number;
    publication_title_multiloc: Multiloc;
    publication_description_multiloc: Multiloc;
    publication_description_preview_multiloc: Multiloc;
    publication_slug: string;
  };
};

export interface IOutput {
  list: IAdminPublicationContent[] | undefined | null;
  hasMore: boolean;
  loadingInitial: boolean;
  loadingMore: boolean;
  onLoadMore: () => void;
  onChangeAreas: (areas: string[] | null) => void;
  onChangePublicationStatus: (publicationStatuses: PublicationStatus[]) => void;
}

export default function useAdminPublications({ pageSize = 1000, areaFilter, publicationStatusFilter, noEmptyFolder, folderId }: InputProps) {
  const [list, setList] = useState<IAdminPublicationContent[] | undefined | null>(undefined);
  const [hasMore, setHasMore] = useState(false);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [areas, setAreas] = useState<string[] | undefined>(areaFilter);
  const [publicationStatuses, setPublicationStatuses] = useState<PublicationStatus[]>(publicationStatusFilter);

  const onLoadMore = useCallback(() => {
    if (hasMore) {
      setLoadingMore(true);
      setPageNumber(prevPageNumber => prevPageNumber + 1);
    }
  }, [hasMore]);

  const onChangeAreas = useCallback((areas) => {
    setAreas(areas);
    setPageNumber(1);
  }, []);

  const onChangePublicationStatus = useCallback((publicationStatuses) => {
    setPublicationStatuses(publicationStatuses);
    setPageNumber(1);
  }, []);

  // reset pageNumber on pageSize change
  useEffect(() => {
    setPageNumber(1);
  }, [pageSize]);

  useEffect(() => {
    const subscription = listAdminPublications({
      queryParameters: {
        areas,
        folder: folderId,
        publication_statuses: publicationStatuses,
        'page[number]': pageNumber,
        'page[size]': pageSize,
         filter_empty_folders: noEmptyFolder
      }
    }).observable.pipe(
      distinctUntilChanged(),
    ).subscribe((adminPublications) => {
      if (isNilOrError(adminPublications)) {
        setList(null);
        setHasMore(false);
      } else {
        const selfLink = adminPublications ?.links ?.self;
        const lastLink = adminPublications ?.links ?.last;

        const receivedItems = adminPublications.data.map(adminPublication => {
          const publicationType = adminPublication.relationships.publication.data.type;
          const publicationId = adminPublication.relationships.publication.data.id;

          return {
            publicationId,
            publicationType,
            id: adminPublication.id,
            attributes: {
              ...adminPublication.attributes
            },
          };
        }).filter(item => item) as IAdminPublicationContent[];

        const hasMore = !!(isString(selfLink) && isString(lastLink) && selfLink !== lastLink);
        setHasMore(hasMore);
        setList(prevList => !isNilOrError(prevList) && loadingMore ? unionBy(prevList, receivedItems, 'id') : receivedItems);
      }
      setLoadingInitial(false);
      setLoadingMore(false);
    });

    return () => subscription.unsubscribe();
  }, [pageNumber, pageSize, areas, publicationStatuses]);

  // TODO noEmptyFolder filter
  return {
    list,
    hasMore,
    loadingInitial,
    loadingMore,
    onLoadMore,
    onChangeAreas,
    onChangePublicationStatus
  };
}
