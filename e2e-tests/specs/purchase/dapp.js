const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');
const buyTokensPage = require('../../page-objects/buy-tokens');
const exchangeForm = require('../../page-objects/purchase/exchange-form');
const balance = require('../../page-objects/balance');
const initApplication = require('../../utils/init-application');
const { getTemporaryUser } = require('../../utils/users');
const wallet = require('../../web3-mock/wallet');
const { fillSimpleKyc } = require('../../flows/kyc');

describe('Immediate tokens purchase via DAPP', () => {
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
    await fillSimpleKyc({
      address: wallet.getAddressString(),
    });
    browser.call(done);
  });

  afterEach(async (done) => {
    await appHeader.logoutButton.click();
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
