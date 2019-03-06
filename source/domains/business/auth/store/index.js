// @flow
import { observable, action, computed, autorun, runInAction } from 'mobx';
import { appLocalStorage } from '~/domains/app/local-storage';
import { getRouteUrl } from '~/domains/app/router/routes';

import type { IAuthApi } from '~/domains/business/auth/types';
import type {
  AuthToken,
  UserId,
  PasswordRecoveryParams,
  IAuth,
  IAuthToken,
} from '~/domains/business/auth/types';
import * as ReferralProgramTypes from '~/domains/business/referral-program/types';

export class AuthStore implements IAuth {
  api: IAuthApi;
  token: IAuthToken;

  @observable
  id = appLocalStorage.getItem('id') || '';

  @computed
  get isAuthenticated(): boolean {
    return this.token.value !== null;
  }

  constructor({ api, authToken }: {| api: IAuthApi, authToken: IAuthToken |}) {
    this.api = api;
    this.token = authToken;

    autorun(() => {
      if (this.id) {
        appLocalStorage.setItem('id', this.id);
      } else {
        appLocalStorage.removeItem('id');
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
    const { token, id } = await this.api.login({ email, password });

    runInAction(() => {
      this.token.set(token);
      this.id = id;
    });
  };

  register = ({
    email,
    referralData,
  }: {|
    email: string,
    referralData: ?ReferralProgramTypes.ReferrerData,
  |}) => {
    return this.api.register({ email, referralData });
  };

  resetPassword = ({ email }: { email: string }) => {
    return this.api.resetPassword({
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
    return this.api.createNewPassword({
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
