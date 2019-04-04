import { sendTransaction } from '../../transactions';

Cypress.Commands.add('createHolder', (ico, data) => {
  const holder = {
    name: data.name,
    address: data.address,
    amount: data.amount,
  };

  return cy
    .request({
      method: 'POST',
      url: `http://ops:9092/v1/tokens/${ico.realmId}/pools/createHolder`,
      body: holder,
      headers: { 'X-AUTH-TOKEN': ico.adminData.token },
    })
    .then(({ body }) => sendTransaction({ transactionData: body }), {
      timeout: 1000 * 20,
    })
    .then(
      ({ id, txHash }) =>
        cy.request('POST', `http://ops:9092/v1/transactions/${id}/wait`, {
          txHash,
        }),
      { timeout: 1000 * 20 },
    )
    .then(({ body }) => {
      return {
        saleId: body.transaction.sale && body.transaction.sale.id,
        realmId: body.transaction.token && body.transaction.token.id,
        adminData: body.loginResponse,
      };
    });
});
