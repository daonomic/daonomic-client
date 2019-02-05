import { sendTransaction } from '../../transactions';

Cypress.Commands.add('whitelistUser', ({ ico, userId }) => {
  return cy
    .request({
      method: 'POST',
      url: `http://ops:9092/v1/tokens/${ico.realmId}/whitelist/set`,
      body: {
        userId,
        allowed: true,
      },
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
    );
});
