import { testUserAddress } from '../../config';
import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { kycReviewAnnotation } from '../../objects/kyc/review-annotation';
import { paymentMethod } from '../../objects/payment-method';

describe('Internal KYC flow', () => {
  let currentIco = null;
  let currentUser = null;

  beforeEach(() => {
    cy.getInternalKycParams({
      fields: [
        {
          name: 'firstName',
          label: 'First name',
          type: 'STRING',
          required: true,
        },
        {
          name: 'lastName',
          label: 'Last name',
          type: 'STRING',
          required: true,
        },
        {
          name: 'terms',
          label: 'Agree with the terms and conditions',
          type: 'BOOLEAN',
          required: true,
        },
      ],
    })
      .then((kyc) => cy.createIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        currentIco = ico;
        cy.createUser({ ico }).then((user) => {
          currentUser = user;
          cy.login({ ico, email: user.email, password: user.password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should save KYC data, show review annotation and show payment methods after confirmation', () => {
    cy.fillUserData({ address: testUserAddress });
    extendedKycForm.getRoot().should('be.visible');
    extendedKycForm.getField({ name: 'firstName' }).type('Sarah');
    extendedKycForm.getField({ name: 'lastName' }).type('O’Connor');
    extendedKycForm.getCheckbox({ name: 'terms' }).click();
    extendedKycForm.getSubmit().click();
    kycReviewAnnotation.getRoot().should('be.visible');

    paymentMethod.getRoot().should('not.exist');
    cy.whitelistUser({ ico: currentIco, userId: currentUser.id });
    paymentMethod.getRoot().should('be.visible');
  });
});
