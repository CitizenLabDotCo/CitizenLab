import { defineMessages } from 'react-intl';

export default defineMessages({
  imageAltText: {
    id: 'app.components.PostComponents.imageAltText',
    defaultMessage: 'Main image for the {postContext} {title}',
  },
  createdTimeAgo: {
    id: 'app.components.PostComponents.createdTimeAgo',
    defaultMessage: 'Created {timeAgo}',
  },
  seeTranslation: {
    id: 'app.components.PostComponents.seeTranslation',
    defaultMessage: 'See translation',
  },
  seeOriginal: {
    id: 'app.components.PostComponents.seeOriginal',
    defaultMessage: 'See original',
  },
  linkToHomePage: {
    id: 'app.components.PostComponents.linkToHomePage',
    defaultMessage: 'Home page'
  },
  lastUpdated: {
    id: 'app.components.PostComponents.lastUpdated',
    defaultMessage: 'Last modified {modificationTime}',
  },
  lastChangesTitleIdea: {
    id: 'app.components.PostComponents.lastChangesTitleIdea',
    defaultMessage: 'Last changes to this idea',
  },
  lastChangesTitleInitiative: {
    id: 'app.components.PostComponents.lastChangesTitleInitiative',
    defaultMessage: 'Last changes to this initiative',
  },
  changeLogEntryIdea: {
    id: 'app.components.PostComponents.changeLogEntryIdea',
    defaultMessage: `{changeType, select,
      changed_status {{userName} has updated the status of this idea}
      published {{userName} created this idea}
      changed_title {{userName} updated the title of this idea}
      changed_body {{userName} updated the description of this idea}
    }`,
  },
  changeLogEntryInitiative: {
    id: 'app.components.PostComponents.changeLogEntryInitiative',
    defaultMessage: `{changeType, select,
      changed_status {{userName} has updated the status of this initiative}
      published {{userName} created this initiative}
      changed_title {{userName} updated the title of this initiative}
      changed_body {{userName} updated the description of this initiative}
    }`,
  }
});
