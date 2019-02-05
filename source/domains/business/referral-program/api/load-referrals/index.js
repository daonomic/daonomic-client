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
    .post('/ref/referees', { page: page - 1, size: countPerPage })
    .then(({ headers, data }) => ({
      items: data,
      count: headers['x-total-count'],
    }));
}
