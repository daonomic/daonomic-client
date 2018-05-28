const signInPage = require('../../page-objects/sign-in');
const appHeader = require('../../page-objects/header');
const buyTokensPage = require('../../page-objects/buy-tokens');
const userWalletAddressForm = require('../../page-objects/kyc/user-wallet-address-form');
const extendedKycForm = require('../../page-objects/kyc/extended-kyc-form');
const kycReviewAnnotation = require('../../page-objects/kyc/review-annotation');
const { getTemporaryUser } = require('../../utils/users');
const { getTemporaryIco } = require('../../utils/icos');
const initApplication = require('../../utils/init-application');

describe('Extended KYC flow', () => {
  beforeEach(async (done) => {
    await signInPage.open();
    const ico = await getTemporaryIco({
      kycFormSchema: [
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
    });
    const getIco = () => ico;

    await initApplication({ getIco });
    const { email, password } = await getTemporaryUser({ getIco });

    await signInPage.email.setValue(email);
    await signInPage.password.setValue(password);
    await signInPage.submitButton.click();
    await appHeader.root;
    await buyTokensPage.open();
    await initApplication({ getIco });
    browser.call(done);
  });

  afterEach(async (done) => {
    await appHeader.logoutButton.click();
    browser.call(done);
  });

  it('should save address and show payment methods', async (done) => {
    const testAddress = `0x${'0'.repeat(40)}`;

    await userWalletAddressForm.root;
    await userWalletAddressForm.address.setValue(testAddress);
    await userWalletAddressForm.confirmationAddress.setValue(testAddress);
    await userWalletAddressForm.submit.click();
    await extendedKycForm.root;
    await extendedKycForm.getField({ name: 'firstName' }).setValue('Sarah');
    await extendedKycForm.getField({ name: 'lastName' }).setValue('O’Connor');
    await extendedKycForm.getCheckbox({ name: 'terms' }).click();
    await extendedKycForm.submit.click();
    await kycReviewAnnotation.root;

    browser.call(done);
  });
});
