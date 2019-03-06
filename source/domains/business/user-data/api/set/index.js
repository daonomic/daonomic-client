// @flow
import { apiClient } from '~/domains/app/api-client';

import * as UserDataTypes from '~/domains/business/user-data/types';

export function set(data: UserDataTypes.UserData): Promise<void> {
  return apiClient.post('/data', data).then((response) => response.data);
}
