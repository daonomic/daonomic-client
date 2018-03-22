// @flow
import axios from 'axios';
import { sale, realm } from '~/config';
import cacheResult from '~/utils/cache-result';
import type { IAuthToken } from '~/stores/auth/types';
import type { IApi } from './types';

const apiSubDomain = process.env.API === 'development' ? 'dev-api' : 'api';
const baseApiUrl = `https://${apiSubDomain}.daonomic.io/v1`;

const daonomicApi = axios.create({
  baseURL: baseApiUrl,
});

export function apiProvider(authToken: IAuthToken) {
  const defaultOptions = {
    get headers() {
      // auth token can be changed, so we need to recalculate headers before every request
      return {
        'X-REALM': realm,
        'X-AUTH-TOKEN': authToken.value,
      };
    },
  };

  const api: IApi = {
    auth: {
      login: ({ email, password }) =>
        daonomicApi.post(
          '/login',
          { username: email, password },
          defaultOptions,
        ),
      register: ({ email }) =>
        daonomicApi.post('/register', { email }, defaultOptions),
      resetPassword: ({ email, passwordRestorationPagePath }) =>
        daonomicApi.post(
          '/password/change',
          { email, changePasswordPath: passwordRestorationPagePath },
          defaultOptions,
        ),
      createNewPassword: ({ token, password, confirmationPassword }) =>
        daonomicApi.post(
          `/password/change/${token}`,
          {
            password,
            password2: confirmationPassword,
          },
          defaultOptions,
        ),
    },

    kycData: {
      getAddressAndStatus: () =>
        daonomicApi.get(`/sales/${sale}/address`, defaultOptions),
      setAddress: ({ address }) =>
        daonomicApi.post(`/sales/${sale}/address`, { address }, defaultOptions),
      getUserData: ({ baseUrl, userId }) =>
        axios.get(`${baseUrl}/users/${userId}`).catch(() => ({ data: {} })),
      setUserData: ({ baseUrl, data, userId }) =>
        axios.post(`${baseUrl}/users/${userId}`, data),
    },

    getIcoInfo: cacheResult(
      () => daonomicApi.get(`/sales/${sale}`, defaultOptions),
      5000,
    ),
    getPaymentAddress: ({ saleId, tokenId }) =>
      daonomicApi.get(
        `/sales/${saleId}/payment/${tokenId}/address`,
        defaultOptions,
      ),
    getPaymentStatus: ({ saleId, tokenId }) =>
      daonomicApi.get(
        `/sales/${saleId}/payment/${tokenId}/status`,
        defaultOptions,
      ),
    getBalance: () => daonomicApi.get(`/sales/${sale}/balance`, defaultOptions),
  };

  return api;
}
