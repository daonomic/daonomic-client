// @flow

type TransactionData = {
  to: string,
  value: string,
};

export type IWeb3 = {
  eth: {
    defaultAccount: ?string,
    sendTransaction(TransactionData): Promise<any>,
  },
  utils: {
    toWei(string): string,
  },
};
