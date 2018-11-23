import { exchangeForm } from '../../objects/purchase/exchange-form';
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

    exchangeForm.getRoot().should('be.visible');
    exchangeForm.getAmount().type(1);
    exchangeForm.getBuy().click();
    balance.getAmount().should('have.text', '1');
  });
});
