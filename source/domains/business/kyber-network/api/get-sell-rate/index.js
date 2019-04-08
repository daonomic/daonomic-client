// @flow
import { kyberNetworkClient } from '../../client';

import type { KyberNetworkGetSaleRateResponse } from '~/domains/business/kyber-network/types';

export function getSellRate({
  id,
  qty,
}: {
  id: string,
  qty: number,
}): Promise<KyberNetworkGetSaleRateResponse> {
  return kyberNetworkClient
    .get(`/sell_rate`, {
      params: {
        id,
        qty: String(qty),
      },
    })
    .then((response) => response.data.data[0]);
}
