const buyTokensPage = require('../../page-objects/buy-tokens');
const extendedKycForm = require('../../page-objects/kyc/extended-kyc-form');
const kycReviewAnnotation = require('../../page-objects/kyc/review-annotation');
const { login, logout } = require('../../flows/auth');
const { fillUserData } = require('../../flows/kyc');
const { getTemporaryUser } = require('../../utils/users');
const { getTemporaryIco, getInternalKycParams } = require('../../utils/icos');
const initApplication = require('../../utils/init-application');

describe('Internal KYC flow', () => {
  beforeEach(async (done) => {
    const ico = await getTemporaryIco({
      kyc: getInternalKycParams({
        fields: [
          {
            name: 'firstName',
            label: 'First name',
            type: 'STRING',
            required: true,
          },
          {
            name: 'lastName',
            label: 'Last name',
            type: 'STRING',
            required: true,
          },
          {
            name: 'terms',
            label: 'Agree with the terms and conditions',
            type: 'BOOLEAN',
            required: true,
          },
        ],
      }),
    });
    const getIco = () => ico;
    const { email, password } = await getTemporaryUser({ getIco });

    await login({ getIco, email, password });
    await buyTokensPage.open();
    await initApplication({ getIco });
    browser.call(done);
  });

  afterEach(async (done) => {
    await logout();
    browser.call(done);
  });

  it('should save KYC data and show review annotation', async (done) => {
    const testAddress = `0x${'0'.repeat(40)}`;

    await fillUserData({ address: testAddress });
    await browser.debug();
    await extendedKycForm.root;
    await extendedKycForm.getField({ name: 'firstName' }).setValue('Sarah');
    await extendedKycForm.getField({ name: 'lastName' }).setValue('O’Connor');
    await extendedKycForm.getCheckbox({ name: 'terms' }).click();
    await extendedKycForm.submit.click();
    await kycReviewAnnotation.root;

    browser.call(done);
  });
});
