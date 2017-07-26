/*
 *
 * IdeasIndexPage actions
 *
 */

import {
  LOAD_IDEAS_REQUEST, LOAD_IDEAS_SUCCESS, IDEAS_LOADING_ERROR, SET_SHOW_IDEA_WITH_INDEX_PAGE, RESET_IDEAS, LOAD_TOPICS_REQUEST, LOAD_TOPICS_SUCCESS, LOAD_TOPICS_ERROR, LOAD_AREAS_REQUEST, LOAD_AREAS_SUCCESS, LOAD_AREAS_ERROR,
} from './constants';


export function ideasLoadingError(errorMessage) {
  return {
    type: IDEAS_LOADING_ERROR,
    payload: errorMessage,
  };
}

export function loadIdeasRequest(nextPageNumber = 1, nextPageItemCount = 9, filters) {
  return {
    type: LOAD_IDEAS_REQUEST,
    nextPageNumber,
    nextPageItemCount,
    filters,
  };
}

export function loadIdeasSuccess(ideas) {
  return {
    type: LOAD_IDEAS_SUCCESS,
    payload: ideas,
  };
}

export function filterIdeas(search, params) {
  return loadIdeasRequest(true, null, null, search, params);
}


export function resetIdeas() {
  return {
    type: RESET_IDEAS,
  };
}

export function setShowIdeaWithIndexPage(payload) {
  return {
    type: SET_SHOW_IDEA_WITH_INDEX_PAGE,
    payload,
  };
}

export function loadTopicsRequest(nextPageNumber, nextPageItemCount) {
  return {
    type: LOAD_TOPICS_REQUEST,
    nextPageNumber,
    nextPageItemCount,
  };
}

export function loadTopicsSuccess(topics) {
  return {
    type: LOAD_TOPICS_SUCCESS,
    payload: topics,
  };
}

export function loadTopicsError(errorMessage) {
  return {
    type: LOAD_TOPICS_ERROR,
    payload: errorMessage,
  };
}

export function loadAreasRequest(nextPageNumber, nextPageItemCount) {
  return {
    type: LOAD_AREAS_REQUEST,
    nextPageNumber,
    nextPageItemCount,
  };
}

export function loadAreasSuccess(areas) {
  return {
    type: LOAD_AREAS_SUCCESS,
    payload: areas,
  };
}

export function loadAreasError(errorMessage) {
  return {
    type: LOAD_AREAS_ERROR,
    payload: errorMessage,
  };
}
