// @flow
import { apiClient } from '~/domains/app/api-client';

import * as UserDataTypes from '~/domains/business/user-data/types';

export function get(): Promise<{|
  address?: UserDataTypes.Address,
  country?: UserDataTypes.Country,
|}> {
  return apiClient.get('/data').then((response) => response.data);
}
