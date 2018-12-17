import { assoc } from 'ramda';
import { salePeriodGuard } from '../../objects/sale-period-guard';
import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

describe('Sale period', () => {
  afterEach(() => {
    cy.logout();
  });

  it('Should show countdown timer if sale has not started yet', () => {
    const hour = 1000 * 60 * 60;
    const start = Date.now() + hour / 2;
    const end = start + hour;
    const salePeriod = { start, end };

    cy.getTemporaryIco((data) => ({
      ...data,
      sale: assoc('period', salePeriod, data.sale),
    })).then((ico) => {
      cy.getTemporaryUser({ ico })
        .then(({ email, password }) => cy.login({ ico, email, password }))
        .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
    });

    salePeriodGuard.getRoot().should('be.visible');
    salePeriodGuard.getCountdownTimer().should('be.visible');
    paymentMethod.getRoot().should('not.exist');
  });

  it('Should show finished sale notification sale has been finished', () => {
    const hour = 1000 * 60 * 60;
    const start = Date.now() - hour;
    const end = start + hour / 2;
    const salePeriod = { start, end };

    cy.getTemporaryIco((data) => ({
      ...data,
      sale: assoc('period', salePeriod, data.sale),
    })).then((ico) => {
      cy.getTemporaryUser({ ico })
        .then(({ email, password }) => cy.login({ ico, email, password }))
        .then(() => cy.fillUserData({ address: wallet.getAddressString() }));
    });

    salePeriodGuard.getRoot().should('be.visible');
    salePeriodGuard.getFinishNotification().should('be.visible');
    paymentMethod.getRoot().should('not.exist');
  });

  it('Should show payment method if sale is active', () => {
    cy.getTemporaryUser()
      .then(({ email, password }) => cy.login({ email, password }))
      .then(() => cy.fillUserData({ address: wallet.getAddressString() }));

    paymentMethod.getRoot().should('be.visible');
  });
});
