// @flow
import { apiClient } from '~/domains/app/api-client';

export function getPaymentAddress({
  saleId,
  tokenId,
}: {|
  saleId: string,
  tokenId: string,
|}): Promise<{|
  address: string,
|}> {
  return apiClient
    .get(`/sales/${saleId}/payment/${tokenId}/address`)
    .then((response) => response.data);
}
