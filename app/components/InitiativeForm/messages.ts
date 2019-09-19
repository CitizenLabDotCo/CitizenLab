import { defineMessages } from 'react-intl';

export default defineMessages({
  // Header Messages
  header: {
    id: 'app.containers.InitiativesNewPage.header',
    defaultMessage: 'Start your own initiative and make your voice heard by {styledOrgName}'
  },
  orgName: {
    id: 'app.containers.InitiativesNewPage.orgName',
    defaultMessage: '{orgName}'
  },
  // Tips Box Messages
  tipsTitle: {
    id: 'app.containers.InitiativesNewPage.tipsTitle',
    defaultMessage: 'Tips and tricks for a successful initiative'
  },
  tipsExplanation: {
    id: 'app.containers.InitiativesNewPage.tipsExplanation',
    defaultMessage: 'An initiative is a project that you, as a citizen, can start anytime. Posting it on the platform enables you to gather support from others and, at the end, being heard by {orgName}.'
  },
  requirmentsListTitle: {
    id: 'app.containers.InitiativesNewPage.requirmentsListTitle',
    defaultMessage: 'To get there, you need to:'
  },
  requirmentVoteTreshold: {
    id: 'app.containers.InitiativesNewPage.requirmentVoteTreshold',
    defaultMessage: 'Gather {voteThreshold} votes'
  },
  requirmentDaysLimit: {
    id: 'app.containers.InitiativesNewPage.requirmentDaysLimit',
    defaultMessage: 'Within {daysLimit} days'
  },
  eligibility: {
    id: 'app.containers.InitiativesNewPage.eligibility',
    defaultMessage: 'To be eligible, {orgName} requires your initiative to respect the following:'
  },
  // Form Messages
  formGeneralSectionTitle: {
    id: 'app.components.InitiativeForm.formGeneralSectionTitle',
    defaultMessage: 'What is your initiative?',
  },
  titleEmptyError: {
    id: 'app.components.InitiativeForm.titleEmptyError',
    defaultMessage: 'Please provide a title',
  },
  titleLengthError: {
    id: 'app.components.InitiativeForm.titleLengthError',
    defaultMessage: 'The initiative title must be at least 10 characters long',
  },
  titleLabel: {
    id: 'app.components.InitiativeForm.titleLabel',
    defaultMessage: 'Title',
  },
  titleLabelSubtext: {
    id: 'app.components.InitiativeForm.titleLabelSubtext',
    defaultMessage: 'Choose a descriptive, yet concise title (min. 10 characters)',
  },
  descriptionLabel: {
    id: 'app.components.InitiativeForm.descriptionLabel',
    defaultMessage: 'What is your initiative about?',
  },
  descriptionLabelSubtext: {
    id: 'app.components.InitiativeForm.descriptionLabelSubtext',
    defaultMessage: 'Describe your initiative clearly (min. 500 characters)',
  },
  descriptionEmptyError: {
    id: 'app.components.InitiativeForm.descriptionEmptyError',
    defaultMessage: 'Please provide a description',
  },
  descriptionLengthError: {
    id: 'app.components.InitiativeForm.descriptionLengthError',
    defaultMessage: 'The initiative description must be at least 500 characters long',
  },
  formDetailsSectionTitle: {
    id: 'app.components.InitiativeForm.formDetailsSectionTitle',
    defaultMessage: 'Details',
  },
  topicEmptyError: {
    id: 'app.components.InitiativeForm.topicEmptyError',
    defaultMessage: 'Please provide a topic',
  },
  topicsLabel: {
    id: 'app.components.InitiativeForm.topicsLabel',
    defaultMessage: 'Select the topic of your initiative',
  },
  topicsLabelSubtext: {
    id: 'app.components.InitiativeForm.topicsLabelSubtext',
    defaultMessage: 'You can select up to two topics',
  },
  locationLabel: {
    id: 'app.components.InitiativeForm.locationLabel',
    defaultMessage: 'Select a Location',
  },
  locationLabelSubtext: {
    id: 'app.components.InitiativeForm.locationLabelSubtext',
    defaultMessage: 'Where is your initiative located?',
  },
  locationPlaceholder: {
    id: 'app.components.InitiativeForm.locationPlaceholder',
    defaultMessage: 'Type an address',
  },
  formAttachmentsSectionTitle: {
    id: 'app.components.InitiativeForm.formAttachmentsSectionTitle',
    defaultMessage: 'Images and attachments',
  },
  bannerUploadLabel: {
    id: 'app.components.InitiativeForm.bannerUploadLabel',
    defaultMessage: 'Add a banner',
  },
  bannerUploadLabelSubtext: {
    id: 'app.components.InitiativeForm.bannerUploadLabelSubtext',
    defaultMessage: 'This cover will be used at the top of your initiative page',
  },
  imageDropzonePlaceholder: {
    id: 'app.container.InitiativeForm.imageDropzonePlaceholder',
    defaultMessage: 'Drop your image here',
  },
  imageUploadLabel: {
    id: 'app.components.InitiativeForm.imageUploadLabel',
    defaultMessage: 'Add a main picture',
  },
  imageUploadLabelSubtext: {
    id: 'app.components.InitiativeForm.imageUploadLabelSubtext',
    defaultMessage: 'This image is shown on top of your initiative’s page',
  },
  imageEmptyError: {
    id: 'app.components.InitiativeForm.imageEmptyError',
    defaultMessage: 'Please provide an image',
  },
  fileUploadLabel: {
    id: 'app.container.InitiativeForm.fileUploadLabel',
    defaultMessage: 'Add files to your initiative',
  },
  fileUploadLabelSubtext: {
    id: 'app.container.InitiativeForm.fileUploadLabelSubtext',
    defaultMessage: 'Upload files to give others more information and context',
  },
  publishButton: {
    id: 'app.components.InitiativeForm.publishButton',
    defaultMessage: 'Publish your initiative',
  },
  publishUnknownError: {
    id: 'app.components.InitiativeForm.publishUnknownError',
    defaultMessage: 'There was an issue publishing your initiative, please try again later.',
  },
});
