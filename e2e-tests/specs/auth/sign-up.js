const setupTestSute = require('../../utils/setup-test-suite');
const signUpPage = require('../../page-objects/sign-up');
const signInPage = require('../../page-objects/sign-in');
const getCurrentUser = require('../../utils/get-current-user');

describe('Sign up page', () => {
  beforeEach(async (done) => {
    await signUpPage.open();
    await setupTestSute();
    browser.call(done);
  });

  it('should have working link to sign in page', async (done) => {
    await signUpPage.signInLink.click();
    await signInPage.form;
    browser.call(done);
  });

  it('should not sign up with already used email', async (done) => {
    const { email } = await getCurrentUser();

    await signUpPage.email.setValue(email);
    await signUpPage.submitButton.click();

    expect(await signUpPage.error.getText()).not.toBe('');
    browser.call(done);
  });

  it('should sign up with new email', async (done) => {
    const testEmail = 'test@example.com';

    await signUpPage.email.setValue(testEmail);
    await signUpPage.submitButton.click();
    await signUpPage.successMessage;
    browser.call(done);
  });
});
