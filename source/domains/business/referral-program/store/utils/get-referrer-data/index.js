// @flow
import cookies from 'js-cookie';
import urlSearchParams from 'url-search-params';
import {
  tokenCookieName,
  urlCookieName,
  referralUrlParamName,
} from '~/domains/business/referral-program/config';

import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export function getReferrerData(): ?ReferralProgramTypes.Data {
  const persistedToken = cookies.get(tokenCookieName);
  const persistedUrl = cookies.get(urlCookieName);

  if (persistedToken) {
    return { token: persistedToken, url: persistedUrl };
  }

  const searchParams = new urlSearchParams(window.location.search);
  const tokenFromUrl = searchParams.get(referralUrlParamName);
  const url = document.referrer;

  if (tokenFromUrl) {
    cookies.set(tokenCookieName, tokenFromUrl, { expires: 90 });
    cookies.set(urlCookieName, url, { expires: 90 });

    return { token: tokenFromUrl, url };
  }
}
