import { assocPath } from 'ramda';
import { exchangeForm } from '../../objects/purchase/exchange-form';
import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Tokens purchase via ERC20', () => {
  beforeEach(() => {});

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
        paymentMethod.getSelect().select('ERC20');
        paymentMethod.getSelect().should('have.value', 'ERC20');
        exchangeForm.getRoot().should('be.visible');
        exchangeForm.getAmount().should('be.visible');
        exchangeForm.getCost().should('be.visible');
        exchangeForm.getErc20Buy().should('be.visible');
        exchangeForm.getErc20Buy().should('have.attr', 'href');
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
        paymentMethod.getSelect().should('be.visible');
        paymentMethod.getSelect().should('have.value', 'ETH');
        paymentMethod.getSelectOptions().should('have.length', 1);
      });
  });
});
