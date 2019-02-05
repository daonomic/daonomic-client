import { passwordResetPage } from '../../objects/pages/auth/password-reset';
import { createNewPasswordPage } from '../../objects/pages/auth/create-new-password';

describe('Create new password page', () => {
  let token = null;

  before(() => {
    cy.getCurrentUser()
      .then(({ email }) => {
        cy.visit(passwordResetPage.getUrl());
        cy.initApplication();
        passwordResetPage.getEmail().type(email);
        passwordResetPage.getSubmitButton().click();
        passwordResetPage.getSuccessMessage().should('be.visible');

        return cy.getPasswordResetToken({ email });
      })
      .should('ok')
      .then((passwordResetToken) => {
        token = passwordResetToken;
      });
  });

  beforeEach(() => {
    cy.visit(createNewPasswordPage.getUrl({ token }));
    cy.initApplication();
  });

  it("should show error if passwords don't match", () => {
    createNewPasswordPage.getPassword().type('1');
    createNewPasswordPage.getPassword2().type('2');
    createNewPasswordPage.getSubmitButton().click();
    createNewPasswordPage.getError().should('be.visible');
  });

  it('should show success message after submitting valid passwords', () => {
    cy.getCurrentUser().then(({ password }) => {
      createNewPasswordPage.getPassword().type(password);
      createNewPasswordPage.getPassword2().type(password);
      createNewPasswordPage.getSubmitButton().click();
      createNewPasswordPage.getSuccessMessage().should('be.visible');
    });
  });
});
