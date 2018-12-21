// @flow
import { getWeb3Type } from './get-web3-type';
import { DappWeb3Service } from './providers/dapp-browser';
import { ModernMetamaskWeb3Service } from './providers/modern-metamask';

import type { IWeb3Service } from '~/domains/business/web3/types';

function createWeb3Service(): ?IWeb3Service {
  const web3Type = getWeb3Type();
  let serviceInstance = null;

  switch (web3Type) {
    case 'modernMetamask': {
      serviceInstance = new ModernMetamaskWeb3Service();
      break;
    }

    case 'dapp': {
      serviceInstance = new DappWeb3Service();
      break;
    }

    case null: {
      break;
    }

    default: {
      (web3Type: empty);
    }
  }

  return serviceInstance;
}

export const web3Service: ?IWeb3Service = createWeb3Service();
