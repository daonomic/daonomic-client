import { navigation } from '../../objects/navigation';
import { referralPage } from '../../objects/pages/referral';

describe('Referral', () => {
  beforeEach(() => {
    cy.getInternalKycParams({
      fields: [
        {
          name: 'terms',
          label: 'Agree with the terms and conditions',
          type: 'BOOLEAN',
          required: true,
        },
      ],
    })
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

  it('should open referral page directly', () => {
    cy.visit(referralPage.getUrl());
    referralPage.getRoot().should('be.visible');
  });

  it('should open referral page by clicking navigation link', () => {
    navigation.getRoot().should('be.visible');
    navigation.getReferralLink().should('be.visible');
    referralPage.getRoot().should('not.exist');

    navigation.getReferralLink().click();
    referralPage.getRoot().should('be.visible');
  });

  it.skip('should contain referral link, statistics and referrals list', () => {
    cy.visit(referralPage.getUrl());

    referralPage.getRoot().should('be.visible');
    referralPage.getReferrals().should('be.visible');
    referralPage.link.getRoot().should('be.visible');

    referralPage.statistics.getRoot().should('be.visible');
    referralPage.statistics.getUsers().should('be.visible');
    referralPage.statistics.getBonus().should('be.visible');
    referralPage.statistics.getSold().should('be.visible');
  });
});
