// @flow
import { observable, action, autorun } from 'mobx';
import localStorage from '~/utils/local-storage';
import type { IAuthToken } from './types';
import type { AuthToken } from '~/types/auth';

class Token implements IAuthToken {
  @observable value = localStorage.getItem('token');

  constructor() {
    autorun(() => {
      if (this.value) {
        localStorage.setItem('token', this.value);
      } else {
        localStorage.removeItem('token');
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

const authToken = new Token();

export default authToken;

export function authTokenProvider() {
  return authToken;
}

export function freshAuthTokenProvider() {
  return new Token();
}
