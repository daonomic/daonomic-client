import { salePeriodGuard } from '../../objects/sale-period-guard';
import { paymentMethod } from '../../objects/payment-method';
import wallet from '../../support/web3-mock/wallet';

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

describe('Sale period', () => {
  afterEach(() => {
    cy.logout();
  });

  const createICOWithPeriod = (period) =>
    cy.createIco((data) => ({
      ...data,
      kyc: {
        provider: 'SELF_SERVICE',
      },
      sale: {
        ...data.sale,
        publicSale: {
          ...(data.sale.publicSale || {}),
          period,
        },
      },
    }));

  const updateICOWithInternalParams = (ico) =>
    cy
      .getInternalKycParams({
        fields: internalFields,
      })
      .then((params) =>
        cy
          .updateTokenKyc(ico.realmId, ico.adminData.token, params)
          .then(() => ico),
      );

  const passInternalKYC = ({ ico, userId }) => {
    cy.fillUserData({ address: wallet.getAddressString() });
    cy.fillExtendedKycForm();

    cy.whitelistUser({
      ico,
      userId,
    });
  };

  it('Should show countdown timer if sale has not started yet', () => {
    const hour = 1000 * 60 * 60;
    const start = Date.now() + hour / 2;
    const end = start + hour;
    const salePeriod = { start, end };

    let currentUser = null;

    createICOWithPeriod(salePeriod)
      .then(updateICOWithInternalParams)
      .then((ico) =>
        cy.createUser({ ico }).then((user) => {
          currentUser = user;

          cy.login({
            ico: user.ico,
            email: user.email,
            password: user.password,
          });
        }),
      )
      .then(() =>
        passInternalKYC({
          ico: currentUser.ico,
          userId: currentUser.id,
        }),
      );

    salePeriodGuard.getRoot().should('be.visible');
    salePeriodGuard.getCountdownTimer().should('be.visible');
    paymentMethod.getRoot().should('not.exist');
  });

  it('Should show finished sale notification sale has been finished', () => {
    const hour = 1000 * 60 * 60;
    const start = Date.now() - hour;
    const end = start + hour / 2;
    const salePeriod = { start, end };

    let currentUser = null;

    createICOWithPeriod(salePeriod)
      .then(updateICOWithInternalParams)
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
      .then(() =>
        passInternalKYC({
          ico: currentUser.ico,
          userId: currentUser.id,
        }),
      );

    salePeriodGuard.getRoot().should('be.visible');
    salePeriodGuard.getFinishNotification().should('be.visible');
    paymentMethod.getRoot().should('not.exist');
  });

  it('Should show payment method if sale is active', () => {
    cy.createUser()
      .then((user) =>
        cy
          .login({
            email: user.email,
            password: user.password,
          })
          .then(() => user),
      )
      .then((user) => {
        passInternalKYC({
          ico: user.ico,
          userId: user.id,
        });
      });

    paymentMethod.getRoot().should('be.visible');
  });
});
