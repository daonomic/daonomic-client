// @flow
import { env } from '~/domains/app/config';

export type EthereumNetworkId = '1' | '3' | '17';

type EthereumNetworkName = 'Main' | 'Ropsten' | 'Dev';

export type EthereumNetwork = {|
  id: EthereumNetworkId,
  name: EthereumNetworkName,
|};

const ethereumNetworkIds: { [key: string]: EthereumNetworkId } = {
  production: '1',
  staging: '3',
  development: '17',
};

const ethereumNetworkNamesById: {
  [key: EthereumNetworkId]: EthereumNetworkName,
} = {
  [ethereumNetworkIds.production]: 'Main',
  [ethereumNetworkIds.staging]: 'Ropsten',
  [ethereumNetworkIds.development]: 'Dev',
};

let expectedEthereumNetworkId: EthereumNetworkId =
  ethereumNetworkIds.production;

switch (env) {
  case 'production': {
    expectedEthereumNetworkId = ethereumNetworkIds.production;
    break;
  }

  case 'staging': {
    expectedEthereumNetworkId = ethereumNetworkIds.staging;
    break;
  }

  case 'development': {
    expectedEthereumNetworkId = ethereumNetworkIds.development;
    break;
  }

  default: {
    (env: empty);
  }
}

export const expectedEthereumNetwork: EthereumNetwork = {
  id: expectedEthereumNetworkId,
  name: ethereumNetworkNamesById[expectedEthereumNetworkId],
};
