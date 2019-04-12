// @flow

import type { PurchaseHooksTransactionState } from '~/providers/purchase-hooks/types';

export const processTable: {
  [key: PurchaseHooksTransactionState]: string,
} = {
  ['idle']: 'Awaiting for start',
  ['allowance_checking']: 'Checking transaction allowance',
  ['approving']: 'Approving transaction',
  ['balance_checking']: 'Balance checking',
  ['transfer']: 'Transfering tokens..',
  ['transfered']: 'Successfully transfered',
};
