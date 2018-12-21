// @flow
import { DappWeb3Service } from './dapp-browser';

import type { IWeb3Service } from '~/domains/business/web3/types';

export class ModernMetamaskWeb3Service extends DappWeb3Service
  implements IWeb3Service {
  getWalletAddress = (): Promise<string> => {
    return this.web3.currentProvider.enable().then((accounts) => accounts[0]);
  };
}
