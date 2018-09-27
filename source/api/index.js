// @flow
import axios from 'axios';
import config from '~/config';
import cacheResult from '~/utils/cache-result';
import client from '~/api/client';

import type { IApi } from './types';

export const api: IApi = {
  auth: {
    login: ({ email, password }) =>
      client.post('/login', { username: email, password }),
    register: ({ email, ref }) => client.post('/register', { email, ref }),
    resetPassword: ({ email, passwordRestorationPagePath }) =>
      client.post('/password/change', {
        email,
        changePasswordPath: passwordRestorationPagePath,
      }),
    createNewPassword: ({ token, password, confirmedPassword }) =>
      client.post(`/password/change/${token}`, {
        password,
        password2: confirmedPassword,
      }),
  },

  kyc: {
    getStatus: () => client.get(`/sales/${config.saleId}/status`),
    sendToReview: () => client.post('/review'),
    getInternalKycData: ({ baseUrl, userId }) =>
      axios.get(`${baseUrl}/users/${userId}`).catch(() => ({ data: {} })),
    setInternalKycData: ({ url, data }) => axios.post(url, data),
  },

  userData: {
    get: () => client.get('/data'),
    set: (data) => client.post('/data', data),
  },

  getSaleInfo: cacheResult(() => client.get(`/sales/${config.saleId}`), 5000),
  getPaymentAddress: ({ saleId, tokenId }) =>
    client.get(`/sales/${saleId}/payment/${tokenId}/address`),
  getPaymentStatus: ({ saleId, tokenId }) =>
    client.get(`/sales/${saleId}/payment/${tokenId}/status`),
  getBalance: () => client.get(`/sales/${config.saleId}/balance`),
};

export function apiProvider() {
  return api;
}
