// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type PurchaseHooksTransactionState =
  | 'idle'
  | 'allowance_checking'
  | 'approving'
  | 'sending'
  | 'transfered';

export type PurchaseHooksContextValue = {|
  buyInEth: ?({
    cost: number,
  }) => Promise<void>,
  buyInErc20: ?({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<void>,
  buyInKyber: ?({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<void>,
  status: PurchaseHooksTransactionState,
|};
