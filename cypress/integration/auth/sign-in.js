import { signInPage } from '../../objects/pages/auth/sign-in';
import { signUpPage } from '../../objects/pages/auth/sign-up';
import { header } from '../../objects/header';

describe('Sign in page', () => {
  beforeEach(() => {
    cy.visit(signInPage.getUrl());
    cy.initApplication();
  });

  it('should have working link to sign up page', () => {
    signInPage.getForm().should('be.visible');
    signInPage.getSignUpLink().click();
    signUpPage.getForm().should('be.visible');
  });

  it('should not login with invalid credentials', () => {
    signInPage
      .getEmail()
      .clear()
      .type('example@example.com');
    signInPage
      .getPassword()
      .clear()
      .type('1234567890');
    signInPage.getSubmitButton().click();
    signInPage.getError().should('contain', 'Invalid Credentials');
  });

  it('should login with valid credentials', () => {
    cy.getCurrentUser().then(({ email, password }) => {
      signInPage
        .getEmail()
        .clear()
        .type(email);
      signInPage
        .getPassword()
        .clear()
        .type(password);
      signInPage.getSubmitButton().click();
      header.getRoot().should('be.visible');
      header.getLogoutButton().click();
    });
  });
});
