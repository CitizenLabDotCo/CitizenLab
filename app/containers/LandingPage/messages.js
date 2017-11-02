/*
 * IdeasIndexPage Messages
 *
 * This contains all the text for the IdeasIndexPage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  // header
  titleCity: {
    id: 'app.containers.landing.titleCity',
    defaultMessage: 'Change the future of {name}',
  },
  subtitleCity: {
    id: 'app.containers.landing.subtitleCity',
    defaultMessage: 'Start an idea!',
  },

  // ideas
  ideasFrom: {
    id: 'app.containers.landing.ideasFrom',
    defaultMessage: 'Ideas for {name}',
  },
  trendingIdeas: {
    id: 'app.containers.landing.trendingIdeas',
    defaultMessage: 'Trending ideas',
  },
  explore: {
    id: 'app.containers.landing.explore',
    defaultMessage: 'Explore',
  },
  exploreAllIdeas: {
    id: 'app.containers.landing.exploreAllIdeas',
    defaultMessage: 'Explore all ideas',
  },

  // projects
  projectsFrom: {
    id: 'app.containers.landing.projectsFrom',
    defaultMessage: 'Projects from {name}',
  },
  cityProjects: {
    id: 'app.containers.landing.cityProjects',
    defaultMessage: 'City projects',
  },
  exploreAllProjects: {
    id: 'app.containers.landing.exploreAllProjects',
    defaultMessage: 'Explore all projects',
  },
});
