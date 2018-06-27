const buyTokensPage = require('../../page-objects/buy-tokens');
const externalKyc = require('../../page-objects/kyc/external-kyc');
const { fillUserData } = require('../../flows/kyc');
const { login, logout } = require('../../flows/auth');
const { getTemporaryUser } = require('../../utils/users');
const { createExternalKycProvider } = require('../../server-api');
const { getTemporaryIco, getExternalKycParams } = require('../../utils/icos');
const initApplication = require('../../utils/init-application');

describe('External KYC flow', () => {
  const testProviderUrl = 'http://provider.example.com/';

  beforeEach(async (done) => {
    const { id: providerAddress } = await createExternalKycProvider({
      jurisdiction: 'OTHER',
      url: testProviderUrl,
    });
    const ico = await getTemporaryIco({
      kyc: getExternalKycParams({ providerAddress }),
    });
    const getIco = () => ico;
    const { email, password } = await getTemporaryUser({ getIco });

    await login({
      getIco,
      email,
      password,
    });
    await buyTokensPage.open();
    await initApplication({ getIco });
    browser.call(done);
  });

  afterEach(async (done) => {
    await logout();
    browser.call(done);
  });

  it('should show external kyc link', async (done) => {
    const testAddress = `0x${'0'.repeat(40)}`;

    await fillUserData({ address: testAddress });
    await externalKyc.root;
    const providerUrl = await externalKyc.link.getAttribute('href');

    expect(providerUrl.startsWith(testProviderUrl)).toBe(true);
    browser.call(done);
  });
});
