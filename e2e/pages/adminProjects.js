const commands = {
};

module.exports = {
  url: 'localhost:3000/admin/projects',
  elements: {
    projectsList: { selector: '.e2e-projects-list' },
    newProject: { selector: '.e2e-new-project' },
    projectCard: { selector: '.e2e-project-card' },
    generalForm: { selector: '.e2e-project-general-form' },
    descriptionForm: { selector: '.e2e-project-description-form' },
    submitButton: { selector: '.e2e-submit-wrapper-button' },
    submitSuccess: { selector: '.e2e-submit-wrapper-button + .success' },
    descriptionTab: { selector: '.e2e-resource-tabs li:nth-child(2)' },
    phasesTab: { selector: '.e2e-resource-tabs li:nth-child(3)' },
    eventsTab: { selector: '.e2e-resource-tabs li:nth-child(4)' },
    permissionsTab: { selector: '.e2e-resource-tabs li:nth-child(5)' },
  },
  commands: [commands],
};
