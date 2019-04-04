import { testUserAddress } from '../../config';
import { userDataForm } from '../../objects/kyc/user-data-form';
import { paymentMethod } from '../../objects/payment-method';
// import { extendedKycForm } from '../../objects/kyc/extended-kyc-form';
import { tokenPrice } from '../../objects/token-price';
import { balance } from '../../objects/balance';
import { balanceOverview } from '../../objects/balanceOverview';
import { kycView } from '../../objects/kyc';
import { transactions } from '../../objects/transactions';

function getDateWithOffset(offset) {
  return new Date(new Date().getTime() + offset).toISOString();
}

describe('No public sale', () => {
  let currentUser = null;
  let pools = [];

  const simpleInternalFields = [
    {
      name: 'terms',
      label: 'Agree with the terms and conditions',
      type: 'BOOLEAN',
      required: true,
    },
  ];

  beforeEach(() => {
    pools.push({
      name: 'Private Sale 01',
      startType: 'FIXED',
      amount: 25000,
      start: getDateWithOffset(15000),
    });

    pools.push({
      name: 'Private Sale 02',
      startType: 'FIXED',
      amount: 25000,
      start: getDateWithOffset(86815000),
    });

    cy.createIco((data) => ({
      ...data,
      kyc: {
        provider: 'SELF_SERVICE',
      },
      pools: {
        pools,
      },
      sale: {
        type: 'PRIVATE',
      },
    }))
      .then((ico) =>
        cy
          .getInternalKycParams({
            fields: simpleInternalFields,
          })
          .then((internalParams) =>
            cy
              .updateTokenKyc(ico.realmId, ico.adminData.token, internalParams)
              .then(() => ico),
          ),
      )
      .then((ico) => {
        cy.createUser({ ico }).then((user) => {
          currentUser = user;

          cy.login({
            ico: user.ico,
            email: user.email,
            password: user.password,
          });
        });
      })
      .then(() => {
        cy.fillUserData({ address: testUserAddress });
      });
  });

  afterEach(() => {
    cy.logout();
  });

  it('Should not show payment and token price widgets after login', () => {
    tokenPrice.getRoot().should('not.exist');
    transactions.getRoot().should('not.exist');
    userDataForm.getRoot().should('be.visible');
    balance.getRoot().should('be.visible');

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
    const holders = [
      {
        name: pools[0].name,
        address: testUserAddress,
        amount: 1000,
      },
      {
        name: pools[1].name,
        address: testUserAddress,
        amount: 1500,
      },
    ];

    Promise.all(
      holders.map((holder) => cy.createHolder(currentUser.ico, holder)),
    );

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('be.visible');
    balance
      .getLockedBalance()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(holders[0].amount + holders[1].amount));
    balance.getAmount().should('be.visible');
    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(0));
  });

  it('Should display wallet balance without locked tokens balance', () => {
    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('not.be.visible');
    balance.getAmount().should('be.visible');

    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(0));
  });

  it('Should display balance overview with unlock events', () => {
    const holders = [
      {
        name: pools[0].name,
        address: testUserAddress,
        amount: 1000,
      },
      {
        name: pools[1].name,
        address: testUserAddress,
        amount: 1500,
      },
    ];

    Promise.all(
      holders.map((holder) => cy.createHolder(currentUser.ico, holder)),
    );

    balanceOverview.getRoot().should('be.visible');

    balanceOverview.getTotalReceived().should('be.visible');
    balanceOverview
      .getTotalReceived()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(holders[0].amount + holders[1].amount));

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getAvailable().should('be.visible');

    balanceOverview
      .getUnlocksTable()
      .find('tbody tr')
      .should('have.length', 2);

    balanceOverview
      .getAvailable()
      .should('have.attr', 'data-raw-value')
      .and('equal', String(0));

    balanceOverview.getWithdrawButton().should('be.visible');

    balanceOverview.getNextUnlockDate().should('be.visible');
    balanceOverview.getRefreshNotification().should('not.be.visible');

    balanceOverview
      .getNextUnlockAmount()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', String(holders[0].amount));

    balanceOverview.getRefreshNotification().should('be.visible');

    balanceOverview
      .getNextUnlockAmount()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', String(holders[1].amount));

    balanceOverview.getNextUnlockDate().should('to.contain', '1 day');

    balanceOverview.getRefreshNotification().should('not.be.visible');
    balanceOverview.getUnlocksTable().should('be.visible');
    balanceOverview.getCountdownDays().should('be.visible');
    balanceOverview.getCountdown().should('not.be.visible');

    balanceOverview
      .getUnlocksTable()
      .find('tbody tr')
      .should('have.length', 1);

    balanceOverview.getWithdrawButton().should('be.visible');
  });
});
