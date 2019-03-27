import { testUserAddress } from '../../config';
import { balance } from '../../objects/balance';
import { balanceOverview } from '../../objects/balanceOverview';
import { transactions } from '../../objects/transactions';
import { createFloatingPool } from '../../support/creators/create-floating-pool';
import wallet from '../../support/web3-mock/wallet';

describe('Workflow with balance locks', () => {
  afterEach(() => {
    cy.logout();
  });

  it('Should display wallet balance without locked tokens balance', () => {
    cy.createInvestor().then(({ email, password }) => {
      cy.login({ email, password });
    });

    cy.fillUserData({ address: testUserAddress });

    balance.getRoot().should('be.visible');
    balance.getLockedBalance().should('not.be.visible');
    balance.getAmount().should('be.visible');

    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', '0');

    balanceOverview.getRoot().should('not.be.visible');
  });

  it('Should display wallet balance and locked tokens balance', () => {
    const primaryStartInverval = 3;
    const usableWalletAddress = wallet.getAddressString();
    const immediatePoolName = 'Immediate Pool';
    const notImmediatePoolName = 'Not immediate Pool';

    const pools = [
      createFloatingPool({
        name: immediatePoolName,
        amount: 50000,
        startInterval: 0,
      }),
      createFloatingPool({
        name: notImmediatePoolName,
        amount: 70000,
        startInterval: primaryStartInverval,
      }),
    ];

    cy.createIco((data) => ({
      ...data,
      token: {
        ...data.token,
        pools,
      },
    }))
      .then((ico) =>
        cy
          .createHolder(ico.realmId, ico.adminData.token, {
            address: usableWalletAddress,
            amount: 3000,
            name: immediatePoolName,
          })
          .then(() => ico),
      )
      .then((ico) =>
        cy
          .createHolder(ico.realmId, ico.adminData.token, {
            address: usableWalletAddress,
            amount: 6000,
            name: notImmediatePoolName,
          })
          .then(() => ico),
      )
      .then((ico) =>
        cy.createInvestor({ ico }).then(({ email, password }) => {
          cy.login({ ico, email, password });
          cy.fillUserData({ address: usableWalletAddress });
        }),
      );

    balance.getRoot().should('be.visible');

    balance
      .getLockedBalance()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', '9000');

    balance
      .getAmount()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', '0');

    balanceOverview.getRoot().should('be.visible');

    balanceOverview
      .getTotalReceived()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', '9000');

    balanceOverview
      .getAvailable()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', '3000');

    balanceOverview
      .getNextUnlockDate()
      .should('be.visible')
      .should('contain', `${primaryStartInverval - 1} days`);

    balanceOverview
      .getNextUnlockAmount()
      .should('be.visible')
      .should('have.attr', 'data-raw-value')
      .and('equal', '6000');

    balanceOverview.getWithdrawButton().should('be.visible');
    balanceOverview.getRefreshNotification().should('not.be.visible');
    balanceOverview.getUnlocksTable().should('be.visible');
    balanceOverview.getCountdownDays().should('be.visible');
    balanceOverview.getCountdown().should('not.be.visible');

    balanceOverview
      .getUnlocksTable()
      .find('tbody tr')
      .should('have.length', 1);

    balanceOverview.getWithdrawButton().click();

    balance
      .getAmount()
      .should('have.attr', 'data-raw-value')
      .and('equal', '3000');

    balanceOverview
      .getAvailable()
      .should('have.attr', 'data-raw-value')
      .and('equal', '0');

    transactions
      .getRoot()
      .find('tbody tr')
      .should('have.length', 3);
  });
});
