// @flow
import { apiClient } from '~/domains/app/api-client';

export function determineBonus({
  amount,
  saleId,
}: {|
  amount: number,
  saleId: string,
|}): Promise<number> {
  return apiClient
    .post(`/sales/${saleId}/bonus`, { amount })
    .then((response) => response.data);
}
