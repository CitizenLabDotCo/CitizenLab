/*
 *
 * IdeasIndexPage reducer
 *
 */

import { fromJS } from 'immutable';
import {
  IDEAS_LOADED, LOAD_IDEAS_REQUEST,
} from './constants';

const initialState = fromJS({
  nextPageNumber: null,
  ideas: [],
  loading: false,
});

function ideasIndexPageReducer(state = initialState, action) {
  switch (action.type) {
    case LOAD_IDEAS_REQUEST:
      return state
        .set('loading', true);
    case IDEAS_LOADED: {
      const ids = action.payload.data.map((idea) => idea.id);
      const nextPageLink = decodeURI(action.payload.links.next);
      console.log(nextPageLink.substr(nextPageLink.indexOf('page[number]=') + 13, 1));

      return state
        .set('ideas', fromJS(state.get('ideas')).concat(ids))
        .set('nextPageNumber', nextPageLink
          ? parseInt(nextPageLink.substr(nextPageLink.indexOf('page[number]=') + 13, 1))
          : null
        )
        .set('loading', false);
    }
    default:
      return state;
  }
}

export default ideasIndexPageReducer;
