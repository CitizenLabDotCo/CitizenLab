import { randomString } from '../support/commands';

describe('Idea Content', () => {

  beforeEach(() => {
    cy.visit('/ideas/controversial-idea');
    cy.acceptCookies();
  });

  it('shows the page', () => {
    cy.get('#e2e-idea-show');
  });

  it('shows the home page link with correct href', () => {
    cy.get('#e2e-home-page-link')
          .should('have.attr', 'href').and('include', '/en-GB/');
  });

  it('shows the link to the project page with correct href', () => {
    cy.get('#e2e-project-link')
          .should('have.attr', 'href').and('include', '/en-GB/projects/an-idea-bring-it-to-your-council');
  });

  it('shows the idea Title', () => {
    cy.get('.e2e-ideatitle');
  });

  it('shows the idea Image', () => {
    cy.get('.e2e-ideaImage');
  });

  it('shows idea body', () => {
    cy.get('#e2e-idea-show').contains('With a lot of comments');
  });

  it('shows a link to author profile', () => {
    cy.get('.e2e-author-link').click();
    cy.location('pathname').should('eq', '/en-GB/profile/casey-luettgen');
  });

  it('shows the comments content correctly', () => {
    cy.get('.e2e-comments-container').contains('Great idea, we stand behind you! I\'ll come riding a bicycle');
    cy.get('.e2e-comments-container').contains('I\'ve never seen you riding a bicycle..');
    cy.get('.e2e-comments-container').contains('No no no no no');
  });
  it('shows the idea content footer', () => {
    cy.get('#e2e-idea-content-footer');
  });

  it('shows the idea map component', () => {
    const projectTitle = randomString();
    const projectDescriptionPreview = randomString();
    const projectDescription = randomString();
    // location data for Brussels
    const locationGeoJSON = { type: 'Point', coordinates: [4.351710300000036, 50.8503396] };
    const locationDescription = 'Brussel, België';

    cy.apiCreateProject(
      'continuous',
      projectTitle,
      projectDescriptionPreview,
      projectDescription,
      'published'
      ).then((project) => {
      const projectId = project.body.data.id;
      const ideaTitle = randomString();
      const ideaContent = randomString();

      cy.apiCreateIdea(
        projectId,
        ideaTitle,
        ideaContent,
        locationGeoJSON,
        locationDescription
      ).then(() => {
        cy.visit(`/ideas/${ideaTitle}`);
        cy.get('#e2e-map-toggle').click();
        cy.get('#e2e-map');
      });
    });
  });

  it('has the More Options menu (when logged in as an admin) and opens it', () => {
    cy.login('admin@citizenlab.co', 'testtest');
    cy.visit('/ideas/controversial-idea');
    cy.wait(1000);
    cy.get('#e2e-idea-more-actions').click();
    cy.get('#e2e-idea-more-actions-menu');
  });

  it('has a correct initial idea status', () => {
    const projectTitle = randomString();
    const projectDescriptionPreview = randomString();
    const projectDescription = randomString();

    cy.apiCreateProject(
      'continuous',
      projectTitle,
      projectDescriptionPreview,
      projectDescription,
      'published'
      ).then((project) => {
      const projectId = project.body.data.id;
      const ideaTitle = randomString();
      const ideaContent = randomString();

      cy.apiCreateIdea(
        projectId,
        ideaTitle,
        ideaContent
      ).then(idea => {
        cy.visit(`/ideas/${ideaTitle}`);
        cy.wait(500);
        cy.get('#e2e-idea-status-badge').contains('proposed');
      });
    });
  });
});
