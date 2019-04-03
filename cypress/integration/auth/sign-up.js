import { signInPage } from '../../objects/pages/auth/sign-in';
import { signUpPage } from '../../objects/pages/auth/sign-up';

describe('Sign up page', () => {
  beforeEach(() => {
    cy.visit(signUpPage.getUrl());
    cy.initApplication();
  });

  it('should have working link to sign in page', () => {
    signUpPage.getForm().should('be.visible');
    signUpPage.getSignInLink().click();
    signInPage.getForm().should('be.visible');
  });

  it('should not sign up with already used email', () => {
    cy.getCurrentUser().then(({ email }) => {
      signUpPage
        .getEmail()
        .clear()
        .type(email);
      signUpPage.getSubmitButton().click();
      signUpPage.getError().should('contain', 'Email is occupied');
    });
  });

  it('should sign up with new email and prefill registered email on sign in page', () => {
    const testEmail = 'test@example.com';

    signUpPage
      .getEmail()
      .clear()
      .type(testEmail);
    signUpPage.getSubmitButton().click();
    signUpPage.getSuccessMessage().should('be.visible');

    signUpPage.getSignInLink().click();
    signInPage.getEmail().should('have.value', testEmail);
  });
});
