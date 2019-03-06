import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import { kycView } from '../../objects/kyc';

describe('No public sale', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/config',
      delay: 500,
      status: 200,
      response: 'fixture:api/config/no-sale.json',
    }).as('configRequest');

    cy.createUser().then(({ email, password }) => {
      cy.login({ email, password });
    });
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should allow passing KYC, but should not show payment and token price widgets after approval', () => {
    userDataForm.getRoot().should('be.visible');
    tokenPrice.getRoot().should('not.be.visible');
    balance.getRoot().should('be.visible');

    cy.fillUserData({ address: testUserAddress });

    kycView.getAllowedAnnotation().should('be.visible');
    userDataForm.getRoot().should('not.exist');
    paymentMethod.getRoot().should('not.exist');
    tokenPrice.getRoot().should('not.be.visible');
    balance.getRoot().should('be.visible');
  });
});
