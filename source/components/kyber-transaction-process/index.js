// @flow

import { compose } from 'ramda';
import { connectContext } from '~/HOC/connect-context';
import { purchaseHooksContext } from '~/providers/purchase-hooks';
import { KyberTransactionProcessView } from './view';

import type { PurchaseHooksContextValue } from '~/providers/purchase-hooks/types';
import type { KyberTransactionProcessProps } from './view';

const enhance = compose(
  connectContext(
    purchaseHooksContext,
    (context: PurchaseHooksContextValue): KyberTransactionProcessProps => ({
      transactionStatus: context.transactionStatus,
      isProcessing: context.isProcessing,
      error: context.error,
      resetKyberTransactionState: () => {
        if (typeof context.resetState === 'function') {
          context.resetState();
        }
      },
    }),
  ),
);

export const KyberTransactionProcess = enhance(KyberTransactionProcessView);
