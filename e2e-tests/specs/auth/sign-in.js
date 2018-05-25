const signInPage = require('../../page-objects/sign-in');
const signUpPage = require('../../page-objects/sign-up');
const appHeader = require('../../page-objects/header');
const { getStableUser } = require('../../utils/users');

describe('Sign in page', () => {
  beforeEach(async (done) => {
    await signInPage.open();
    browser.call(done);
  });

  it('should have working link to sign up page', async (done) => {
    await signInPage.signUpLink.click();
    await signUpPage.form;
    browser.call(done);
  });

  it('should not login with invalid credentials', async (done) => {
    await signInPage.email.setValue('example@example.com');
    await signInPage.password.setValue('1234567890');
    await signInPage.submitButton.click();

    expect(await signInPage.error.getText()).not.toBe('');
    browser.call(done);
  });

  it('should login with valid credentials', async (done) => {
    const { email, password } = await getStableUser();

    await signInPage.email.setValue(email);
    await signInPage.password.setValue(password);
    await signInPage.submitButton.click();
    await appHeader.logoutButton.click();

    browser.call(done);
  });
});
