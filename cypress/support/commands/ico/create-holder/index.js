import { createHolderTransaction } from '../../../server-api/create-holder-transaction';
import { waitForTransaction } from '../../../server-api/wait-for-transaction';
import { sendTransaction } from '../../../transactions';

const requestOptions = {
  timeout: 1000 * 20,
};

Cypress.Commands.add('createHolder', (tokenId, authToken, data) =>
  createHolderTransaction(tokenId, authToken, data)
    .then(
      (response) => sendTransaction({ transactionData: response.body }),
      requestOptions,
    )
    .then(
      (transaction) => waitForTransaction(transaction.id, transaction.txHash),
      requestOptions,
    ),
);
