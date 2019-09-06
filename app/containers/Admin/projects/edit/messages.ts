import {
  defineMessages
} from 'react-intl';

export default defineMessages({
  // edit - index
  generalTab: {
    id: 'app.containers.AdminPage.ProjectEdit.generalTab',
    defaultMessage: 'General',
  },
  descriptionTab: {
    id: 'app.containers.AdminPage.ProjectEdit.descriptionTab',
    defaultMessage: 'Description',
  },
  ideasTab: {
    id: 'app.containers.AdminPage.ProjectEdit.ideasTab',
    defaultMessage: 'Ideas',
  },
  pollTab: {
    id: 'app.containers.AdminPage.ProjectEdit.pollTab',
    defaultMessage: 'Poll',
  },
  phasesTab: {
    id: 'app.containers.AdminPage.ProjectEdit.phasesTab',
    defaultMessage: 'Timeline',
  },
  eventsTab: {
    id: 'app.containers.AdminPage.ProjectEdit.eventsTab',
    defaultMessage: 'Events',
  },
  permissionsTab: {
    id: 'app.containers.AdminPage.ProjectEdit.permissionsTab',
    defaultMessage: 'Permissions',
  },
  newProject: {
    id: 'app.containers.AdminPage.ProjectEdit.newProject',
    defaultMessage: 'New Project',
  },
  addNewIdea: {
    id: 'app.containers.AdminPage.ProjectEdit.addNewIdea',
    defaultMessage: 'Add an idea',
  },
  viewPublicProject: {
    id: 'app.containers.AdminPage.ProjectEdit.viewPublicProject',
    defaultMessage: 'View project',
  },
  // edit - participationContext -----------------------------------------------
  noVotingLimitErrorMessage: {
    id: 'app.containers.AdminPage.ProjectEdit.noVotingLimitErrorMessage',
    defaultMessage: 'Not a valid number',
  },
  noBudgetingAmountErrorMessage: {
    id: 'app.containers.AdminPage.ProjectEdit.noBudgetingAmountErrorMessage',
    defaultMessage: 'Not a valid amount',
  },
  participationMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.participationMethod',
    defaultMessage: 'Participation method',
  },
  participationMethodTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.participationMethodTooltip',
    defaultMessage: 'Choose how users can participate.',
  },
  participationMethodPlaceholder: {
    id: 'app.containers.AdminPage.ProjectEdit.participationMethodPlaceholder',
    defaultMessage: 'Select a participation method',
  },
  information: {
    id: 'app.containers.AdminPage.ProjectEdit.information',
    defaultMessage: 'Information',
  },
  informationDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.informationDescription',
    defaultMessage: 'Users can only read the information you provide, they cannot participate actively.',
  },
  ideation: {
    id: 'app.containers.AdminPage.ProjectEdit.ideation',
    defaultMessage: 'Ideation',
  },
  ideationDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.ideationDescription',
    defaultMessage: 'Users can post ideas, comment on other ideas and/or vote.',
  },
  survey: {
    id: 'app.containers.AdminPage.ProjectEdit.survey',
    defaultMessage: 'Survey',
  },
  surveyDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyDescription',
    defaultMessage: 'You integrate a survey in which the users can participate.',
  },
  participatoryBudgeting: {
    id: 'app.containers.AdminPage.ProjectEdit.participatoryBudgeting',
    defaultMessage: 'Participatory Budgeting',
  },
  participatoryBudgetingDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.participatoryBudgetingDescription',
    defaultMessage: 'Users can select ideas until their selection reaches a predefined budget threshold.',
  },
  poll: {
    id: 'app.containers.AdminPage.ProjectEdit.poll',
    defaultMessage: 'Poll',
  },
  pollDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.pollDescription',
    defaultMessage: 'Users can answer a short multiple-choice questionnaire.',
  },
  amountPerCitizen: {
    id: 'app.containers.AdminPage.ProjectEdit.amountPerCitizen',
    defaultMessage: 'Amount per citizen, in {currency}',
  },
  postingEnabled: {
    id: 'app.containers.AdminPage.ProjectEdit.postingEnabled',
    defaultMessage: 'Posting ideas',
  },
  commentingEnabled: {
    id: 'app.containers.AdminPage.ProjectEdit.commentingEnabled',
    defaultMessage: 'Commenting',
  },
  votingEnabled: {
    id: 'app.containers.AdminPage.ProjectEdit.votingEnabled',
    defaultMessage: 'Voting',
  },
  votingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.votingMethod',
    defaultMessage: 'Voting method',
  },
  votingMethodTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.votingMethodTooltip',
    defaultMessage: 'The option ‘Limited’ lets you define what maximum number of votes one user can cast. ‘Unlimited’ allows to vote on as many ideas as wanted.',
  },
  votingMethodPlaceholder: {
    id: 'app.containers.AdminPage.ProjectEdit.votingMethodPlaceholder',
    defaultMessage: 'Select the voting method',
  },
  votingLimit: {
    id: 'app.containers.AdminPage.ProjectEdit.votingLimit',
    defaultMessage: 'Voting limit',
  },
  phasePermissions: {
    id: 'app.containers.AdminPage.ProjectEdit.phasePermissions',
    defaultMessage: 'Enabled actions',
  },
  phasePermissionsTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.phasePermissionsTooltip',
    defaultMessage: 'Select what participative action users can take during this ideation phase.',
  },
  unlimited: {
    id: 'app.containers.AdminPage.ProjectEdit.unlimited',
    defaultMessage: 'Unlimited',
  },
  limited: {
    id: 'app.containers.AdminPage.ProjectEdit.limited',
    defaultMessage: 'Limited',
  },
  defaultDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.defaultDisplay',
    defaultMessage: 'Ideas displayed by default as:',
  },
  defaultDisplayTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.defaultDisplayTooltip',
    defaultMessage: 'Choose whether ideas on the project page are shown as idea cards or as pins on a map. Either way, users can switch to the other view themselves.',
  },
  cardDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.cardDisplay',
    defaultMessage: 'Cards',
  },
  mapDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.mapDisplay',
    defaultMessage: 'Map',
  },
  surveyService: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyService',
    defaultMessage: 'Survey Service',
  },
  surveyServiceTooltipLink: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltipLink',
    defaultMessage: 'http://support.citizenlab.co/en-your-citizenlab-platform-step-by-step/faq-s/how-do-i-add-a-survey-to-my-platform',
  },
  surveyServiceTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltip',
    defaultMessage: 'Choose what survey tool you want to embed. All information can be found {surveyServiceTooltipLink}.',
  },
  surveyServiceTooltipLinkText: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltipLinkText',
    defaultMessage: 'here',
  },
  typeform: {
    id: 'app.containers.AdminPage.ProjectEdit.typeform',
    defaultMessage: 'Typeform',
  },
  survey_monkey: {
    id: 'app.containers.AdminPage.ProjectEdit.survey_monkey',
    defaultMessage: 'Survey Monkey',
  },
  google_forms: {
    id: 'app.containers.AdminPage.ProjectEdit.google_forms',
    defaultMessage: 'Google Forms',
  },
  surveyEmbedUrl: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyEmbedUrl',
    defaultMessage: 'Survey Embed URL',
  },
  titleSurveyResults: {
    id: 'app.containers.AdminPage.ProjectEdit.SurveyResults.titleSurveyResults',
    defaultMessage: 'Consult the survey answers',
  },
  subtitleSurveyResults: {
    id: 'app.containers.AdminPage.ProjectEdit.SurveyResults.subtitleSurveyResults',
    defaultMessage: 'Here, you can download the results of the surveys within this project as an exel file. For now, you can only see here the typeform surveys.',
  },
  surveyResultsTab: {
    id: 'app.containers.AdminPage.ProjectEdit.SurveyResults.surveyResultsTab',
    defaultMessage: 'Survey Results',
  },
  exportSurveyResults: {
    id: 'app.containers.AdminPage.ProjectEdit.SurveyResults.exportSurveyResults',
    defaultMessage: 'Export survey results',
  },
  titleIdeas: {
    id: 'app.components.admin.PostManager.titleIdeas',
    defaultMessage: 'Manage idea',
  },
  subtitleIdeas: {
    id: 'app.components.admin.PostManager.subtitleIdeas',
    defaultMessage: 'Get an overview of all the ideas inside your project. Add themes and change the status by dragging and dropping ideas to one of the left columns, or edit the ideas.',
  },
});
