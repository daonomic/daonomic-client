// @flow
import { client } from '~/domains/app/api/client';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function loadUserData(): Promise<ReferralProgramTypes.UserData> {
  return client.get('/ref').then(({ data }) => data);
}
