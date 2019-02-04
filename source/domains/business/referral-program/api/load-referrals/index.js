// @flow
import client from '~/domains/app/api/client';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function loadReferrals({
  page,
  countPerPage,
}: {
  page: number,
  countPerPage: number,
}): Promise<{| count: number, items: ReferralProgramTypes.Referral[] |}> {
  return client
    .post('/ref/referees', { page, size: countPerPage })
    .then(({ data }) => data);
}
