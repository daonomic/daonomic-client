import { config } from '../../config';
import { kycView } from '../../objects/kyc';
import { paymentMethod } from '../../objects/payment-method';
import { navigation } from '../../objects/navigation';

describe('Simple KYC flow', () => {
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

  it('should save address and show payment methods', () => {
    cy.fillUserData({ address: config.testUserAddress });
    cy.fillExtendedKycForm();

    cy.whitelistUser({
      ico: currentUser.ico,
      userId: currentUser.id,
    });

    paymentMethod.getRoot().should('be.visible');
  });

  it('should hide wallet creation page after saving user address', () => {
    navigation.getCreateWalletLink().should('be.visible');
    cy.fillUserData({ address: config.testUserAddress });
    navigation.getCreateWalletLink().should('not.be.visible');
  });

  it('should support simple denial', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/status',
      delay: 500,
      status: 200,
      response: { status: 'DENIED' },
    }).as('kycStatusRequest');

    cy.fillUserData({ address: config.testUserAddress });
    cy.wait('@kycStatusRequest');
    kycView.getDenialAnnotation().should('be.visible');
  });
});
