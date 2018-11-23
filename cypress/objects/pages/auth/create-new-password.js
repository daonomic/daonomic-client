import { getMarkerSelector } from '../../../support/get-marker-selector';

class CreateNewPasswordPage {
  getUrl = ({ token }) => `/#/sign/create-new-password/${token}`;
  marker = getMarkerSelector('create-new-password');

  getForm() {
    return cy.get(this.marker('form')());
  }

  getPassword() {
    return cy.get(this.marker('password')());
  }

  getPassword2() {
    return cy.get(this.marker('password2')());
  }

  getSubmitButton() {
    return cy.get(this.marker('submit')());
  }

  getSuccessMessage() {
    return cy.get(this.marker('success-message')());
  }

  getError() {
    return cy.get(this.marker('error')());
  }
}

export const createNewPasswordPage = new CreateNewPasswordPage();
