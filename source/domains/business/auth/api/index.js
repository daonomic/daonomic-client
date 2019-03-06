// @flow
import { apiClient } from '~/domains/app/api-client';

import type { IAuthApi } from '~/domains/business/auth/types';

export const authApi: IAuthApi = {
  login: ({ email, password }) =>
    apiClient
      .post('/login', { username: email, password })
      .then((response) => response.data),
  register: ({ email, referralData }) =>
    apiClient
      .post('/register', { email, referralData })
      .then((response) => response.data),
  resetPassword: ({ email, passwordRestorationPagePath }) =>
    apiClient
      .post('/password/change', {
        email,
        changePasswordPath: passwordRestorationPagePath,
      })
      .then((response) => response.data),
  createNewPassword: ({ token, password, confirmedPassword }) =>
    apiClient
      .post(`/password/change/${token}`, {
        password,
        password2: confirmedPassword,
      })
      .then((response) => response.data),
};
