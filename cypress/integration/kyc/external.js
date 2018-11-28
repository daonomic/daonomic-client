import { testKycProviderUrl } from '../../config';
import { externalKyc } from '../../objects/kyc/external-kyc';

describe('External KYC flow', () => {
  beforeEach(() => {
    cy.createExternalKycProvider({
      jurisdiction: 'OTHER',
    })
      .then(({ id: providerAddress }) =>
        cy.getExternalKycParams({ providerAddress }),
      )
      .then((kyc) => cy.getTemporaryIco({ kyc }))
      .then((ico) => {
        const getIco = () => cy.wrap(ico);

        cy.getTemporaryUser({ getIco }).then(({ email, password }) => {
          cy.login({ getIco, email, password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should show external kyc link', () => {
    const testAddress = `0x${'0'.repeat(40)}`;

    cy.fillSecurityUserData({ address: testAddress });
    externalKyc.getRoot().should('be.visible');
    externalKyc.getLink().then(($el) => {
      cy.wrap($el.attr('href').startsWith(testKycProviderUrl)).should(
        'be',
        true,
      );
    });
  });
});
