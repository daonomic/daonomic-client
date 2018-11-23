import { sendTransaction } from '../transactions';
import { createIcoParams } from './fixtures/create-ico';

export function createIco({ kyc }) {
  return cy
    .request('POST', 'http://ops:9092/v1/transactions/generate/ico', {
      ...createIcoParams,
      kyc,
    })
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
    .then(({ body }) => ({
      saleId: body.sale.id,
      realmId: body.token.id,
    }));
}
