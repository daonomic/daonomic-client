// @flow
import cookies from 'js-cookie';
import urlSearchParams from 'url-search-params';
import {
  referralCookieName,
  referralUrlParamName,
} from '~/domains/business/referral-program/config';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function getReferrerToken(): ?ReferralProgramTypes.Token {
  const persistedToken = cookies.get(referralCookieName);

  if (persistedToken) {
    return persistedToken;
  }

  const searchParams = new urlSearchParams(window.location.search);
  const tokenFromUrl = searchParams.get(referralUrlParamName);

  if (tokenFromUrl) {
    cookies.set(referralCookieName, tokenFromUrl, { expires: 90 });
    return tokenFromUrl;
  }
}
