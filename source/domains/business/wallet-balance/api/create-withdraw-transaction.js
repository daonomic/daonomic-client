// @flow
import { apiClient } from '~/domains/app/api-client';

import * as AddressTypes from '~/domains/business/address/types';
import * as TransactionsTypes from '~/domains/business/transactions/types';

export async function createWithdrawTransaction(
  address: AddressTypes.Address,
): Promise<TransactionsTypes.Transaction> {
  return apiClient
    .post(`/locks/${address}/release`)
    .then((response) => response.data);
}
