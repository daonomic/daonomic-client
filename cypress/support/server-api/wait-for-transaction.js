import { baseAdminApiUrl } from '../../config';

export const waitForTransaction = (transactionId, txHash) =>
  cy.request(
    'POST',
    `${baseAdminApiUrl}/v1/transactions/${transactionId}/wait`,
    {
      txHash,
    },
  );
