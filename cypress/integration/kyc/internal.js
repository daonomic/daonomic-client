import { testUserAddress } from '../../config';
import { kycView } from '../../objects/kyc';
import { paymentMethod } from '../../objects/payment-method';
import { navigation } from '../../objects/navigation';

describe('Internal KYC flow', () => {
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

  it('should save KYC data, show review annotation, show payment methods and hide wallet creation page after confirmation', () => {
    navigation.getCreateWalletLink().should('be.visible');

    cy.fillUserData({ address: testUserAddress });
    cy.fillExtendedKycForm();

    kycView.getReviewAnnotation().should('be.visible');
    navigation.getCreateWalletLink().should('not.exist');
    paymentMethod.getRoot().should('not.exist');

    cy.whitelistUser({ ico: currentUser.ico, userId: currentUser.id });
    paymentMethod.getRoot().should('be.visible');
  });
});
