import { defineMessages } from 'react-intl';

export default defineMessages({
  openProjectButton: {
    id: 'app.components.ProjectCard.openProjectButton',
    defaultMessage: 'Discover this project',
  },
  idea: {
    id: 'app.components.ProjectCard.idea',
    defaultMessage: 'idea',
  },
  ideas: {
    id: 'app.components.ProjectCard.ideas',
    defaultMessage: 'ideas',
  },
  xIdeas: {
    id: 'app.components.ProjectCard.xIdeas',
    defaultMessage: '{ideasCount, plural, no {# ideas} one {# idea} other {# ideas}}',
  },
  imageAltText: {
    id: 'app.components.ProjectCard.imageAltText',
    defaultMessage: '{orgName} - main image for the project {projectTitle}',
  },
  archived: {
    id: 'app.components.ProjectCard.archived',
    defaultMessage: 'Archived',
  },
});
