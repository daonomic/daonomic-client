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
      status: context.status,
    }),
  ),
);

export const KyberTransactionProcess = enhance(KyberTransactionProcessView);
