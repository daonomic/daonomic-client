// @flow
import { referralUrlParamName } from '~/modules/referral-program/config';

import * as ReferralProgramTypes from '~/modules/referral-program/types';

export function getReferralLinkForToken(token: ReferralProgramTypes.Token) {
  return `${location.origin}?${referralUrlParamName}=${token}`;
}
