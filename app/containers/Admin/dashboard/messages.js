/*
 * AdminPage.DashboardPage Messages
 *
 * This contains all the text for the AdminPage.DashboardPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  loading: {
    id: 'app.containers.AdminPage.DashboardPage.loading',
    defaultMessage: 'Loading...',
  },
  loadError: {
    id: 'app.containers.AdminPage.DashboardPage.loadError',
    defaultMessage: 'Couldn\' load data',
  },
  usersOverTime: {
    id: 'app.containers.AdminPage.DashboardPage.usersOverTime',
    defaultMessage: 'Users over time',
  },
  ideasByTopic: {
    id: 'app.containers.AdminPage.DashboardPage.ideasByTopic',
    defaultMessage: 'Ideas by topic',
  },
  ideasByArea: {
    id: 'app.containers.AdminPage.DashboardPage.ideasByArea',
    defaultMessage: 'Ideas by area',
  },
  interval: {
    id: 'app.containers.AdminPage.DashboardPage.interval',
    defaultMessage: 'Interval',
  },
  day: {
    id: 'app.containers.AdminPage.DashboardPage.day',
    defaultMessage: 'Day',
  },
  week: {
    id: 'app.containers.AdminPage.DashboardPage.week',
    defaultMessage: 'Week',
  },
  month: {
    id: 'app.containers.AdminPage.DashboardPage.month',
    defaultMessage: 'Month',
  },
  year: {
    id: 'app.containers.AdminPage.DashboardPage.year',
    defaultMessage: 'Year',
  },
  helmetTitle: {
    id: 'app.containers.AdminPage.DashboardPage.helmetTitle',
    defaultMessage: 'Admin dashboard page',
  },
  helmetDescription: {
    id: 'app.containers.AdminPage.DashboardPage.helmetDescription',
    defaultMessage: 'Dashboard for activities on the platform',
  },
  previousInterval: {
    id: 'app.containers.AdminPage.DashboardPage.previousInterval',
    defaultMessage: `Previous {interval, select,
      day {day}
      month {month}
      week {week}
      year {year}
    }`,
  },
  nextInterval: {
    id: 'app.containers.AdminPage.DashboardPage.nextInterval',
    defaultMessage: `Next {interval, select,
      day {day}
      month {month}
      week {week}
      year {year}
    }`,
  },
});
