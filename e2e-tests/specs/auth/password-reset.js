const signInPage = require('../../page-objects/sign-in');
const passwordResetPage = require('../../page-objects/password-reset');
const getCurrentUser = require('../../utils/get-current-user');

describe('Password reset page', () => {
  beforeEach(async (done) => {
    await passwordResetPage.open();
    browser.call(done);
  });

  it('should open password reset page from sign in page', async (done) => {
    await signInPage.open();
    await signInPage.passwordResetLink.click();
    await passwordResetPage.form;
    browser.call(done);
  });

  it('should show error if trying to reset unknown user password', async (done) => {
    await passwordResetPage.email.setValue('unknown@example.com');
    await passwordResetPage.submitButton.click();
    await passwordResetPage.error;
    browser.call(done);
  });

  it('should reset known user password', async (done) => {
    const { email } = await getCurrentUser();

    await passwordResetPage.email.setValue(email);
    await passwordResetPage.submitButton.click();
    await passwordResetPage.successMessage;

    browser.call(done);
  });
});
