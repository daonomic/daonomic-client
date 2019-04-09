// @flow
export type Web3Type = 'modernMetamask' | 'dapp' | null;

export interface IWeb3Service {
  getNetworkId(): Promise<string>;
  getWalletAddress(): Promise<string>;
  isWeb3Installed: boolean;
  signMessage: (message: string) => Promise<?string>;
  estimateGas: ({| to: string, data: string |}) => Promise<?number>;
  sendTransaction: ({|
    to: string,
    data: string,
    value?: number,
    gas?: ?number,
  |}) => Promise<string>;
  createContract: (abi: {}[], address: string) => any;
  setDefaultAddress: (address: string) => void;
}
