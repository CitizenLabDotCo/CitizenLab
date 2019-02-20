describe('About page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('shows the en-GB version of the page by default', () => {
    cy.location('pathname').should('eq', '/en-GB/');
    cy.get('#e2e-login-link').contains('Log in');
  });

  it('can switch to nl-BE', () => {
    cy.get('.e2e-langage-dropdown-toggle').click();
    cy.get('.e2e-langage-nl-BE').click();
    cy.location('pathname').should('eq', '/nl-BE/');
    cy.get('#e2e-login-link').contains('Inloggen');
  });

  it('keeps the picked locale', () => {
    cy.get('.e2e-langage-dropdown-toggle').click();
    cy.get('.e2e-langage-nl-BE').click();
    cy.location('pathname').should('eq', '/nl-BE/');
    cy.visit('/');
    cy.location('pathname').should('eq', '/nl-BE/');
    cy.visit('/en-GB/');
    cy.location('pathname').should('eq', '/nl-BE/');
    cy.get('#e2e-login-link').contains('Inloggen');
  });

  it('gets you to the right locale on sign-up', () => {
    cy.get('.e2e-langage-dropdown-toggle').click();
    cy.get('.e2e-langage-nl-BE').click();
    cy.location('pathname').should('eq', '/nl-BE/');
    cy.login('admin@citizenlab.co', 'testtest');
    cy.location('pathname').should('eq', '/en-GB/');
  });

  it('keeps users locale', () => {
    cy.login('admin@citizenlab.co', 'testtest');
    cy.location('pathname').should('eq', '/en-GB/');
    cy.visit('/projects/omgevingsanalyse-meerjarenplan-een-gefaseerde-aanpak/info');
    cy.location('pathname').should('eq', '/en-GB/projects/omgevingsanalyse-meerjarenplan-een-gefaseerde-aanpak/info');
    cy.visit('/fr/projects/omgevingsanalyse-meerjarenplan-een-gefaseerde-aanpak/info');
    cy.location('pathname').should('eq', '/en-GB/projects/omgevingsanalyse-meerjarenplan-een-gefaseerde-aanpak/info');
  });
});
