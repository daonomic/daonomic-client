import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import { balanceOverview } from '../../objects/balanceOverview';
import { kycView } from '../../objects/kyc';
import { transactions } from '../../objects/transactions';

describe('No public sale', () => {
  beforeEach(() => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/config',
      delay: 500,
      status: 200,
      response: 'fixture:api/config/no-sale.json',
    }).as('configRequest');

    cy.createUser().then(({ email, password }) => {
      cy.login({ email, password });
    });
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should allow passing KYC, but should not show payment and token price widgets after approval', () => {
    tokenPrice.getRoot().should('not.exist');
    transactions.getRoot().should('not.exist');
    userDataForm.getRoot().should('be.visible');
    balance.getRoot().should('be.visible');

    cy.fillUserData({ address: testUserAddress });

    userDataForm.getRoot().should('not.exist');
    paymentMethod.getRoot().should('not.exist');
    tokenPrice.getRoot().should('not.exist');
    kycView.getAllowedAnnotation().should('be.visible');
    balance.getRoot().should('be.visible');
    transactions.getRoot().should('be.visible');

    balance.getAmount().should('be.visible');
    balanceOverview.getRoot().should('not.be.visible');
  });

  it('Should display balance with locked', () => {
    cy.server();

    const balanceResponse = {
      balance: 100,
      totalReceived: 100,
      locks: [
        {
          address: 'very long long long address',
          balance: {
            total: 25000,
            released: 15000,
            vested: 20000,
          },
          unlockEvents: [
            {
              date: Date.now() + 5000,
              amount: 1000,
            },
            {
              date: Date.now() + 86405000,
              amount: 1500,
            },
            {
              date: Date.now() + 10000,
              amount: 1000,
            },
          ],
        },
        {
          address: 'very long long long address',
          balance: {
            total: 20000,
            released: 5000,
            vested: 6000,
          },
          unlockEvents: [
            {
              date: Date.now() + 6000,
              amount: 1000,
            },
            {
              date: Date.now() + 10000,
              amount: 1000,
            },
            {
              date: Date.now() + 7000,
              amount: 1000,
            },
          ],
        },
      ],
    };

    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: balanceResponse,
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('be.visible');
    balance
      .getLockedBalance()
      .should('have.attr', 'data-raw-value')
      .and('equal', '25000');
    balance.getAmount().should('be.visible');
    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(balanceResponse.balance));
  });

  it('Should display balance without locked', () => {
    cy.fillUserData({ address: testUserAddress });

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('not.be.visible');
    balance.getAmount().should('be.visible');

    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', '0');
  });

  it.only('Should display balance overview with unlock events', () => {
    const day = 1000 * 60 * 60 * 24;
    const nextUnlockEventTimestamp = Date.now() + day + 6000;

    const balanceResponse = {
      balance: 100,
      totalReceived: 100,
      locks: [
        {
          address: 'very long long long address',
          balance: {
            total: 25000,
            released: 15000,
            vested: 20000,
          },
          unlockEvents: [
            {
              date: nextUnlockEventTimestamp,
              amount: 1000,
            },
            {
              date: Date.now() + day + 7000,
              amount: 1500,
            },
            {
              date: Date.now() + day + 8000,
              amount: 1000,
            },
          ],
        },
        {
          address: 'very long long long address',
          balance: {
            total: 20000,
            released: 5000,
            vested: 6000,
          },
          unlockEvents: [
            {
              date: Date.now() + day + 9000,
              amount: 1000,
            },
            {
              date: Date.now() + day + 10000,
              amount: 1000,
            },
            {
              date: Date.now() + day + 11000,
              amount: 1000,
            },
          ],
        },
      ],
    };

    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: balanceResponse,
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balanceOverview.getRoot().should('be.visible');

    balanceOverview.getTotalReceived().should('be.visible');
    balanceOverview
      .getTotalReceived()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(balanceResponse.totalReceived));

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getAvailable().should('be.visible');

    balanceOverview
      .getAvailable()
      .should('have.attr', 'data-raw-value')
      .and('equal', '6000');

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getNextUnlockDate().should('be.visible');
    balanceOverview.getNextUnlockDate().should('contain', '1 day');
    balanceOverview
      .getNextUnlockDate()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(nextUnlockEventTimestamp));

    balanceOverview.getRefreshNotification().should('not.be.visible');
    balanceOverview.getUnlocksTable().should('be.visible');
    balanceOverview.getCountdownDays().should('be.visible');
    balanceOverview.getCountdown().should('not.be.visible');

    balanceOverview
      .getUnlocksTable()
      .find('tbody tr')
      .should('have.length', 6);

    cy.wait(5000).then(() => {
      balanceOverview.getNextUnlockDate().should('not.to.contain', '1 day');
      balanceOverview.getCountdownDays().should('not.be.visible');
      balanceOverview.getCountdown().should('be.visible');

      const closestEvent = Date.now() + 1000 * 5;

      cy.route({
        method: 'GET',
        url: '**/balance',
        delay: 500,
        status: 200,
        response: {
          balance: 100,
          totalReceived: 100,
          locks: [
            {
              address: 'very long long long address',
              balance: {
                total: 25000,
                released: 15000,
                vested: 20000,
              },
              unlockEvents: [
                {
                  date: Date.now() + day + 7000,
                  amount: 1234,
                },
                {
                  date: closestEvent,
                  amount: 1500,
                },
                {
                  date: Date.now() + day + 8000,
                  amount: 1200,
                },
              ],
            },
            {
              address: 'very long long long address',
              balance: {
                total: 20000,
                released: 5000,
                vested: 6000,
              },
              unlockEvents: [
                {
                  date: Date.now() + day + 9000,
                  amount: 1300,
                },
                {
                  date: Date.now() + day + 10000,
                  amount: 1400,
                },
                {
                  date: Date.now() + day + 11000,
                  amount: 1500,
                },
              ],
            },
          ],
        },
      }).as('nextBalanceRequest');

      cy.wait('@nextBalanceRequest');

      balanceOverview.getRoot().should('be.visible');

      balanceOverview.getWithdrawButton().should('be.visible');
      balanceOverview
        .getNextUnlockDate()
        .should('have.attr', 'data-raw-value')
        .and('equal', String(closestEvent));

      balanceOverview.getNextUnlockDate().should('be.visible');

      balanceOverview.getRefreshNotification().should('be.visible');
    });
  });
});
