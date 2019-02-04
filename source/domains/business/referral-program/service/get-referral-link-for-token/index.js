// @flow
import { referralUrlParamName } from '~/domains/business/referral-program/config';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function getReferralLinkForToken(token: ReferralProgramTypes.Token) {
  return `${location.origin}?${referralUrlParamName}=${token}`;
}
