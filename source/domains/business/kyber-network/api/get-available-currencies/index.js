// @flow
import { kyberNetworkClient } from '../../client';

import type { KyberNetworkGetAvailableCurrenciesResponse } from '~/domains/business/kyber-network/types';

export function getAvailableCurrencies(): Promise<KyberNetworkGetAvailableCurrenciesResponse> {
  return kyberNetworkClient
    .get(`/currencies`)
    .then((response) => response.data.data);
}
