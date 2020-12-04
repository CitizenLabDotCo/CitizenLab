import { defineMessages } from 'react-intl';

export default defineMessages({
  titleDescription: {
    id: 'app.containers.AdminPage.Topics.titleDescription',
    defaultMessage: 'Topics',
  },
  browseTopics: {
    id: 'app.containers.AdminPage.Topics.browseTopics',
    defaultMessage: 'Browse topics',
  },
  addTopics: {
    id: 'app.containers.AdminPage.Topics.addTopics',
    defaultMessage: 'Add',
  },
  deleteTopicLabel: {
    id: 'app.containers.AdminPage.Topics.deleteTopicLabel',
    defaultMessage: 'Delete',
  },
  remove: {
    id: 'app.containers.AdminPage.Topics.remove',
    defaultMessage: 'Remove',
  },
  confirmHeader: {
    id: 'app.containers.AdminPage.Topics.confirmHeader',
    defaultMessage: 'Are you sure you want to delete this project topic?',
  },
  topicDeletionWarning: {
    id: 'app.containers.AdminPage.Topics.topicDeletionWarning',
    defaultMessage:
      'This topic will no longer be able to be selected for new ideas.',
  },
  cancel: {
    id: 'app.containers.AdminPage.Topics.cancel',
    defaultMessage: 'Cancel',
  },
  delete: {
    id: 'app.containers.AdminPage.Topics.delete',
    defaultMessage: 'Delete',
  },
  topicManagerInfo: {
    id: 'app.containers.AdminPage.Topics.topicManagerInfo',
    defaultMessage:
      'If you would like to add additional project topics, you can do so in the {topicManagerLink}.',
  },
  pageDescription: {
    id: 'app.containers.AdminPage.Topics.pageDescription',
    defaultMessage:
      'You can add and delete the topics that are available for Idea Collection projects here. Topics are selected by users to categorize their ideas.',
  },
  topicManager: {
    id: 'app.containers.AdminPage.Topics.topicManager',
    defaultMessage: 'Topic Manager',
  },
  fewerThanOneTopicWarning: {
    id: 'app.containers.AdminPage.Topics.fewerThanOneTopicWarning',
    defaultMessage:
      'At least one project topic is required. If you do not want to allow users to add topics to their ideas, you can disable Topics in the {ideaFormLink} tab.',
  },
  ideaForm: {
    id: 'app.containers.AdminPage.Topics.ideaForm',
    defaultMessage: 'Idea form',
  },
});
