// @flow
import { apiClient } from '~/domains/app/api-client';

import * as AddressTypes from '~/domains/business/address/types';

/**
 * @todo response types  ??
 */

export async function createWithdrawTransaction(
  address: AddressTypes.Address,
): Promise<any> {
  return apiClient
    .get(`/locks/${address}/release`)
    .then((response) => response.data);
}
