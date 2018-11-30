describe('Idea form page', () => {
  beforeEach(() => {
    cy.visit('/projects/an-idea-bring-it-to-your-council/ideas/new')
      .get('.e2e-accept-cookies-btn').click();
  });

  it('shows the page', () => {
    cy.get('.e2e-idea-form-page');
  });

  it('shows the idea form', () => {
    cy.get('#idea-form');
  });

  it('has a working title field', () => {
    cy.get('#title').type('test').should('have.value', 'test');
  });

  it('has a working description field', () => {
    cy.get('.ql-editor').type('test').should('contain', 'test');
  });

  it('has a working topics select box', () => {
    cy.get('.e2e-idea-form-topics-multiple-select-box input').click({ force: true }).type('Education and youth{enter}', { force: true })
      .get('.e2e-idea-form-topics-multiple-select-box').contains('Education and youth');
  });

  it('has a working location field', () => {
    cy.get('.e2e-idea-form-location-input-field input').type('antwerp{enter}')
      .get('.e2e-idea-form-location-input-field #PlacesAutocomplete__autocomplete-container div').first().click()
      .get('.e2e-idea-form-location-input-field input').should('have.value', 'Antwerp, Belgium');
  });

  it('shows an error when no title is provided', () => {
    cy.get('.e2e-submit-idea-form').click()
      .get('.e2e-error-message').should('contain', 'Please provide a title');
  });

  it('shows an error when no description is provided', () => {
    cy.get('.e2e-submit-idea-form').click()
      .get('.e2e-error-message').should('contain', 'Please provide a description');
  });

  it('creates an idea when submitting the form with a title and description, and redirects to the sign-in form', () => {
    const ideaTtle = Math.random().toString(36).substr(2, 5).toLowerCase();
    const ideaDescription = Math.random().toString(36).substr(2, 5).toLowerCase();

    cy.get('#title').type(ideaTtle)
      .get('.ql-editor').type(ideaDescription)
      .get('.e2e-submit-idea-form').click()
      .get('.e2e-lazy-idea-flow-sign-in-form')
      .request({
        method: 'GET',
        url: `/web_api/v1/ideas/by_slug/${ideaTtle}`
      });
  });
});

// Cypress.Commands.add('loginAsAdmin', () => {
//   cy.visit('/sign-in');
//   cy.get('#email').type('koen@citizenlab.co');
//   cy.get('#password').type('testtest');
//   cy.get('.e2e-submit-signin').click();
// });

// Cypress.Commands.add('logOut', () => {
//   cy.get('#e2e-user-menu-container').click().get('#e2e-sign-out-link').click();
// });

// Cypress.Commands.add('createNewContinuousProject', (projectName: string) => {
//   cy.visit('/admin/projects');
//   cy.get('.e2e-admin-add-project').click();
//   cy.get('#project-title-en').type(projectName);
//   cy.get('#project-title-nl-BE').type(projectName);
//   cy.get('.e2e-project-type-continuous').click();
//   cy.get('.e2e-submit-wrapper-button').click();
// });

// describe('Home page', () => {
//   it('successfully loads', () => {
//     cy.visit('/');
//     cy.get('#e2e-landing-page');
//   });
// });

// describe('Sign in page', () => {
//   it('signs in for valid credentials and redirects to the homepage', () => {
//     cy.visit('/sign-in');
//     cy.get('#email').type('koen@citizenlab.co');
//     cy.get('#password').type('testtest');
//     cy.get('.e2e-submit-signin').click();
//     cy.location('pathname').should('eq', '/en-GB/');
//     cy.getCookie('cl2_jwt').should('exist');
//     cy.get('#e2e-user-menu-container').should('contain', 'Koen');
//   });

//   it('shows an error message when trying to sign in with invalid credentials', () => {
//     cy.visit('/sign-in');
//     cy.get('#email').type('dsfdetrtertfdss@dfdsf.co');
//     cy.get('#password').type('fdfwerwerdgdfgdfgfdg');
//     cy.get('.e2e-submit-signin').click();
//     cy.get('.e2e-error-message').contains('This combination of e-mail and password is not correct');
//   });
// });

// describe('Sign up page', () => {
//   it('signs up a new user and redirects him to the homepage', () => {
//     const firstName = Math.random().toString(36).substr(2, 5);
//     const lastName = Math.random().toString(36).substr(2, 5);
//     const email = `${Math.random().toString(36).substr(2, 5)}@citizenlab.co`;
//     const password = '123456789';

//     cy.visit('/sign-up');
//     cy.get('#firstName').type(firstName);
//     cy.get('#lastName').type(lastName);
//     cy.get('#email').type(email);
//     cy.get('#password').type(password);
//     cy.get('.e2e-terms-and-conditions .e2e-checkbox').click();
//     cy.get('#e2e-signup-step1-button').click();
//     cy.get('.e2e-signup-step2-button').click();
//     cy.location('pathname').should('eq', '/en-GB/');
//     cy.getCookie('cl2_jwt').should('exist');
//     cy.get('#e2e-user-menu-container').should('contain', firstName);
//   });
// });

// describe('Lazy idea posting flow', () => {
//   const firstName = Math.random().toString(36).substr(2, 5);
//   const lastName = Math.random().toString(36).substr(2, 5);
//   const email = `${Math.random().toString(36).substr(2, 5)}@citizenlab.co`;
//   const password = '123456789';
//   const projectName = Math.random().toString(36).substr(2, 5);
//   iconst ideaTtle = Math.random().toString(36).substr(2, 5);
//   const ideaDescription = Math.random().toString(36).substr(2, 5);

//   // tisha@ornhills.io
//   // testtest

//   beforeEach(() => {
//     cy.request({
//       method: 'POST',
//       url: '/web_api/v1/user_token',
//       body: {
//         auth: {
//           email: 'tisha@ornhills.io',
//           password: 'testtest'
//         }
//       }
//     });
//   });

//   it('goes to the project selection page when clicking on the "Start an idea" button', () => {
//     cy.get('.addIdea').click();
//     cy.location('pathname').should('eq', '/en-GB/ideas/new');
//   });

//   it('goes the idea form when selecting a project and clicking "Continue"', () => {
//     cy.visit('/ideas/new');
//     cy.contains('An idea? Bring it to your council!').click();
//     cy.get('.e2e-submit-project-select-form').click();
//     cy.location('pathname').should('eq', `/en-GB/projects/${projectName}/ideas/new`);
//   });

//   it('shows the idea form when navigating to it', () => {
//     cy.visit('/projects/an-idea-bring-it-to-your-council/ideas/new');
//     cy.get('.e2e-idea-form-title').contains('Add your idea');
//     cy.get('#idea-form');
//   });

//   it('requires a title', () => {
//     cy.visit('/projects/an-idea-bring-it-to-your-council/ideas/new');

//   });

//   it('fills in the idea form, signs you in and redirects you to the idea page', () => {
//     cy.loginAsAdmin();
//     cy.createNewContinuousProject(projectName);
//     cy.logOut();
//     cy.get('.addIdea').click();
//     cy.location('pathname').should('eq', '/en-GB/ideas/new');
//     cy.acceptCookies();
//     cy.contains(projectName).click();
//     cy.get('.e2e-submit-project-select-form').click();
//     cy.location('pathname').should('eq', `/en-GB/projects/${projectName}/ideas/new`);
//     cy.get('#title').type(ideaTitle);
//     cy.get('.ql-editor').type(ideaDescription);
//     cy.get('.e2e-submit-idea-form').then((button) => {
//       if (button) {
//         button.click();
//       } else {
//         cy.get('.e2e-submit-idea-form-mobile').click();
//       }
//     });
//     cy.get('#email').type('koen@citizenlab.co');
//     cy.get('#password').type('testtest');
//     cy.get('.e2e-submit-signin').click();
//     cy.location('pathname').should('eq', `/en-GB/ideas/${ideaTitle}`);
//     cy.get('.e2e-idea-social-sharing-modal-title');
//     cy.get('.e2e-modal-close-button').click();
//     cy.get('.e2e-ideatitle').contains(ideaTitle);
//   });
// });

  // const projectTitle = Math.random().toString(36).substr(2, 5).toLowerCase();
  // const projectDescription = Math.random().toString(36).substr(2, 5).toLowerCase();

  // before(() => {
  //   cy.loginAsAdmin();
  //   cy.wait(1000);
  //   const jwt = Cookies.get('cl2_jwt');
  //   console.log('zolg');
  //   console.log(jwt);
  //   cy.request({
  //     method: 'POST',
  //     url: '/web_api/v1/projects',
  //     headers: {
  //       'Content-Type': 'application/json',
  //       Authorization: `Bearer ${jwt}`
  //     },
  //     body: {
  //       project: {
  //         commenting_enabled: true,
  //         participation_method: 'ideation',
  //         posting_enabled: true,
  //         presentation_mode: 'card',
  //         process_type: 'continuous',
  //         voting_enabled: true,
  //         voting_method: 'unlimited',
  //         title_multiloc: {
  //           en: projectTitle
  //         }
  //       }
  //     }
  //   });
  // });

  // const projectName = Math.random().toString(36).substr(2, 5).toLowerCase();
  // cy.loginAsAdmin();
  // cy.visit('/admin/projects');
  // cy.get('.e2e-admin-add-project').click();
  // // cy.get('#projecstatus-archived').click();
  // cy.get('#project-title-en').type(projectName);
  // cy.get('#project-title-nl-BE').type(projectName);
  // cy.get('.e2e-project-type-continuous').click();
  // cy.get('.e2e-submit-wrapper-button').click();
