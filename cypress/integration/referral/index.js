import { config } from '../../config';
import { navigation } from '../../objects/navigation';
import { referralPage } from '../../objects/pages/referral';
import { paymentMethod } from '../../objects/payment-method';

const internalFields = [
  {
    name: 'firstName',
    label: 'First name',
    type: 'STRING',
    required: true,
  },
  {
    name: 'lastName',
    label: 'Last name',
    type: 'STRING',
    required: true,
  },
  {
    name: 'terms',
    label: 'Agree with the terms and conditions',
    type: 'BOOLEAN',
    required: true,
  },
];

function passKyc(user) {
  cy.fillUserData({ address: config.testUserAddress });
  cy.fillExtendedKycForm();
  cy.whitelistUser({ ico: user.ico, userId: user.id });

  paymentMethod.getRoot().should('be.visible');
}

describe('Referral', () => {
  let currentUser = null;

  beforeEach(() => {
    cy.createIco((data) => ({
      ...data,
      kyc: {
        provider: 'SELF_SERVICE',
      },
      sale: {
        ...data.sale,
        type: 'PUBLIC',
        publicSale: {
          ...(data.sale.publicSale || {}),
          referralBonus: {
            enabled: true,
          },
        },
      },
    }))
      .then((ico) =>
        cy
          .getInternalKycParams({
            fields: internalFields,
          })
          .then((params) =>
            cy
              .updateTokenKyc(ico.realmId, ico.adminData.token, params)
              .then(() => ico),
          ),
      )
      .then((ico) => cy.createUser({ ico }))
      .then((user) => {
        currentUser = user;

        cy.login({
          ico: currentUser.ico,
          email: currentUser.email,
          password: currentUser.password,
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
      passKyc(currentUser);

      navigation.getRoot().should('be.visible');
      navigation.getReferralLink().should('be.visible');

      referralPage.getRoot().should('not.exist');

      navigation.getReferralLink().click();

      referralPage.getRoot().should('be.visible');
    });
  });

  describe('ICO with KYC', () => {
    it('should show required KYC approval notification', () => {
      cy.visit(referralPage.getUrl());

      referralPage.getRoot().should('be.visible');
      referralPage.getRequiredKycNotification().should('be.visible');
      referralPage.getContent().should('not.exist');
    });

    it('should load and show link, statistics and referees after KYC approval', () => {
      passKyc(currentUser);

      cy.visit(referralPage.getUrl());

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
