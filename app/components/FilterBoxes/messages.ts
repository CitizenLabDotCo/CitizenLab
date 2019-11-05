import { defineMessages } from 'react-intl';

export default defineMessages({
  statusTitle: {
    id: 'app.components.FilterBoxes.statusTitle',
    defaultMessage: 'Status',
  },
  all: {
    id: 'app.components.FilterBoxes.all',
    defaultMessage: 'All',
  },
  areas: {
    id: 'app.components.FilterBoxes.areas',
    defaultMessage: 'Areas',
  },
  topicsTitle: {
    id: 'app.components.FilterBoxes.topicsTitle',
    defaultMessage: 'Topics',
  },
  a11y_numberOfIdeas: {
    id: 'app.components.FilterBoxes.a11y_numberOfIdeas',
    defaultMessage: '{ideasCount, plural, no {# ideas} one {# idea} other {# ideas}}',
  },
  a11y_selectedStatus: {
    id: 'app.components.FilterBoxes.a11y_selectedStatus',
    defaultMessage: 'Selected status filter: {selectedStatus}',
  },
  a11y_selectedAllStatus: {
    id: 'app.components.FilterBoxes.a11y_selectedAllStatus',
    defaultMessage: 'Selected status filter: all ideas',
  },
  a11y_allIdeas: {
    id: 'app.components.FilterBoxes.a11y_allIdeas',
    defaultMessage: 'All ideas: {allIdeasCount}',
  },
});
