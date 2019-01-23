// @flow
import client from '~/domains/app/api/client';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function loadUserToken(): Promise<ReferralProgramTypes.Token> {
  return client.get('/ref').then(({ data }) => data);
}
