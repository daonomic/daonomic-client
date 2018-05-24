// @flow
import axios from 'axios';
import config from '~/config';
import cacheResult from '~/utils/cache-result';
import client from '~/api/client';

import type { IApi } from './types';

const api: IApi = {
  auth: {
    login: ({ email, password }) =>
      client.post('/login', { username: email, password }),
    register: ({ email }) => client.post('/register', { email }),
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

  kycData: {
    getAddressAndStatus: () => client.get(`/sales/${config.saleId}/data`),
    setAddress: ({ address }) =>
      client.post(`/sales/${config.saleId}/data`, { address }),
    sendToReview: () => client.post('/review'),
    getUserData: ({ baseUrl, userId }) =>
      axios.get(`${baseUrl}/users/${userId}`).catch(() => ({ data: {} })),
    setUserData: ({ baseUrl, data, userId }) =>
      axios.post(`${baseUrl}/users/${userId}`, data),
  },

  getIcoInfo: cacheResult(() => client.get(`/sales/${config.saleId}`), 5000),
  getPaymentAddress: ({ saleId, tokenId }) =>
    client.get(`/sales/${saleId}/payment/${tokenId}/address`),
  getPaymentStatus: ({ saleId, tokenId }) =>
    client.get(`/sales/${saleId}/payment/${tokenId}/status`),
  getBalance: () => client.get(`/sales/${config.saleId}/balance`),
};

export function apiProvider() {
  return api;
}
