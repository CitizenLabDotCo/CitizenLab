import { randomString, apiRemoveProject } from '../support/commands';

// describe('Project topics', () => {
//   const projectTitle = randomString();
//   const projectDescriptionPreview = randomString();
//   const projectDescription = randomString();

//   let projectId: string;
//   let projectSlug: string;

//   beforeEach(() => {
//     // create new project
//     cy.apiCreateProject({
//       type: 'continuous',
//       title: projectTitle,
//       descriptionPreview: projectDescriptionPreview,
//       description: projectDescription,
//       publicationStatus: 'published'
//     }).then((project) => {
//       projectId = project.body.data.id;
//       projectSlug = project.body.data.attributes.slug;
//     });

//     cy.setAdminLoginCookie();
//   });

//   describe('Topic manager', () => {
//     it('Adding a custom topic in the topic manager makes it available in the project topic settings', () => {
//       const topicTitle = randomString();

//       // check that our topic is not there initially
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect')
//         .click()
//         .contains(topicTitle)
//         .should('not.exist');

//       // go to topic manager
//       cy.visit('admin/settings/topics');

//       // Add custom topic
//       cy.get('#e2e-add-custom-topic-button').click();
//       cy.get('#e2e-topic-name-en').type(topicTitle);
//       cy.get('.e2e-submit-wrapper-button').click();

//       // Go to our project topic settings
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect').click().contains(topicTitle);
//     });

//     it('Removing a custom topic in the topic manager makes it unavailable in the project topic settings', () => {
//       const topicTitle = randomString();

//       // create a topic
//       cy.visit('admin/settings/topics');
//       cy.get('#e2e-add-custom-topic-button').click();
//       cy.get('#e2e-topic-name-en').type(topicTitle);
//       cy.get('.e2e-submit-wrapper-button').click();

//       // and check that our topic is there initially
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect')
//       .click()
//       .contains(topicTitle);

//       // go to topic manager
//       cy.visit('admin/settings/topics');

//       // Remove custom topic
//       cy.get('.e2e-topic-field-row')
//         .first()
//         .find('#e2e-custom-topic-delete-button')
//         .click();
//       cy.on('window:confirm', () => true);

//       // Go to our project topic settings and check that topic is not available
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect')
//         .click()
//         .contains(topicTitle)
//         .should('not.exist');
//     });

//     it('Renaming a custom topic in the topic manager updates its name in the project topic settings', () => {
//       const topicTitle = randomString();
//       const editedTopicTitle = randomString();

//       // create a topic
//       cy.visit('admin/settings/topics');
//       cy.get('#e2e-add-custom-topic-button').click();
//       cy.get('#e2e-topic-name-en').type(topicTitle);
//       cy.get('.e2e-submit-wrapper-button').click();

//       // and check that our topic is there initially
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect')
//       .click()
//       .contains(topicTitle);

//       // go to topic manager
//       cy.visit('admin/settings/topics');

//       // Edit the name of the custom topic
//       cy.get('.e2e-topic-field-row')
//         .first()
//         .find('#e2e-custom-topic-edit-button')
//         .click();
//       cy.get('#e2e-topic-name-en').type(editedTopicTitle);
//       cy.get('.e2e-submit-wrapper-button').click();

//       // Go to our project topic settings and check that name has chang
//       cy.visit(`admin/projects/${projectId}/topics`);
//       cy.get('#e2e-project-topic-multiselect')
//         .click()
//         .contains(editedTopicTitle);
//       });
//   });

  // describe('Project topic settings', () => {
  //   it('Adding a topic to a project makes it available in the idea form', () => {
  //     // create a topic
  //     cy.visit('admin/settings/topics');
  //     cy.get('#e2e-add-custom-topic-button').click();
  //     cy.get('#e2e-topic-name-en').type('Custom topic for idea form test');
  //     cy.get('.e2e-submit-wrapper-button').click();

  //     // Go to our project topic settings
  //     cy.visit(`admin/projects/${projectId}/topics`);

  //     // Add our new topic
  //     cy.get('#e2e-project-topic-multiselect').click().contains('Custom topic for idea form test').click();
  //     cy.get('#e2e-add-project-topic-button').click();

  //     // Go to idea form for our project
  //     cy.get('#e2e-new-idea').click();

  //     // Verify the topic is selectable in the topic selector
  //     cy.get('.e2e-topics-picker').contains('Custom topic for idea form test');
  //   });

  //   it('Removing a topic from a project makes it unavailable in the idea form', () => {
  //     it('Adding a topic to a project makes it available in the idea form', () => {
  //       // create a topic
  //       cy.visit('admin/settings/topics');
  //       cy.get('#e2e-add-custom-topic-button').click();
  //       cy.get('#e2e-topic-name-en').type('Custom topic for idea form test');
  //       cy.get('.e2e-submit-wrapper-button').click();

  //       // Go to our project topic settings
  //       cy.visit(`admin/projects/${projectId}/topics`);

  //       // Add our new topic
  //       cy.get('#e2e-project-topic-multiselect').click().contains('Custom topic for idea form test').click();
  //       cy.get('#e2e-add-project-topic-button').click();

  //       // Go to idea form for our project
  //       cy.get('#e2e-new-idea').click();

  //       // Verify the topic is selectable in the topic selector
  //       cy.get('.e2e-topics-picker').contains('Custom topic for idea form test 2');

  //       // Go to our project topic settings
  //       cy.visit(`admin/projects/${projectId}/topics`);

  //       // Remove our new topic from the project
  //       cy.get('.e2e-admin-list-row').contains('Custom topic for idea form test 2')
  //         .find('#e2e-remove-project-topic-button').click();
  //       cy.on('window:confirm', () => true);

  //       // Go to idea form for our project
  //       cy.get('#e2e-new-idea').click();

  //       // Verify the topic is not available in the topic selector
  //       cy.get('.e2e-topics-picker').contains('Custom topic for idea form test 2').should('not.exist');
  //     });
  //   });

  //   it('Adding a topic to a project makes it available in the project idea manager', () => {
  //     // create a topic
  //     cy.visit('admin/settings/topics');
  //     cy.get('#e2e-add-custom-topic-button').click();
  //     cy.get('#e2e-topic-name-en').type('Custom topic for idea manager test');
  //     cy.get('.e2e-submit-wrapper-button').click();

  //     // Go to our project topic settings
  //     cy.visit(`admin/projects/${projectId}/topics`);

  //     // Add our new topic
  //     cy.get('#e2e-project-topic-multiselect').click().contains('Custom topic for idea manager test').click();
  //     cy.get('#e2e-add-project-topic-button').click();

  //     // Go to idea manager for our project
  //     cy.visit(`admin/projects/${projectId}/ideas`);

  //     // Open topics tab
  //     cy.get('#topics').click();

  //     //
  //     cy.get('#e2e-idea-manager-topic-filters').contains('Custom topic for idea manager test');
  //   });

  //   it('Removing a topic from a project makes it unavailable in the project idea manager', () => {
  //     // create a topic
  //     cy.visit('admin/settings/topics');
  //     cy.get('#e2e-add-custom-topic-button').click();
  //     cy.get('#e2e-topic-name-en').type('Custom topic for idea manager test');
  //     cy.get('.e2e-submit-wrapper-button').click();

  //     // Go to our project topic settings
  //     cy.visit(`admin/projects/${projectId}/topics`);

  //     // Add our new topic
  //     cy.get('#e2e-project-topic-multiselect').click().contains('Custom topic for idea manager test').click();
  //     cy.get('#e2e-add-project-topic-button').click();

  //     // Go to idea manager for our project
  //     cy.visit(`admin/projects/${projectId}/ideas`);

  //     // Verify the topic is selectable in the idea manager topics tab
  //     cy.get('.e2e-topics-picker').contains('Custom topic for idea manager test 2');

  //     // Go to our project topic settings
  //     cy.visit(`admin/projects/${projectId}/topics`);

  //     // Remove our new topic from the project
  //     cy.get('.e2e-admin-list-row').contains('Custom topic for idea manager test 2')
  //       .find('#e2e-remove-project-topic-button').click();
  //     cy.on('window:confirm', () => true);

  //     // Go to idea manager for our project
  //     cy.visit(`admin/projects/${projectId}/ideas`);

  //     // Verify the topic is not selectable in the idea manager topics tab
  //     cy.get('#e2e-idea-manager-topic-filters')
  //       .contains('Custom topic for idea manager test')
  //       .should('not.exist');
  //   });

  // });

  afterEach(() => {
    apiRemoveProject(projectId);
  });
});
