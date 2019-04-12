// @flow
export interface IImmediatePurchaseService {
  getBalanceOfErc20({|
    walletAddress: string,
    tokenAddress: string,
  |}): Promise<number>;
  getBalanceOfEth({| walletAddress: string |}): Promise<number>;
}
