import { assocPath } from 'ramda';
import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Tokens purchase via ERC20', () => {
  afterEach(() => {
    cy.logout();
  });

  it('should have ERC20 payment method', () => {
    cy.getTemporaryIco(assocPath(['sale', 'rates', 'payWithErc20'], true))
      .then((ico) => {
        return cy
          .getTemporaryUser({ ico })
          .then(({ email, password }) => cy.login({ ico, email, password }))
          .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
      })
      .then(() => {
        paymentMethod.getSelect().should('be.visible');
        paymentMethod.address.getRoot().should('be.visible');

        paymentMethod.getSelect().select('ERC20');
        paymentMethod.getSelect().should('have.value', 'ERC20');
        paymentMethod.address.getRoot().should('not.be.visible');
        paymentMethod.getInstruction().should('be.visible');

        paymentMethod.exchangeForm.getRoot().should('be.visible');
        paymentMethod.exchangeForm.getAmount().should('be.visible');
        paymentMethod.exchangeForm.getCost().should('be.visible');
        paymentMethod.exchangeForm.getErc20Buy().should('be.visible');
        paymentMethod.exchangeForm.getErc20Buy().should('have.attr', 'href');
      });
  });

  it('should not have ERC20 payment method if ICO doesn’t allow it', () => {
    cy.getTemporaryIco(assocPath(['sale', 'rates', 'payWithErc20'], false))
      .then((ico) => {
        return cy
          .getTemporaryUser({ ico })
          .then(({ email, password }) => cy.login({ ico, email, password }))
          .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
      })
      .then(() => {
        paymentMethod.getSelect().should('not.exist');
      });
  });
});
