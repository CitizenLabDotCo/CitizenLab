import { defineMessages } from 'react-intl';

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
  ideaFormTab: {
    id: 'app.containers.AdminPage.ProjectEdit.ideaFormTab',
    defaultMessage: 'Idea form',
  },
  volunteeringTab: {
    id: 'app.containers.AdminPage.ProjectEdit.volunteeringTab',
    defaultMessage: 'Volunteering',
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
  topicsTab: {
    id: 'app.containers.AdminPage.ProjectEdit.topicsTab',
    defaultMessage: 'Topics',
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
  information: {
    id: 'app.containers.AdminPage.ProjectEdit.information',
    defaultMessage: 'Information',
  },
  informationDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.informationDescription',
    defaultMessage:
      'Users can only read the information you provide, they cannot participate actively.',
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
    defaultMessage:
      'You integrate a survey in which the users can participate.',
  },
  participatoryBudgeting: {
    id: 'app.containers.AdminPage.ProjectEdit.participatoryBudgeting',
    defaultMessage: 'Participatory Budgeting',
  },
  participatoryBudgetingDescription: {
    id:
      'app.containers.AdminPage.ProjectEdit.participatoryBudgetingDescription',
    defaultMessage:
      'Users can select ideas until their selection reaches a predefined budget threshold.',
  },
  poll: {
    id: 'app.containers.AdminPage.ProjectEdit.poll',
    defaultMessage: 'Poll',
  },
  pollDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.pollDescription',
    defaultMessage: 'Users can answer a short multiple-choice questionnaire.',
  },
  volunteering: {
    id: 'app.containers.AdminPage.ProjectEdit.volunteering',
    defaultMessage: 'Volunteering',
  },
  volunteeringDescription: {
    id: 'app.containers.AdminPage.ProjectEdit.volunteeringDescription',
    defaultMessage: 'Users can volunteer for the causes you define.',
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
    defaultMessage:
      'The option ‘Limited’ lets you define what maximum number of votes one user can cast. ‘Unlimited’ allows to vote on as many ideas as wanted.',
  },
  votingLimit: {
    id: 'app.containers.AdminPage.ProjectEdit.votingLimit',
    defaultMessage: 'Voting limit',
  },
  downvoting: {
    id: 'app.containers.AdminPage.ProjectEdit.downvoting',
    defaultMessage: 'Downvoting',
  },
  downvotingTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.downvotingTooltip',
    defaultMessage:
      "By disabling, people can only upvote an idea. As a consequence, you'll have less information on what people think about that idea.",
  },
  downvotingDisabled: {
    id: 'app.containers.AdminPage.ProjectEdit.downvotingDisabled',
    defaultMessage: 'Disabled',
  },
  downvotingEnabled: {
    id: 'app.containers.AdminPage.ProjectEdit.downvotingEnabled',
    defaultMessage: 'Enabled',
  },
  phasePermissions: {
    id: 'app.containers.AdminPage.ProjectEdit.phasePermissions',
    defaultMessage: 'Enabled actions',
  },
  phasePermissionsTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.phasePermissionsTooltip',
    defaultMessage:
      'Select what participative action users can take during this ideation phase.',
  },
  unlimited: {
    id: 'app.containers.AdminPage.ProjectEdit.unlimited',
    defaultMessage: 'Unlimited',
  },
  limited: {
    id: 'app.containers.AdminPage.ProjectEdit.limited',
    defaultMessage: 'Limited',
  },
  anonymousPolling: {
    id: 'app.containers.AdminPage.ProjectEdit.anonymousPolling',
    defaultMessage: 'Anonymous polling',
  },
  anonymousPollingTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.anonymousPollingTooltip',
    defaultMessage:
      "When enabled it's impossible to see who voted on what. Users still need an account and can only vote once.",
  },
  enabled: {
    id: 'app.containers.AdminPage.ProjectEdit.enabled',
    defaultMessage: 'Enabled',
  },
  disabled: {
    id: 'app.containers.AdminPage.ProjectEdit.disabled',
    defaultMessage: 'Disabled',
  },
  defaultDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.defaultDisplay',
    defaultMessage: 'Ideas displayed by default as:',
  },
  defaultIdeaSorting: {
    id: 'app.containers.AdminPage.ProjectEdit.defaultIdeaSorting',
    defaultMessage: 'Default sorting method for ideas',
  },
  presentationModeTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.presentationModeTooltip',
    defaultMessage:
      'You can choose how the ideas are presented by default: as cards in a list or as pins on a map.',
  },
  defaultIdeaSortingTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.defaultIdeaSortingTooltip',
    defaultMessage:
      'You can choose the default method the ideas for this project are sorted by. Users can still sort by the other available methods.',
  },
  cardDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.cardDisplay',
    defaultMessage: 'Cards',
  },
  mapDisplay: {
    id: 'app.containers.AdminPage.ProjectEdit.mapDisplay',
    defaultMessage: 'Map',
  },
  randomSortingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.randomSortingMethod',
    defaultMessage: 'Random',
  },
  trendingSortingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.trendingSortingMethod',
    defaultMessage: 'Trending',
  },
  mostVotedSortingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.mostVotesSortingMethod',
    defaultMessage: 'Most voted',
  },
  mostRecentSortingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.newestFirstSortingMethod',
    defaultMessage: 'Most recent',
  },
  oldestSortingMethod: {
    id: 'app.containers.AdminPage.ProjectEdit.oldestFirstSortingMethod',
    defaultMessage: 'Oldest',
  },
  surveyService: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyService',
    defaultMessage: 'Survey Service',
  },
  surveyServiceTooltipLink: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltipLink',
    defaultMessage:
      'http://support.citizenlab.co/en-your-citizenlab-platform-step-by-step/faq-s/how-do-i-add-a-survey-to-my-platform',
  },
  surveyServiceTooltip: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltip',
    defaultMessage:
      'Choose what survey tool you want to embed. All information can be found {surveyServiceTooltipLink}.',
  },
  surveyServiceTooltipLinkText: {
    id: 'app.containers.AdminPage.ProjectEdit.surveyServiceTooltipLinkText',
    defaultMessage: 'here',
  },
  typeform: {
    id: 'app.containers.AdminPage.ProjectEdit.typeform',
    defaultMessage: 'Typeform',
  },
  enalyzer: {
    id: 'app.containers.AdminPage.ProjectEdit.enalyzer',
    defaultMessage: 'Enalyzer',
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
    id:
      'app.containers.AdminPage.ProjectEdit.SurveyResults.subtitleSurveyResults',
    defaultMessage:
      'Here, you can download the results of the surveys within this project as an exel file. For now, you can only see here the typeform surveys.',
  },
  surveyResultsTab: {
    id: 'app.containers.AdminPage.ProjectEdit.SurveyResults.surveyResultsTab',
    defaultMessage: 'Survey Results',
  },
  exportSurveyResults: {
    id:
      'app.containers.AdminPage.ProjectEdit.SurveyResults.exportSurveyResults',
    defaultMessage: 'Export survey results',
  },
  titleIdeas: {
    id: 'app.components.admin.PostManager.titleIdeas',
    defaultMessage: 'Manage idea',
  },
  subtitleIdeas: {
    id: 'app.components.admin.PostManager.subtitleIdeas',
    defaultMessage:
      'Get an overview of all the ideas inside your project. Add themes and change the status by dragging and dropping ideas to one of the left columns, or edit the ideas.',
  },
  hiddenFieldsTip: {
    id: 'app.components.admin.PostManager.hiddenFieldsTip',
    defaultMessage:
      'Tip: add {hiddenFieldsLink} when setting up your Typeform survey to keep track of who has responded to your survey.',
  },
  hiddenFieldsLinkText: {
    id: 'app.components.admin.PostManager.hiddenFieldsLink',
    defaultMessage: 'hidden fields',
  },
  hiddenFieldsSupportArticleUrl: {
    id: 'app.components.admin.PostManager.hiddenFieldsSupportArticleUrl',
    defaultMessage: 'https://support.citizenlab.co/en/articles/1641202',
  },
});
