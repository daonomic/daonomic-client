// @flow
import { environment } from '~/config';
type EthereumNetworkId = '1' | '42' | '17';
type EthereumNetworkName = 'Main' | 'Kovan' | 'Dev';
export type EthereumNetwork = {|
  id: EthereumNetworkId,
  name: EthereumNetworkName,
|};

const ethereumNetworkIds: { [key: string]: EthereumNetworkId } = {
  production: '1',
  staging: '42',
  development: '17',
};

const ethereumNetworkNamesById: {
  [key: EthereumNetworkId]: EthereumNetworkName,
} = {
  [ethereumNetworkIds.production]: 'Main',
  [ethereumNetworkIds.staging]: 'Kovan',
  [ethereumNetworkIds.development]: 'Dev',
};

let expectedEthereumNetworkId: EthereumNetworkId =
  ethereumNetworkIds.production;

switch (environment) {
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
    (environment: empty);
  }
}

export const expectedEthereumNetwork: EthereumNetwork = {
  id: expectedEthereumNetworkId,
  name: ethereumNetworkNamesById[expectedEthereumNetworkId],
};
