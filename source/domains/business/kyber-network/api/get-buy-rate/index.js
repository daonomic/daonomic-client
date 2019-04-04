// @flow
import { kyberNetworkClient } from '../../client';

import type { KyberNetworkGetBuyRateResponse } from '~/domains/business/kyber-network/types';

export function getBuyRate({
  id,
  qty,
}: {
  id: string,
  qty: number,
}): Promise<KyberNetworkGetBuyRateResponse> {
  return kyberNetworkClient
    .get(`/currencies`, {
      params: {
        id,
        qty: String(qty),
      },
    })
    .then((response) => response.data);
}
