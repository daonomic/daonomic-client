// @flow
import { observable, action, autorun } from 'mobx';
import { appLocalStorage } from '~/domains/app/local-storage';

import type { AuthToken, IAuthToken } from '~/domains/business/auth/types';

class Token implements IAuthToken {
  @observable value = appLocalStorage.getItem('token');

  constructor() {
    autorun(() => {
      if (this.value) {
        appLocalStorage.setItem('token', this.value);
      } else {
        appLocalStorage.removeItem('token');
      }
    });
  }

  @action
  set = (value: AuthToken) => {
    this.value = value;
  };

  @action
  reset = () => {
    this.value = null;
  };
}

export const authToken = new Token();

export function authTokenProvider(): IAuthToken {
  return authToken;
}

export function freshAuthTokenProvider(): IAuthToken {
  return new Token();
}
