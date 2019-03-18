// @flow
import { apiClient } from '~/domains/app/api-client';

/**
 * @todo Promise response types
 */

export async function wait({
  id,
  txHash,
}: {|
  id: string,
  txHash: string,
|}): Promise<any> {
  return apiClient
    .post(`/transactions/${id}/wait`, { txHash })
    .then(({ data }) => data);
}
