const setupTestSute = require('../../utils/setup-test-suite');
const passwordResetPage = require('../../page-objects/password-reset');
const createNewPasswordPage = require('../../page-objects/create-new-password');
const getCurrentUser = require('../../utils/get-current-user');
const getPasswordResetToken = require('../../utils/get-password-reset-token');

describe('Create new password page', () => {
  let token = null;

  beforeAll(async (done) => {
    const { email } = await getCurrentUser();

    await passwordResetPage.open();
    await setupTestSute();
    await passwordResetPage.email.setValue(email);
    await passwordResetPage.submitButton.click();
    await passwordResetPage.successMessage;

    token = await getPasswordResetToken({ email });

    expect(token).toBeTruthy();
    browser.call(done);
  });

  beforeEach(async (done) => {
    await createNewPasswordPage.open({ token });
    await setupTestSute();
    browser.call(done);
  });

  it("should show error if passwords don't match", async (done) => {
    await createNewPasswordPage.password.setValue('1');
    await createNewPasswordPage.password2.setValue('2');
    await createNewPasswordPage.submitButton.click();
    await createNewPasswordPage.error;
    browser.call(done);
  });

  it('should show success message after submitting valid passwords', async (done) => {
    const { password } = await getCurrentUser();

    await createNewPasswordPage.password.setValue(password);
    await createNewPasswordPage.password2.setValue(password);
    await createNewPasswordPage.submitButton.click();
    await createNewPasswordPage.successMessage;
    browser.call(done);
  });
});
