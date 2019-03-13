// @flow
import { expectedEthereumNetwork } from '~/domains/app/config/ethereum-network';

const etherscanSubdomain =
  expectedEthereumNetwork.name === 'Main'
    ? ''
    : expectedEthereumNetwork.name.toLowerCase();

const etherscanHost = `https://${etherscanSubdomain}${
  etherscanSubdomain ? '.' : ''
}etherscan.io`;

export const etherscan = {
  getAddressUrl: (address: string): string =>
    `${etherscanHost}/address/${address}`,
  getTransactionUrl: (hash: string): string => `${etherscanHost}/tx/${hash}`,
};
