// @flow
import { expectedEthereumNetwork } from '~/config/ethereum-network';

export function getEtherscanTransactionUrl(txHash: string) {
  let etherscanSubdomain =
    expectedEthereumNetwork.name === 'Main'
      ? ''
      : expectedEthereumNetwork.name.toLowerCase();

  return `https://${
    etherscanSubdomain ? `${etherscanSubdomain}.` : ''
  }etherscan.io/tx/${txHash}`;
}
