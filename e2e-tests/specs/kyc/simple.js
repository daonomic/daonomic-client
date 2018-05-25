const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');
const buyTokensPage = require('../../page-objects/buy-tokens');
const userWalletAddressForm = require('../../page-objects/user-wallet-address-form');
const paymentMethod = require('../../page-objects/payment-method');
const getCurrentUser = require('../../utils/get-current-user');

describe('Simple KYC flow', () => {
  beforeEach(async (done) => {
    await signInPage.open();

    const { email, password } = await getCurrentUser();

    await signInPage.email.setValue(email);
    await signInPage.password.setValue(password);
    await signInPage.submitButton.click();
    await appHeader.root;
    await buyTokensPage.open();
    browser.call(done);
  });

  afterEach(async (done) => {
    await appHeader.logoutButton.click();
    browser.call(done);
  });

  it('should save entered address and show payment methods', async (done) => {
    const testAddress = `0x${'0'.repeat(40)}`;

    await userWalletAddressForm.root;
    await userWalletAddressForm.address.setValue(testAddress);
    await userWalletAddressForm.confirmationAddress.setValue(testAddress);
    await userWalletAddressForm.submit.click();
    await paymentMethod.root;

    browser.call(done);
  });
});
