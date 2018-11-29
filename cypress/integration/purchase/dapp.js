import { paymentMethod } from '../../objects/payment-method';
import { balance } from '../../objects/balance';
import wallet from '../../support/web3-mock/wallet';

describe('Immediate tokens purchase via DAPP', () => {
  beforeEach(() => {
    cy.getTemporaryUser()
      .then(({ email, password }) => cy.login({ email, password }))
      .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
  });

  afterEach(() => {
    cy.logout();
  });

  it('should purchase tokens via exchange form', () => {
    balance.getRoot().should('be.visible');
    balance.getAmount().should('have.text', '0');

    paymentMethod.exchangeForm.getRoot().should('be.visible');
    paymentMethod.exchangeForm.getAmount().type(1);
    paymentMethod.exchangeForm.getBuy().click();
    balance.getAmount().should('have.text', '1');
  });
});
