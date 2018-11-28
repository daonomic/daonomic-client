import { userDataForm } from '../../../objects/kyc/user-data-form';

Cypress.Commands.add('fillUserData', ({ address }) => {
  userDataForm.getRoot().should('be.visible');

  userDataForm.getAddress().clear();
  userDataForm.getAddress().type(address);
  userDataForm.getConfirmationAddress().type(address);
  userDataForm.getSubmit().click();
});
