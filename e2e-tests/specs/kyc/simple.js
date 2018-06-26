const buyTokensPage = require('../../page-objects/buy-tokens');
const userDataForm = require('../../page-objects/kyc/user-data-form');
const paymentMethod = require('../../page-objects/payment-method');
const { login, logout } = require('../../flows/auth');
const { fillUserData } = require('../../flows/kyc');
const initApplication = require('../../utils/init-application');
const { getTemporaryUser } = require('../../utils/users');
const wallet = require('../../web3-mock/wallet');

describe('Simple KYC flow', () => {
  beforeEach(async (done) => {
    const { email, password } = await getTemporaryUser();

    await login({ email, password });
    await buyTokensPage.open();
    await initApplication();
    browser.call(done);
  });

  afterEach(async (done) => {
    await logout();
    browser.call(done);
  });

  it('should prefill address with web3 wallet address', async (done) => {
    await userDataForm.root;

    const prefilledAddress = await userDataForm.address.getValue();

    expect(prefilledAddress.toLowerCase()).toBe(
      wallet.getAddressString().toLowerCase(),
    );
    browser.call(done);
  });

  it('should save address and show payment methods', async (done) => {
    await fillUserData({ address: `0x${'0'.repeat(40)}` });
    await paymentMethod.root;
    browser.call(done);
  });
});
