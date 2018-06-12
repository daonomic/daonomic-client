const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');
const buyTokensPage = require('../../page-objects/buy-tokens');
const userWalletAddressForm = require('../../page-objects/kyc/user-wallet-address-form');
const initApplication = require('../../utils/init-application');
const { getTemporaryUser } = require('../../utils/users');
const { fillSimpleKyc } = require('../../flows/kyc');
const wallet = require('../../web3-mock/wallet');

describe('Simple KYC flow', () => {
  beforeEach(async (done) => {
    await signInPage.open();
    await initApplication();

    const { email, password } = await getTemporaryUser();

    await signInPage.email.setValue(email);
    await signInPage.password.setValue(password);
    await signInPage.submitButton.click();
    await appHeader.root;
    await buyTokensPage.open();
    await initApplication();
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

  it('should save address and show payment methods', async (done) => {
    await fillSimpleKyc({ address: `0x${'0'.repeat(40)}` });
    browser.call(done);
  });
});
