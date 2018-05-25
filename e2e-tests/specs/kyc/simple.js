const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');
const buyTokensPage = require('../../page-objects/buy-tokens');
const userWalletAddressForm = require('../../page-objects/user-wallet-address-form');
const paymentMethod = require('../../page-objects/payment-method');
const { getTemporaryUser } = require('../../utils/users');
const wallet = require('../../web3-mock/wallet');

describe('Simple KYC flow', () => {
  beforeEach(async (done) => {
    await signInPage.open();

    const { email, password } = await getTemporaryUser();

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

  it('should prefill address with web3 wallet address', async (done) => {
    await userWalletAddressForm.root;

    const prefilledAddress = await userWalletAddressForm.address.getValue();

    expect(prefilledAddress.toLowerCase()).toBe(
      wallet.getAddressString().toLowerCase(),
    );
    browser.call(done);
  });

  it('should prefill address with web3 wallet address, save confirmed address and show payment methods', async (done) => {
    const testAddress = `0x${'0'.repeat(40)}`;

    await userWalletAddressForm.root;
    await userWalletAddressForm.address.setValue(testAddress);
    await userWalletAddressForm.confirmationAddress.setValue(testAddress);
    await userWalletAddressForm.submit.click();
    await paymentMethod.root;

    browser.call(done);
  });
});
