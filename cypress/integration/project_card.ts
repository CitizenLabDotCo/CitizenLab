import { randomString } from '../support/commands';

describe('Project card component', () => {
  const projectTitle = randomString();
  const projectDescriptionPreview = randomString();
  const projectDescription = randomString();
  const phaseTitle = randomString();

  let projectId : string;

  before(() => {
    // create new project
    cy.apiCreateProject({
      type: 'timeline',
      title: projectTitle,
      descriptionPreview: projectDescriptionPreview,
      description: projectDescription,
      publicationStatus: 'published'
    }).then((project) => {
      // save projectId for removal
      projectId = project.body.data.id;

      // create new phase
      cy.apiCreatePhase(projectId, phaseTitle, '2018-03-01', '2025-01-01', 'ideation', true, true, true);

      // navigate to the landing page
      cy.goToLandingPage();
    });
  });

  it('shows the title, description, progress bar and cta', () => {
    cy.get('.e2e-project-card').contains(projectTitle).closest('.e2e-project-card').as('projectCard');
    cy.get('@projectCard').get('.e2e-project-card-project-title').contains(projectTitle);
    cy.get('@projectCard').get('.e2e-project-card-project-description-preview').contains(projectDescriptionPreview);
    cy.get('@projectCard').get('.e2e-project-card-time-remaining');
    cy.get('@projectCard').get('.e2e-project-card-cta').contains('Post your idea');
  });

  after(() => {
    cy.apiRemoveProject(projectId);
  });
});
