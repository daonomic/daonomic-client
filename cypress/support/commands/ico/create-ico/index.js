import { sendTransaction } from '../../../transactions';
import { tokenForm } from './fixtures/token-form';
import { saleForm } from './fixtures/sale-form';
import { marketingForm } from './fixtures/marketing-form';
import { kycForm } from './fixtures/kyc-form';

const defaultIcoData = {
  kyc: kycForm,
  token: tokenForm,
  sale: saleForm,
  mail: marketingForm,
};

Cypress.Commands.add('createIco', (getIcoData = () => defaultIcoData) => {
  const icoData = getIcoData(defaultIcoData);

  return cy
    .request('POST', 'http://ops:9092/v1/transactions/generate/ico', icoData)
    .then(({ body }) => sendTransaction({ transactionData: body }), {
      timeout: 1000 * 20,
    })
    .then(
      ({ id, txHash }) =>
        cy.request('POST', `http://ops:9092/v1/transactions/${id}/wait/ico`, {
          txHash,
        }),
      { timeout: 1000 * 20 },
    )
    .then(({ body }) => {
      return {
        saleId: body.transaction.sale.id,
        realmId: body.transaction.token.id,
        adminData: body.loginResponse,
      };
    });
});
