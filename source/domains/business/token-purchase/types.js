// @flow

import type { PaymentServicePaymentMethod } from '~/domains/business/payment/types';

export type TokenPurchaseTransactionState =
  | 'idle'
  | 'allowance_checking'
  | 'approving'
  | 'balance_checking'
  | 'transfer'
  | 'awaiting_confirmation'
  | 'transfered';

export type TokenPurchaseTransactionStatus =
  | {
      state: 'idle',
    }
  | {
      state: TokenPurchaseTransactionState,
      chain: TokenPurchaseTransactionState[],
    };

export type TokenPurchaseTransactionData = {|
  cost: number,
  amount: number,
  paymentMethod: PaymentServicePaymentMethod,
|};

export interface ITokenPurchase {
  transactionStatus: TokenPurchaseTransactionStatus;
  error: ?Error;
  isProcessing: boolean;
  isAgreeWithKyberTerms: boolean;
  handleIsAgreeWithKyberTerms: (isAgreeWithKyberTerms: boolean) => void;
  updateTransactionStatus: (status: TokenPurchaseTransactionStatus) => void;
  purchasingStart: (status: TokenPurchaseTransactionStatus) => void;
  purchasingAbort: (error: Error) => void;
  selectedPaymentMethod: ?PaymentServicePaymentMethod;
  selectPaymentMethod: (next: ?PaymentServicePaymentMethod) => void;
  resetState: (lastTransaction?: TokenPurchaseTransactionData) => void;
  lastTransaction: ?TokenPurchaseTransactionData;
  closeLastTransaction: () => void;
  setLastTransaction: (lastTransaction: TokenPurchaseTransactionData) => void;
  +mayUserPerformTransaction: boolean;
  +isKyber: boolean;
}

export interface ITokenPurcahseService {
  buyInEth: ({|
    cost: number,
  |}) => Promise<boolean>;
  buyInErc20: ({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<boolean>;
  buyInKyber: ({|
    cost: number,
    paymentMethod: PaymentServicePaymentMethod,
  |}) => Promise<boolean>;
}
