// @flow
import { apiClient } from '~/domains/app/api-client';

import * as PaymentTypes from '~/domains/business/payment/types';

export function getPaymentStatus({
  saleId,
  tokenId,
}: {|
  saleId: string,
  tokenId: string,
|}): Promise<PaymentTypes.Payment[]> {
  return apiClient
    .get(`/sales/${saleId}/payment/${tokenId}/status`)
    .then((response) => response.data);
}
