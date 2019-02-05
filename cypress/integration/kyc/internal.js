import { testUserAddress } from '../../config';
import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { kycReviewAnnotation } from '../../objects/kyc/review-annotation';

describe('Internal KYC flow', () => {
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
      .then((kyc) => cy.getTemporaryIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        cy.getTemporaryUser({ ico }).then(({ email, password }) => {
          cy.login({ ico, email, password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should save KYC data and show review annotation', () => {
    cy.fillUserData({ address: testUserAddress });
    extendedKycForm.getRoot().should('be.visible');
    extendedKycForm.getField({ name: 'firstName' }).type('Sarah');
    extendedKycForm.getField({ name: 'lastName' }).type('O’Connor');
    extendedKycForm.getCheckbox({ name: 'terms' }).click();
    extendedKycForm.getSubmit().click();
    kycReviewAnnotation.getRoot().should('be.visible');
  });
});
