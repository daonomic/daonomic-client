import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Simple KYC flow', () => {
  beforeEach(() => {
    cy.getTemporaryUser().then(({ email, password }) => {
      cy.login({ email, password });
    });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should prefill address with web3 wallet address', () => {
    userDataForm.getRoot().should('be.visible');
    userDataForm.getAddress().then(($el) => {
      cy.wrap($el.val().toLowerCase()).should(
        'equal',
        wallet.getAddressString().toLowerCase(),
      );
    });
  });

  it('should save address and show payment methods', () => {
    cy.fillUserData({ address: `0x${'0'.repeat(40)}` });
    paymentMethod.getRoot().should('be.visible');
  });
});
