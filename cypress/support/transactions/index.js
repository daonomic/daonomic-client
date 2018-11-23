import { web3 } from '../web3-mock/engine';
import wallet from '../web3-mock/wallet';

function estimateGas({ to, data }) {
  return new Cypress.Promise(
    (resolve) => {
      web3.eth.estimateGas({ to, data }, (error, result) => {
        if (error) {
          resolve();
        } else {
          resolve(result);
        }
      });
    },
    { timeout: 1000 * 10 },
  );
}

export function sendTransaction({ transactionData }) {
  return estimateGas({
    to: transactionData.to,
    data: transactionData.data,
  }).then(
    (estimatedGasAmount) =>
      new Cypress.Promise((resolve, reject) => {
        web3.eth.sendTransaction(
          {
            from: wallet.getAddressString(),
            to: transactionData.to,
            data: transactionData.data,
            gas: estimatedGasAmount,
          },
          (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve({ id: transactionData.id, txHash: result });
            }
          },
        );
      }),
    { timeout: 1000 * 20 },
  );
}
