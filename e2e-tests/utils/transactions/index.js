const { promisify } = require('util');
const { web3 } = require('../../web3-mock/engine');
const wallet = require('../../web3-mock/wallet');

async function sendTransaction({ transactionDataPromise }) {
  const transactionData = await transactionDataPromise;
  const sendTransaction = promisify(web3.eth.sendTransaction.bind(web3.eth));
  const estimatedGasAmount = await web3.eth
    .estimateGas({
      to: transactionData.to,
      data: transactionData.data,
    })
    .catch(() => undefined);

  const txHash = await sendTransaction({
    from: wallet.getAddressString(),
    to: transactionData.to,
    data: transactionData.data,
    gas: estimatedGasAmount,
  });

  return { id: transactionData.id, txHash };
}

module.exports = {
  sendTransaction,
};
