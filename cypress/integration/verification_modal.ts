import { randomString, randomEmail } from '../support/commands';

describe('Verification modal', () => {
  const firstName = randomString();
  const lastName = randomString();
  const email = randomEmail();
  const password = randomString();
  let userId: string;

  before(() => {
    cy.apiSignup(firstName, lastName, email, password).then((user) => {
      userId = user.body.data.id;
    });
  });

  beforeEach(() => {
    cy.login(email, password);
    cy.visit('/profile/edit');
    cy.wait(2000);
    cy.acceptCookies();
  });

  it('verifies the user using the bogus form', () => {
    cy.get('#e2e-user-edit-profile-page');
    cy.get('#e2e-verify-user-button').click();
    cy.get('#e2e-verification-methods');
    cy.get('#e2e-verification-methods #e2e-bogus-button').click();
    cy.get('#e2e-verification-bogus-form');
    cy.get('#e2e-verification-bogus-submit-button').click();
    cy.get('#e2e-verification-success');
    cy.get('.e2e-modal-close-button').click();
    cy.wait(1000);
    cy.get('#e2e-user-edit-profile-page');
    cy.get('.e2e-verified');
    cy.get('#e2e-user-menu-container.e2e-verified');
  });

  after(() => {
    cy.apiRemoveUser(userId);
  });

});
