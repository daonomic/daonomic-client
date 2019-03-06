// @flow
import { apiClient } from '~/domains/app/api-client';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function loadUserData(): Promise<ReferralProgramTypes.UserData> {
  return apiClient.get('/ref').then(({ data }) => data);
}
