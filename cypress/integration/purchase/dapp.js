import { testUserAddress } from '../../config';
import { paymentMethod } from '../../objects/payment-method';
import { balance } from '../../objects/balance';
import { transactions } from '../../objects/transactions';
import wallet from '../../support/web3-mock/wallet';

describe('Immediate tokens purchase with Web3', () => {
  let currentUser = null;

  beforeEach(() => {
    cy.createUser().then((user) => {
      currentUser = user;
      cy.login({ email: user.email, password: user.password });
    });
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should be able to purchase tokens through exchange form', () => {
    cy.fillUserData({ address: wallet.getAddressString() });
    cy.fillExtendedKycForm();

    cy.whitelistUser({
      ico: currentUser.ico,
      userId: currentUser.id,
    });

    transactions.getRoot().should('be.visible');
    paymentMethod.exchangeForm.getRoot().should('be.visible');
    transactions.getTableEntries().should('have.length', 0);

    paymentMethod.exchangeForm.getAmount().type(1);
    paymentMethod.exchangeForm.getBuy().click();

    balance.getAmount().should('have.text', '1');
    transactions.getTableEntries().should('have.length', 1);
    transactions
      .getTableEntries()
      .first()
      .should('contain', 'Purchased 1');

    paymentMethod.exchangeForm.getAmount().type('{selectall}5');

    paymentMethod.exchangeForm.getBuy().click();

    balance.getAmount().should('have.text', '6');
    transactions.getTableEntries().should('have.length', 2);

    transactions
      .getTableEntries()
      .first()
      .should('contain', 'Purchased 5');
  });

  it('should be able to purchase tokens through exchange form with different address', () => {
    const differentUserAddress = testUserAddress;

    cy.wrap(differentUserAddress).should(
      'not.equal',
      wallet.getAddressString(),
    );

    cy.fillUserData({ address: differentUserAddress });
    cy.fillExtendedKycForm();

    cy.whitelistUser({
      ico: currentUser.ico,
      userId: currentUser.id,
    });

    balance.getRoot().should('be.visible');
    balance.getAmount().should('have.text', '0');

    paymentMethod.exchangeForm.getRoot().should('be.visible');

    paymentMethod.exchangeForm.getAmount().type('1');

    paymentMethod.exchangeForm.getBuy().click();
    balance.getAmount().should('have.text', '1');
  });
});
