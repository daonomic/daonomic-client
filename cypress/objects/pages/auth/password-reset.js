import { getMarkerSelector } from '../../../support/get-marker-selector';

class PasswordResetPage {
  marker = getMarkerSelector('reset-password');

  getUrl = () => '/#/sign/reset-password';

  getForm() {
    return cy.get(this.marker('form')());
  }

  getEmail() {
    return cy.get(this.marker('email')());
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

export const passwordResetPage = new PasswordResetPage();
