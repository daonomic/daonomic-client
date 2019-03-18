// @flow

export type TransactionHash = string;

type BaseTransaction = {|
  id: string,
  hash: string,
  status: string,
  createDate: string,
  to: string,
  data: string,
|};

type PurchaseTransaction = {|
  ...BaseTransaction,
  type: 'PURCHASE',
  paymentMethodType: string,
  value: number,
  sold: number,
  bonus: number,
|};

type CreateHolderTransaction = {|
  ...BaseTransaction,
  type: 'CREATE_HOLDER',
  form: {|
    address: string,
    amount: number,
  |},
  creates?: string,
|};

type ReleaseVestedTokensTransaction = {|
  ...BaseTransaction,
  type: 'RELEASE',
  amount: number,
|};

export type Transaction =
  | PurchaseTransaction
  | CreateHolderTransaction
  | ReleaseVestedTokensTransaction;
