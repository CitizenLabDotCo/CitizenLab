const crypto = require('crypto');
const hash = crypto.randomBytes(5).toString('hex');
const firstName = `first name ${hash}`;
const lastName = `last name ${hash}`;
const afterEach = require('../updateBSStatus');

module.exports = {
  '@tags': ['citizen', 'profile'],
  afterEach,
  editProfile: (browser) => {
    const signinPage = browser.page.signin();

    signinPage
    .navigate()
    .signin('koen@citizenlab.co', 'testtest');

    browser
    .waitForElementVisible('#e2e-landing-page')
    .click('#e2e-user-menu-container')
    .waitForElementVisible('#e2e-user-menu-dropdown')
    .click('#e2e-profile-edit-link')
    .waitForElementVisible('.e2e-profile-edit-form')
    .clearValue('#firstName')
    .setValue('#firstName', firstName)
    .clearValue('#lastName')
    .setValue('#lastName', lastName)
    .click('.e2e-submit-wrapper-button button')
    .waitForElementVisible('.success')
    .url(`http://${process.env.ROOT_URL}/profile/edit`)
    .waitForElementVisible('.e2e-profile-edit-form')
    .getValue('input#firstName', function (result) {
      this.assert.equal(result.value, firstName);
    })
    .getValue('input#lastName', function (result) {
      this.assert.equal(result.value, lastName);
    })
    .end();
  },
};
