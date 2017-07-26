/*
 *
 * IdeasIndexPage reducer
 *
 */

import { fromJS } from 'immutable';

import { LOAD_IDEAS_REQUEST, LOAD_IDEAS_SUCCESS, RESET_IDEAS, LOAD_TOPICS_SUCCESS, LOAD_AREAS_SUCCESS } from './constants';
import { getPageItemCountFromUrl, getPageNumberFromUrl } from '../../utils/paginationUtils';

const initialState = fromJS({
  nextPageNumber: 1,
  nextPageItemCount: 12,
  search: '',
  hasMore: false,
  ideas: [],
  topics: {
    nextPageNumber: 1,
    nextPageItemCount: 1000,
  },
  areas: {
    nextPageNumber: 1,
    nextPageItemCount: 1000,
  },
});

function ideasIndexPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_IDEAS_REQUEST: {
      return state.set('search', action.search);
    }
    case LOAD_IDEAS_SUCCESS: {
      const ids = action.payload.data.map((idea) => idea.id);
      const nextPageNumber = getPageNumberFromUrl(action.payload.links.next);
      const nextPageItemCount = getPageItemCountFromUrl(action.payload.links.next);

      return state
        .update('ideas', (ideas) => (action.nextPageNumber === 1 ? fromJS(ids) : ideas.concat(ids)))
        .set('nextPageNumber', nextPageNumber)
        .set('nextPageItemCount', nextPageItemCount)
        .set('hasMore', !!nextPageNumber);
    }
    case RESET_IDEAS: {
      return initialState;
    }
    case LOAD_TOPICS_SUCCESS: {
      const ids = action.payload.data.map((topic) => topic.id);
      const nextPageNumber = getPageItemCountFromUrl(action.payload.links.next);
      const nextPageItemCount = getPageItemCountFromUrl(action.payload.links.next);
      return state
        .setIn(['topics', 'ids'], fromJS(ids))
        .setIn(['topics', 'nextPageNumber'], nextPageNumber)
        .setIn(['topics', 'nextPageItemCount'], nextPageItemCount);
    }
    case LOAD_AREAS_SUCCESS: {
      const ids = action.payload.data.map((area) => area.id);
      const nextPageNumber = getPageItemCountFromUrl(action.payload.links.next);
      const nextPageItemCount = getPageItemCountFromUrl(action.payload.links.next);
      return state
        .setIn(['areas', 'ids'], fromJS(ids))
        .setIn(['areas', 'nextPageNumber'], nextPageNumber)
        .setIn(['areas', 'nextPageItemCount'], nextPageItemCount);
    }
    default:
      return state;
  }
}

export default ideasIndexPageReducer;
