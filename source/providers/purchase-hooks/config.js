// @flow

import type { PurchaseHooksContextValue } from './types';

export const initialValue: PurchaseHooksContextValue = {
  buyInEth: null,
  buyInErc20: null,
  buyInKyber: null,
  resetState: null,
  transactionStatus: {
    state: 'idle',
  },
  mayPerformPurchase: false,
  error: null,
  isProcessing: false,
};
