// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type PurchaseHooksTransactionState =
  | 'idle'
  | 'allowance_checking'
  | 'approving'
  | 'balance_checking'
  | 'transfer'
  | 'transfered';

export type PurchaseHooksTransactionStatus =
  | {
      state: 'idle',
    }
  | {
      state: PurchaseHooksTransactionState,
      chain: PurchaseHooksTransactionState[],
    };

export type PurchaseHooksBuyInEthFunction = ({|
  cost: number,
|}) => Promise<boolean>;

export type PurchaseHooksBuyInErc20Function = ({|
  cost: number,
  paymentMethod: PaymentServicePaymentMethod,
|}) => Promise<boolean>;

export type PurchaseHooksBuyInKyberFunction = ({|
  cost: number,
  paymentMethod: PaymentServicePaymentMethod,
|}) => Promise<boolean>;

export type PurchaseHooksContextValue = {|
  buyInEth: ?PurchaseHooksBuyInEthFunction,
  buyInErc20: ?PurchaseHooksBuyInErc20Function,
  buyInKyber: ?PurchaseHooksBuyInKyberFunction,
  transactionStatus: PurchaseHooksTransactionStatus,
  resetState: ?() => void,
  error: ?Error,
  isProcessing: boolean,
  mayPerformPurchase: boolean,
|};
