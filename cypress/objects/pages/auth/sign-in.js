import { getMarkerSelector } from '../../../support/get-marker-selector';

class SignInPage {
  marker = getMarkerSelector('sign-in');

  getUrl = () => '/#/sign/in';

  getForm = () => cy.get(this.marker('form')());

  getEmail = () => cy.get(this.marker('email')());

  getPassword = () => cy.get(this.marker('password')());

  getPasswordResetLink = () => cy.get(this.marker('reset-password')());

  getSignUpLink = () => cy.get(this.marker('sign-up-link')());

  getSubmitButton = () => cy.get(this.marker('submit')());

  getError = () => cy.get(this.marker('error')());
}

export const signInPage = new SignInPage();
