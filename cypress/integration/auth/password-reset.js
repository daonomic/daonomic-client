import { signInPage } from '../../objects/pages/auth/sign-in';
import { passwordResetPage } from '../../objects/pages/auth/password-reset';

describe('Password reset page', () => {
  it('should open password reset page from sign in page', () => {
    cy.visit(signInPage.getUrl());
    cy.initApplication();
    signInPage.getForm().should('be.visible');
    signInPage.getPasswordResetLink().click();
    passwordResetPage.getForm().should('be.visible');
  });

  it('should show error if trying to reset unknown user password', () => {
    cy.visit(passwordResetPage.getUrl());
    cy.initApplication();
    passwordResetPage
      .getEmail()
      .clear()
      .type('unknown@example.com');
    passwordResetPage.getSubmitButton().click();
    passwordResetPage.getError().should('be.visible');
  });

  it('should reset known user password', () => {
    cy.visit(passwordResetPage.getUrl());
    cy.initApplication();
    cy.getCurrentUser().then(({ email }) => {
      passwordResetPage
        .getEmail()
        .clear()
        .type(email);
      passwordResetPage.getSubmitButton().click();
      passwordResetPage.getSuccessMessage().should('be.visible');
    });
  });
});
