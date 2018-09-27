// @flow
import client from '~/api/client';

import * as ReferralProgramTypes from '~/modules/referral-program/types';

export function loadUserToken(): Promise<ReferralProgramTypes.Token> {
  return client.get('/ref').then(({ data }) => data);
}
