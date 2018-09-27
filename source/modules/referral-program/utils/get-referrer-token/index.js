// @flow
import cookies from 'js-cookie';
import urlSearchParams from 'url-search-params';
import {
  referralCookieName,
  referralUrlParamName,
} from '~/modules/referral-program/config';

export function getReferrerToken() {
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
