// @flow
import { apiClient } from '~/domains/app/api-client';

import * as KycTypes from '~/domains/business/kyc/types';

export function getStatus(): Promise<KycTypes.State> {
  return apiClient.get(`/status`).then((response) => response.data);
}
