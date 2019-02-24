// @flow
import { getRouteUrl } from '~/domains/app/router';
import { referralUrlParamName } from '~/domains/business/referral-program/config';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function getReferralLinkForToken(token: ReferralProgramTypes.Token) {
  const referralUrl = new URL(getRouteUrl('signUp'), window.location.origin);
  const searchParams = new URLSearchParams();

  searchParams.append(referralUrlParamName, token);
  referralUrl.search = searchParams.toString();
  return referralUrl.toString();
}
