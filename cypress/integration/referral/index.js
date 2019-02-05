import { testUserAddress } from '../../config';
import { navigation } from '../../objects/navigation';
import { referralPage } from '../../objects/pages/referral';
import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { kycReviewAnnotation } from '../../objects/kyc/review-annotation';
import { paymentMethod } from '../../objects/payment-method';
import { balance } from '../../objects/balance';
import wallet from '../../support/web3-mock/wallet';
import { signUpPage } from '../../objects/pages/auth/sign-up';
import { signInPage } from '../../objects/pages/auth/sign-in';
import { header } from '../../objects/header';

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
        return cy.createUser({ ico });
      })
      .then((user) => {
        currentUser = user;
      });
  });

  afterEach(() => {
    cy.logout();
  });

  describe.skip('Common cases', () => {
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
    function passKyc({ userAddress, userId }) {
      cy.fillUserData({ address: userAddress });
      extendedKycForm.getRoot().should('be.visible');
      extendedKycForm.getCheckbox({ name: 'terms' }).click();
      extendedKycForm.getSubmit().click();
      kycReviewAnnotation.getRoot().should('be.visible');
      cy.whitelistUser({ ico: currentIco, userId });
      paymentMethod.getRoot().should('be.visible');
    }

    it.skip('should show required KYC passage notification', () => {
      loginAsCurrentUser();

      cy.visit(referralPage.getUrl());
      referralPage.getRoot().should('be.visible');
      referralPage.getRequiredKycNotification().should('be.visible');
      referralPage.getContent().should('not.exist');
    });

    it('should load and show link, statistics and referees after KYC passage', () => {
      cy.server();
      cy.route('GET', '**/ref').as('referralStatisticsRequest');
      cy.route('POST', '**/ref/referees').as('refereesListRequest');

      loginAsCurrentUser();

      passKyc({ userAddress: testUserAddress, userId: currentUser.id });
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

    it('should apply referral and referee bonuses', () => {
      cy.clearCookies();
      loginAsCurrentUser();
      cy.visit(referralPage.getUrl());
      referralPage.getRoot().should('be.visible');
      referralPage.link.getRoot().should('be.visible');

      referralPage.link.getRoot().should('be.visible');
      referralPage.link.getInput().then((input) => {
        const link = input.val();

        cy.logout();
        cy.visit(link);
        cy.visit(signUpPage.getUrl());
        const testEmail = faker.internet.email();

        signUpPage.getEmail().type(testEmail);
        signUpPage.getSubmitButton().click();
        signUpPage.getSuccessMessage().should('be.visible');

        cy.getRegisteredUserPassword({ email: testEmail }).then((password) => {
          cy.visit(signInPage.getUrl());
          signInPage.getForm().should('be.visible');
          signInPage.getEmail().type(testEmail);
          signInPage.getPassword().type(password);
          signInPage.getSubmitButton().click();
          header.getRoot().should('be.visible');

          passKyc({ userAddress: wallet.getAddressString(), userId: user.id });

          balance.getRoot().should('be.visible');
          balance.getAmount().should('have.text', '0');

          paymentMethod.exchangeForm.getRoot().should('be.visible');
          paymentMethod.exchangeForm.getAmount().type(1);
          paymentMethod.exchangeForm.getBuy().click();
          balance.getAmount().should('have.text', '1');

          cy.logout();
          loginAsCurrentUser();
          balance.getRoot().should('be.visible');
          balance.getAmount().should('have.text', 1 * 0.1);
          cy.visit(referralPage.getUrl());
          referralPage.getRoot().should('be.visible');
        });
      });
    });
  });

  describe('ICO without KYC', () => {});
});
