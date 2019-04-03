import { userDataForm } from '../../../objects/kyc/user-data-form';

Cypress.Commands.add('fillSecurityUserData', ({ address }) => {
  userDataForm.getRoot().should('be.visible');
  userDataForm.getResidency().should('be.enabled');

  userDataForm.getAddress().clear();
  userDataForm
    .getAddress()
    .clear()
    .type(address);
  userDataForm
    .getConfirmationAddress()
    .clear()
    .type(address);
  userDataForm.getResidency().select('Canada');
  userDataForm.getSubmit().click();
});
