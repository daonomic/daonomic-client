import { testKycProviderUrl, testUserAddress } from '../../config';
import { externalKyc } from '../../objects/kyc/external-kyc';

describe('External KYC flow', () => {
  beforeEach(() => {
    cy.createExternalKycProvider({
      jurisdiction: 'OTHER',
    })
      .then(({ id: providerAddress }) =>
        cy.getExternalKycParams({ providerAddress }),
      )
      .then((kyc) => cy.getTemporaryIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        cy.getTemporaryUser({ ico }).then(({ email, password }) => {
          cy.login({ ico, email, password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should show external kyc link', () => {
    cy.fillSecurityUserData({ address: testUserAddress });
    externalKyc.getRoot().should('be.visible');
    externalKyc.getLink().then(($el) => {
      cy.wrap($el.attr('href').startsWith(testKycProviderUrl)).should(
        'be',
        true,
      );
    });
  });
});
