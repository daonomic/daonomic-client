// @flow
import * as Web3Types from '~/domains/business/web3/types';

export function getWeb3Type(): Web3Types.Web3Type {
  if (window.ethereum) {
    return 'modernMetamask';
  }

  if (window.web3) {
    return 'dapp';
  }

  return null;
}
