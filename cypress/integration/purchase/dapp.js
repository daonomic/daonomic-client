import { paymentMethod } from '../../objects/payment-method';
import { balance } from '../../objects/balance';
import wallet from '../../support/web3-mock/wallet';

describe('Immediate tokens purchase with Web3', () => {
  afterEach(() => {
    cy.logout();
  });

  it('should be able to purchase tokens through exchange form with the same address', () => {
    cy.getTemporaryUser()
      .then(({ email, password }) => cy.login({ email, password }))
      .then(() => cy.fillUserData({ address: wallet.getAddressString() }));

    balance.getRoot().should('be.visible');
    balance.getAmount().should('have.text', '0');

    paymentMethod.exchangeForm.getRoot().should('be.visible');
    paymentMethod.exchangeForm.getAmount().type(1);
    paymentMethod.exchangeForm.getBuy().click();
    balance.getAmount().should('have.text', '1');
  });

  it('should be able to purchase tokens through exchange form with different address', () => {
    const differentUserAddress = '0x50d09C441B3DEcF388e440D495ebE3c94b849410';

    cy.wrap(differentUserAddress).should(
      'not.equal',
      wallet.getAddressString(),
    );

    cy.getTemporaryUser()
      .then(({ email, password }) => cy.login({ email, password }))
      .then(() => cy.fillUserData({ address: differentUserAddress }));

    balance.getRoot().should('be.visible');
    balance.getAmount().should('have.text', '0');

    paymentMethod.exchangeForm.getRoot().should('be.visible');
    paymentMethod.exchangeForm.getAmount().type(1);
    paymentMethod.exchangeForm.getBuy().click();
    balance.getAmount().should('have.text', '1');
  });
});
