const buyTokensPage = require('../../page-objects/buy-tokens');
const exchangeForm = require('../../page-objects/purchase/exchange-form');
const balance = require('../../page-objects/balance');
const initApplication = require('../../utils/init-application');
const { getTemporaryUser } = require('../../utils/users');
const wallet = require('../../web3-mock/wallet');
const { login, logout } = require('../../flows/auth');
const { fillUserData } = require('../../flows/kyc');

describe('Immediate tokens purchase via DAPP', () => {
  beforeEach(async (done) => {
    const { email, password } = await getTemporaryUser();

    await login({ email, password });
    await buyTokensPage.open();
    await initApplication();
    await fillUserData({
      address: wallet.getAddressString(),
    });
    browser.call(done);
  });

  afterEach(async (done) => {
    await logout();
    browser.call(done);
  });

  it('should purchase tokens via exchange form', async (done) => {
    await balance.root;
    const currentBalance = await balance.amount.getText();

    expect(currentBalance).toBe('0');

    await exchangeForm.root;
    await exchangeForm.amount.setValue(1);
    await exchangeForm.buy.click();

    await browser.waitUntil(async () => {
      const text = await balance.amount.getText();

      return text === '1';
    }, 10000);

    browser.call(done);
  });
});
