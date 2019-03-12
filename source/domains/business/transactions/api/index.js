// @flow
import { apiClient } from '~/domains/app/api-client';

import * as TransactionsTypes from '~/domains/business/transactions/types';

function loadTransactions(): Promise<TransactionsTypes.Transaction[]> {
  return apiClient.get('/transactions').then((response) => response.data);
}

export const transactionsApi = {
  loadTransactions,
};
