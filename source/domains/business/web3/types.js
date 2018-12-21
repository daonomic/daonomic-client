// @flow
export type Web3Type = 'modernMetamask' | 'dapp' | null;

export interface IWeb3Service {
  getNetworkId(): Promise<string>;
  getWalletAddress(): Promise<string>;
  signMessage(string): Promise<string>;
  estimateGas({| to: string, data: string |}): Promise<?number>;
  sendTransaction({|
    to: string,
    data: string,
    value?: number,
    gas?: ?number,
  |}): Promise<string>;
  createContract(abi: {}[], address: string): any;
}
