import { testUserAddress } from '../../config';
import { sumAndSubstanceKycForm } from '../../objects/kyc/sum-and-substance-form';

describe('Sum & Substance KYC flow', () => {
  beforeEach(() => {
    cy.getSumAndSubstanceKycParams()
      .then((kyc) => cy.createIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        return cy.createUser({ ico }).then((user) => {
          cy.login({ ico, email: user.email, password: user.password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should show Sum & Substance integration widget', () => {
    cy.fillUserData({ address: testUserAddress });
    sumAndSubstanceKycForm.getRoot().should('be.visible');
    sumAndSubstanceKycForm.getError().should('not.exist');
    sumAndSubstanceKycForm.getIframe().should('be.visible');
  });
});
