import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import userBalanceWithLocks from '../../fixtures/api/balance/user-balance-with-locks.json';
import { balanceOverview } from '../../objects/balanceOverview';
import { kycView } from '../../objects/kyc';
import { transactions } from '../../objects/transactions';

const modifyWalletMockWithActualUnlockDate = (walletState, inc) => {
  const requiredDate = Date.now() + inc;

  const locks = walletState.locks;

  locks[0].unlockEvents[0].date = requiredDate;

  return {
    ...walletState,
    locks,
  };
};

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
    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: 'fixture:api/balance/user-balance-without-locks.json',
    }).as('balanceRequest');

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
    balance.getAmount().should('have.text', '100');
    balanceOverview.getRoot().should('not.be.visible');
  });

  it('Should allow passing KYC and display balance with locked', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: 'fixture:api/balance/user-balance-with-locks.json',
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('be.visible');
    balance.getLockedBalance().should('have.text', '25,000');
    balance.getAmount().should('be.visible');
    balance.getAmount().should('have.text', '100');
  });

  it('Should display balance without locked', () => {
    cy.server();
    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: 'fixture:api/balance/user-balance-without-locks.json',
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('not.be.visible');
    balance.getAmount().should('be.visible');
    balance.getAmount().should('have.text', '100');
  });

  it('Should display balance overview with unlock events', () => {
    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: modifyWalletMockWithActualUnlockDate(
        userBalanceWithLocks,
        86405000,
      ),
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balanceOverview.getRoot().should('be.visible');

    balanceOverview.getTotalReceived().should('be.visible');
    balanceOverview.getTotalReceived().should('to.contain', '100');

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getAvailable().should('be.visible');
    balanceOverview.getAvailable().should('to.contain', '6,000');

    /**
     * @todo create tests for withdrawing
     */
    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getNextUnlockDate().should('be.visible');
    balanceOverview.getNextUnlockDate().should('to.contain', '1 days');

    balanceOverview.getRefreshNotification().should('not.be.visible');
    balanceOverview.getUnlocksTable().should('be.visible');

    // 7 because of header row

    balanceOverview
      .getUnlocksTable()
      .find('tr')
      .should('to.have.length', 7);

    cy.wait(3000);

    balanceOverview.getNextUnlockDate().should('not.to.contain', '1 days');

    // balanceOverview.getAmount().should('have.text', '100');
  });

  it('Should display balance and wait for countdown', () => {
    cy.route({
      method: 'GET',
      url: '**/balance',
      delay: 500,
      status: 200,
      response: modifyWalletMockWithActualUnlockDate(
        userBalanceWithLocks,
        6000,
      ),
    }).as('balanceRequest');

    cy.fillUserData({ address: testUserAddress });

    cy.wait('@balanceRequest');

    balanceOverview.getRoot().should('be.visible');

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getNextUnlockDate().should('be.visible');
    balanceOverview.getRefreshNotification().should('not.be.visible');

    cy.wait(3000);

    balanceOverview.getRefreshNotification().should('be.visible');
  });
});
