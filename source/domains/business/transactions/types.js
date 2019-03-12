// @flow
type Status =
  | 'PENDING'
  | 'CONFIRMED'
  | 'EXECUTING'
  | 'WAITING'
  | 'SUCCESS'
  | 'ERROR';

type BaseTransaction = {|
  hash: string,
  status: Status,
  createDate: number,
|};

type PurchaseTransaction = {|
  ...BaseTransaction,
  type: 'PURCHASE',
  sold: number,
|};

type PoolTransaction = {|
  ...BaseTransaction,
  type: 'CREATE_HOLDER',
  form: {|
    amount: number,
  |},
|};

export type Transaction = PurchaseTransaction | PoolTransaction;
