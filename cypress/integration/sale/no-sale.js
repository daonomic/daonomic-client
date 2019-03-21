import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import { balanceOverview } from '../../objects/balanceOverview';
import { kycView } from '../../objects/kyc';
import { transactions } from '../../objects/transactions';

describe('No public sale', () => {
  afterEach(() => {
    cy.logout();
  });

  it('Should allow passing KYC, but should not show payment and token price widgets after approval', () => {
    cy.server();

    cy.route({
      method: 'GET',
      url: '**/config',
      delay: 500,
      status: 200,
      response: 'fixture:api/config/no-sale.json',
    }).as('configRequest');

    cy.createInvestor().then(({ email, password }) => {
      cy.login({ email, password });
    });

    tokenPrice.getRoot().should('not.exist');
    transactions.getRoot().should('not.exist');
    userDataForm.getRoot().should('be.visible');
    balance.getRoot().should('be.visible');

    cy.fillUserData({ address: testUserAddress });

    userDataForm.getRoot().should('not.exist');
    paymentMethod.getRoot().should('not.exist');
    tokenPrice.getRoot().should('not.exist');
    kycView.getAllowedAnnotation().should('be.visible');
    balance.getRoot().should('be.visible');
    transactions.getRoot().should('be.visible');

    balance.getAmount().should('be.visible');
    balanceOverview.getRoot().should('not.be.visible');
  });
});
