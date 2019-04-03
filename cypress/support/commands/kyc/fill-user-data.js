import { userDataForm } from '../../../objects/kyc/user-data-form';

Cypress.Commands.add('fillUserData', ({ address }) => {
  userDataForm.getRoot().should('be.visible');

  userDataForm
    .getAddress()
    .clear()
    .type(address);
  userDataForm
    .getConfirmationAddress()
    .clear()
    .type(address);
  userDataForm.getSubmit().click();
});
