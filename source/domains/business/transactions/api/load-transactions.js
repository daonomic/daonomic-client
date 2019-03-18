// @flow
import { apiClient } from '~/domains/app/api-client';

import * as TransactionsTypes from '~/domains/business/transactions/types';

export function loadTransactions(): Promise<TransactionsTypes.Transaction[]> {
  return apiClient.get('/transactions').then((response) => response.data);
}
