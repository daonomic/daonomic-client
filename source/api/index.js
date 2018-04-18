// @flow
import axios from 'axios';
import { sale, realm } from '~/config';
import cacheResult from '~/utils/cache-result';
import { baseApiUrl } from '~/config/api';

import type { IAuthToken } from '~/stores/auth/types';
import type { IApi } from './types';

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

  const axiosClient = axios.create({ baseURL: baseApiUrl });

  const handleFailedResponse = (error) => {
    if (error.response.status === 403) {
      authToken.reset();
      return;
    }

    throw error;
  };

  const client = {
    post: (path, body, options = {}) => {
      return axiosClient
        .post(path, body, {
          ...defaultOptions,
          ...options,
        })
        .catch(handleFailedResponse);
    },
    get: (path, options = {}) => {
      return axiosClient
        .get(path, {
          ...defaultOptions,
          ...options,
        })
        .catch(handleFailedResponse);
    },
  };

  const api: IApi = {
    auth: {
      login: ({ email, password }) =>
        client.post('/login', { username: email, password }, defaultOptions),
      register: ({ email }) =>
        client.post('/register', { email }, defaultOptions),
      resetPassword: ({ email, passwordRestorationPagePath }) =>
        client.post(
          '/password/change',
          { email, changePasswordPath: passwordRestorationPagePath },
          defaultOptions,
        ),
      createNewPassword: ({ token, password, confirmedPassword }) =>
        client.post(
          `/password/change/${token}`,
          {
            password,
            password2: confirmedPassword,
          },
          defaultOptions,
        ),
    },

    kycData: {
      getAddressAndStatus: () =>
        client.get(`/sales/${sale}/address`, defaultOptions),
      setAddress: ({ address }) =>
        client.post(`/sales/${sale}/address`, { address }, defaultOptions),
      getUserData: ({ baseUrl, userId }) =>
        axios.get(`${baseUrl}/users/${userId}`).catch(() => ({ data: {} })),
      setUserData: ({ baseUrl, data, userId }) =>
        axios.post(`${baseUrl}/users/${userId}`, data),
    },

    getIcoInfo: cacheResult(
      () => client.get(`/sales/${sale}`, defaultOptions),
      5000,
    ),
    getPaymentAddress: ({ saleId, tokenId }) =>
      client.get(`/sales/${saleId}/payment/${tokenId}/address`, defaultOptions),
    getPaymentStatus: ({ saleId, tokenId }) =>
      client.get(`/sales/${saleId}/payment/${tokenId}/status`, defaultOptions),
    getBalance: () => client.get(`/sales/${sale}/balance`, defaultOptions),
  };

  return api;
}
