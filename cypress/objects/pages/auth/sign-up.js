import { getMarkerSelector } from '../../../support/get-marker-selector';

class SignUpPage {
  marker = getMarkerSelector('sign-up');

  getUrl = () => '/#/sign/up';

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

  getSignInLink() {
    return cy.get(this.marker('sign-in-link')());
  }
}

export const signUpPage = new SignUpPage();
