// @flow

import { apiClient } from '~/domains/app/api-client';

import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

export async function loadBalance(): Promise<{|
  balance: number,
  totalReceived: number,
  locks?: WalletBalanceTypes.Lock[],
|}> {
  return apiClient.get('/balance').then((response) => response.data);
}
