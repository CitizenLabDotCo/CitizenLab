/**
 * Direct selector to the search state domain
 */
import { createSelector } from 'reselect';
import { selectResourcesDomain } from 'utils/resources/selectors';

import IdeasSearchResultWrapper from './IdeasSearchResultWrapper';

const selectSearchDomain = () => (state) => state.get('searchWidget');
/**
 * Other specific selectors
 */

const makeSelectIsLoadingFilteredIdeas = () => createSelector(
  selectSearchDomain(),
  (searchWidgetState) => searchWidgetState.get('isLoadingFilteredIdeas')
);

const makeSelectSearchValue = () => createSelector(
  selectSearchDomain(),
  (searchWidgetState) => searchWidgetState.get('searchValue')
);

export const generateSearchResult = (resourceIdeas, index, id) => ({
  titleMultiloc: resourceIdeas.toJS()[id].attributes.title_multiloc,
  ideaId: id,
  key: index,
  // each result will be rendered by Search wrapped in IdeasSearchResultWrapper
  as: IdeasSearchResultWrapper,
});

const makeSelectSearchResults = () => createSelector(
  selectSearchDomain(),
  selectResourcesDomain(),
  (pageState, resources) => {
    const ids = pageState.get('searchResults');
    const resourceIdeas = resources.get('ideas');
    return (ids && resourceIdeas
      ? ids.map((id, index) => generateSearchResult(resourceIdeas, index, id))
      : []);
  }
);

export {
  selectSearchDomain,
  makeSelectIsLoadingFilteredIdeas,
  makeSelectSearchResults,
  makeSelectSearchValue,
};
