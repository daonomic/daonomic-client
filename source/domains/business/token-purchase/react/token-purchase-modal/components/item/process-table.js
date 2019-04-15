// @flow

import type { TokenPurchaseTransactionState } from '~/domains/business/token-purchase/types';

export const processTable: {
  [key: TokenPurchaseTransactionState]: string,
} = {
  ['idle']: 'Awaiting for start',
  ['allowance_checking']: 'Checking transaction allowance',
  ['approving']: 'Approving transaction',
  ['balance_checking']: 'Balance checking',
  ['transfer']: 'Transfering tokens..',
  ['transfered']: 'Successfully transfered',
};
