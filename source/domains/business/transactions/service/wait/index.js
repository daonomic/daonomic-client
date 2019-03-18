// @flow
import { apiClient } from '~/domains/app/api-client';

export async function wait({
  id,
  txHash,
}: {|
  id: string,
  txHash: string,
|}): Promise<void> {
  return apiClient
    .post(`/transactions/${id}/wait`, { txHash })
    .then(({ data }) => data);
}
