import { testUserAddress } from '../../config';
import { navigation } from '../../objects/navigation';
import { referralPage } from '../../objects/pages/referral';
import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { kycReviewAnnotation } from '../../objects/kyc/review-annotation';
import { paymentMethod } from '../../objects/payment-method';

describe('Referral', () => {
  let currentIco = null;
  let currentUser = null;

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
      .then((kyc) => cy.createIco((data) => ({ ...data, kyc })))
      .then((ico) => {
        currentIco = ico;
        cy.createUser({ ico }).then((user) => {
          currentUser = user;
          cy.login({ ico, email: user.email, password: user.password });
        });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  describe('Common cases', () => {
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
  });

  describe('ICO with KYC', () => {
    function passKyc() {
      cy.fillUserData({ address: testUserAddress });
      extendedKycForm.getRoot().should('be.visible');
      extendedKycForm.getCheckbox({ name: 'terms' }).click();
      extendedKycForm.getSubmit().click();
      kycReviewAnnotation.getRoot().should('be.visible');
      cy.whitelistUser({ ico: currentIco, userId: currentUser.id });
      paymentMethod.getRoot().should('be.visible');
    }

    it('should show required KYC passage notification', () => {
      cy.visit(referralPage.getUrl());
      referralPage.getRoot().should('be.visible');
      referralPage.getRequiredKycNotification().should('be.visible');
      referralPage.getContent().should('not.exist');
    });

    it('should load and show link, statistics and referees after KYC passage', () => {
      cy.server();
      cy.route('GET', '**/ref').as('referralStatisticsRequest');
      cy.route('POST', '**/ref/referees').as('refereesListRequest');

      passKyc();
      cy.visit(referralPage.getUrl());
      cy.wait('@referralStatisticsRequest');
      cy.wait('@refereesListRequest');

      referralPage.getRoot().should('be.visible');
      referralPage.getRequiredKycNotification().should('not.exist');
      referralPage.getContent().should('be.visible');

      referralPage.link.getRoot().should('be.visible');
      referralPage.getReferrals().should('be.visible');

      referralPage.statistics.getRoot().should('be.visible');
      referralPage.statistics.getUsers().should('be.visible');
      referralPage.statistics.getBonus().should('be.visible');
      referralPage.statistics.getSold().should('be.visible');
    });
  });

  describe('ICO without KYC', () => {});
});