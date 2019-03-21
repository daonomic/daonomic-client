import { testUserAddress } from '../../config';
import { navigation } from '../../objects/navigation';
import { referralPage } from '../../objects/pages/referral';
import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { kycView } from '../../objects/kyc';
import { paymentMethod } from '../../objects/payment-method';

describe('Referral', () => {
  let currentIco = null;
  let currentUser = null;

  function loginAsCurrentUser() {
    cy.login({
      ico: currentIco,
      email: currentUser.email,
      password: currentUser.password,
    });
  }

  beforeEach(() => {
    if (currentIco && currentUser) {
      return;
    }

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
        return cy.createInvestor({ ico });
      })
      .then((user) => {
        currentUser = user;
      });
  });

  afterEach(() => {
    cy.logout();
  });

  describe('Common cases', () => {
    it('should open referral page directly', () => {
      loginAsCurrentUser();
      cy.visit(referralPage.getUrl());
      referralPage.getRoot().should('be.visible');
    });

    it('should open referral page by clicking navigation link', () => {
      loginAsCurrentUser();
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
      kycView.getReviewAnnotation().should('be.visible');
      cy.whitelistUser({ ico: currentIco, userId: currentUser.id });
      paymentMethod.getRoot().should('be.visible');
    }

    it('should show required KYC approval notification', () => {
      loginAsCurrentUser();

      cy.visit(referralPage.getUrl());
      referralPage.getRoot().should('be.visible');
      referralPage.getRequiredKycNotification().should('be.visible');
      referralPage.getContent().should('not.exist');
    });

    it('should load and show link, statistics and referees after KYC approval', () => {
      cy.server();
      cy.route('GET', '**/ref').as('referralStatisticsRequest');
      cy.route('POST', '**/ref/referees').as('refereesListRequest');

      loginAsCurrentUser();

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
