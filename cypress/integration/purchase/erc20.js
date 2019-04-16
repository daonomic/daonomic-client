import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Tokens purchase via ERC20', () => {
  afterEach(() => {
    cy.logout();
  });

  it('should have ERC20 payment method', () => {
    let currentUser = null;

    const DAIERC20 = '0x0000000000000000000000000000000000000108';

    cy.createUser()
      .then((user) => {
        currentUser = user;
        return cy.login({ email: user.email, password: user.password });
      })
      .then(() => {
        cy.fillUserData({ address: wallet.getAddressString() });
        cy.fillExtendedKycForm();
        cy.whitelistUser({
          ico: currentUser.ico,
          userId: currentUser.id,
        });
      })
      .then(() => {
        paymentMethod.getSelect().should('be.visible');
        paymentMethod.address.getRoot().should('be.visible');

        paymentMethod.getSelect().select(DAIERC20);
        paymentMethod.getSelect().should('have.value', DAIERC20);
        paymentMethod.address.getRoot().should('not.be.visible');
        paymentMethod.getInstruction().should('be.visible');

        paymentMethod.exchangeForm.getRoot().should('be.visible');
        paymentMethod.exchangeForm.getCost().should('be.visible');
        paymentMethod.exchangeForm.getAmount().should('be.visible');
        paymentMethod.exchangeForm.getBuy().should('be.visible');

        // @todo DAO-65
      });
  });
});
