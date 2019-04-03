import { extendedKycForm } from '../../../objects/kyc/extended-kyc-form';

Cypress.Commands.add('fillExtendedKycForm', () => {
  extendedKycForm.getRoot().should('be.visible');

  extendedKycForm
    .getField({ name: 'firstName' })
    .clear()
    .type('Sarah');
  extendedKycForm
    .getField({ name: 'lastName' })
    .clear()
    .type('O’Connor');

  extendedKycForm.getCheckbox({ name: 'terms' }).click();
  extendedKycForm.getSubmit().click();
});
