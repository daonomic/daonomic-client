import { signInPage } from '../../../objects/pages/auth/sign-in';
import { header } from '../../../objects/header';

Cypress.Commands.add('login', ({ getIco, email, password }) => {
  cy.visit(signInPage.getUrl());
  cy.initApplication({ getIco });
  signInPage.getForm().should('be.visible');
  signInPage.getEmail().type(email);
  signInPage.getPassword().type(password);
  signInPage.getSubmitButton().click();
  header.getRoot().should('be.visible');
});
