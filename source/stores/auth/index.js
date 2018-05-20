// @flow
import { observable, action, computed, autorun, runInAction } from 'mobx';
import localStorage from '~/utils/local-storage';
import getRouteUrl from '~/router/get-route-url';

import type { IApi, LoginResponse } from '~/api/types';
import type { AuthToken, UserId, PasswordRecoveryParams } from '~/types/auth';
import type { IAuth, IAuthToken } from './types';

export class AuthStore implements IAuth {
  api: IApi;
  token: IAuthToken;

  @observable id = localStorage.getItem('id') || '';

  @computed
  get isAuthenticated(): boolean {
    return this.token.value !== null;
  }

  constructor({ api, authToken }: { api: IApi, authToken: IAuthToken }) {
    this.api = api;
    this.token = authToken;

    autorun(() => {
      if (this.id) {
        localStorage.setItem('id', this.id);
      } else {
        localStorage.removeItem('id');
      }
    });

    autorun(() => {
      if (!this.token.value) {
        this.reset();
      }
    });
  }

  @action
  setId = (id: UserId) => {
    this.id = id;
  };

  @action
  setToken = (token: AuthToken) => {
    this.token.set(token);
  };

  @action
  login = async ({ email, password }: { email: string, password: string }) => {
    const {
      data: { token, id },
    } = await this.api.auth.login({ email, password });

    runInAction(() => {
      this.token.set(token);
      this.id = id;
    });
  };

  @action
  loginWithExternalService = async (
    loginService: () => Promise<LoginResponse>,
  ): Promise<void> => {
    const { token, id } = await loginService();

    runInAction(() => {
      this.token.set(token);
      this.id = id;
    });
  };

  register = ({ email }: { email: string }) => {
    return this.api.auth.register({ email });
  };

  resetPassword = ({ email }: { email: string }) => {
    return this.api.auth.resetPassword({
      email,
      passwordRestorationPagePath: getRouteUrl('createNewPassword', {
        token: 'tokenId',
      }).replace('/tokenId', ''),
    });
  };

  createNewPassword = ({
    token,
    password,
    confirmedPassword,
  }: PasswordRecoveryParams) => {
    return this.api.auth.createNewPassword({
      token,
      password,
      confirmedPassword,
    });
  };

  @action
  reset = () => {
    this.id = '';
    this.token.reset();
  };

  @action
  logout = () => {
    this.token.reset();
  };
}

export function authProvider(api: IApi, authToken: IAuthToken): AuthStore {
  if (!api || !authToken) {
    throw new TypeError('Required parameters are missing at authProvider');
  }

  return new AuthStore({ api, authToken });
}
