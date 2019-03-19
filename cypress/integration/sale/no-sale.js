import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import { balanceOverview } from '../../objects/balanceOverview';
import { kycView } from '../../objects/kyc';
import { transactions } from '../../objects/transactions';

function multiplyUnlockEvent(unlockEvent, multiplier) {
  return {
    date: unlockEvent.date * multiplier,
    amount: unlockEvent.amount * multiplier,
  };
}

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

  it('Should display wallet balance and locked tokens balance', () => {
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

  it('Should display wallet balance without locked tokens balance', () => {
    cy.fillUserData({ address: testUserAddress });

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('not.be.visible');
    balance.getAmount().should('be.visible');

    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', '0');
  });

  it('Should display balance overview with unlock events', () => {
    const day = 1000 * 60 * 60 * 24;
    const nextUnlockEvent = {
      date: Date.now() + day + 6000,
      amount: 1000,
    };
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
            nextUnlockEvent,
            multiplyUnlockEvent(nextUnlockEvent, 2),
            multiplyUnlockEvent(nextUnlockEvent, 3),
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
            multiplyUnlockEvent(nextUnlockEvent, 4),
            multiplyUnlockEvent(nextUnlockEvent, 5),
            multiplyUnlockEvent(nextUnlockEvent, 6),
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

    balanceOverview
      .getNextUnlockDate()
      .should('be.visible')
      .should('contain', '1 day')
      .should('have.attr', 'data-raw-value')
      .and('equal', String(nextUnlockEvent.date));
    balanceOverview
      .getNextUnlockAmount()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', String(nextUnlockEvent.amount));

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

      const nextUnlockEvent2 = {
        date: Date.now() + 1000 * 5,
        amount: 2000,
      };

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
                multiplyUnlockEvent(nextUnlockEvent2, 2),
                nextUnlockEvent2,
                multiplyUnlockEvent(nextUnlockEvent2, 3),
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
                multiplyUnlockEvent(nextUnlockEvent2, 4),
                multiplyUnlockEvent(nextUnlockEvent2, 5),
                multiplyUnlockEvent(nextUnlockEvent2, 6),
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
        .should('be.visible')
        .should('have.attr', 'data-raw-value')
        .and('equal', String(nextUnlockEvent2.date));
      balanceOverview
        .getNextUnlockAmount()
        .should('be.visible')
        .should('have.attr', 'data-raw-value')
        .and('equal', String(nextUnlockEvent2.amount));

      balanceOverview.getRefreshNotification().should('be.visible');
    });
  });
});
