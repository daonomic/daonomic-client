import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Tokens purchase', () => {
  beforeEach(() => {
    cy.getTemporaryUser()
      .then(({ email, password }) => cy.login({ email, password }))
      .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
  });

  afterEach(() => {
    cy.logout();
  });

  it('should not show payment methods select if ICO has only one payment method', () => {
    paymentMethod.getRoot().should('be.visible');
    paymentMethod.getSelect().should('not.be.visible');
  });
});
