import { testKycProviderUrl, testUserAddress } from '../../config';
import { externalKyc } from '../../objects/kyc/external-kyc';
import { navigation } from '../../objects/navigation';

describe.skip('External KYC flow', () => {
  beforeEach(() => {
    cy.createExternalKycProvider({
      jurisdiction: 'OTHER',
    })
      .then(({ id: providerAddress }) =>
        cy.getExternalKycParams({ providerAddress }),
      )
      .then((kyc) => cy.createIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        cy.createUser({ ico }).then(({ email, password }) => {
          cy.login({ ico, email, password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('should show external kyc link and hide wallet creation page', () => {
    navigation.getCreateWalletLink().should('be.visible');

    cy.fillSecurityUserData({ address: testUserAddress });

    navigation.getCreateWalletLink().should('not.exist');
    externalKyc.getRoot().should('be.visible');
    externalKyc.getLink().then(($el) => {
      cy.wrap($el.attr('href').startsWith(testKycProviderUrl)).should(
        'be',
        true,
      );
    });
  });
});
