// @flow
import { observable, action, computed, reaction, runInAction } from 'mobx';
import apiAdapter from '~/api/api';
import localStorage from '~/utils/local-storage';
import type {
  AuthToken,
  Email,
  AuthParams,
  PasswordRecoveryParams,
} from '~/types/auth';

type AuthStoreParams = {
  api: typeof apiAdapter,
};

export class AuthStore {
  api: typeof apiAdapter;

  @observable token: AuthToken = localStorage.getItem('token');
  @observable email: Email = localStorage.getItem('email') || '';
  @observable isRegistered = false;
  @observable isPasswordReset = false;
  @observable isNewPasswordCreated = false;
  @observable isLoading = false;
  @observable errors = {
    email: '',
    password: '',
    confirmationPassword: '',
    common: '',
  };

  constructor({ api }: AuthStoreParams) {
    this.api = api;

    reaction(
      () => this.token,
      (token) => {
        if (token) {
          localStorage.setItem('token', token);
        } else {
          localStorage.removeItem('token');
        }
      },
    );

    reaction(
      () => this.email,
      (email) => {
        if (email) {
          localStorage.setItem('email', email);
        } else {
          localStorage.removeItem('email');
        }
      },
    );
  }

  @computed get isAuthenticated(): boolean {
    return this.token !== null;
  }

  @action setToken = (token: AuthToken) => {
    this.token = token;
  };

  @action setEmail = (email: Email) => {
    this.email = email;
  };

  @action login = ({ email, password }: AuthParams) => {
    this.resetErrors();
    this.logout();
    this.isLoading = true;

    return this.api.auth.login({ email, password })
      .then(({ data }) => {
        runInAction(() => {
          this.isLoading = false;
          this.token = data.token;
          this.email = email;
        });
        return { success: true };
      })
      .catch(({ response }) => {
        const { fieldErrors, reason } = response.data || {};

        runInAction(() => {
          this.isLoading = false;

          if (fieldErrors) {
            this.errors.email = (fieldErrors.username || []).pop() || '';
            this.errors.password = (fieldErrors.password || []).pop() || '';
          } else if (reason) {
            this.errors.common = reason;
          }
        });

        return { success: false };
      });
  };

  @action register = ({ email }: AuthParams) => {
    this.resetErrors();
    this.isLoading = true;

    return this.api.auth.register({ email })
      .then(() => {
        runInAction(() => {
          this.isLoading = false;
          this.isRegistered = true;
        });
      })
      .catch(({ response }) => {
        const fieldErrors = response && response.data && response.data.fieldErrors;

        runInAction(() => {
          this.isLoading = false;

          if (fieldErrors) {
            const error = !Array.isArray(fieldErrors.email) ?
              [fieldErrors.email] :
              fieldErrors.email;

            this.errors.email = error.join('; ');
          }
        });
      });
  };

  @action resetPassword = ({ email }: AuthParams) => {
    this.isLoading = true;

    return this.api.auth.resetPassword({ email })
      .then(() => {
        runInAction(() => {
          this.isLoading = false;
          this.isPasswordReset = true;
        });
      })
      .catch(({ response }) => {
        runInAction(() => {
          this.isLoading = false;
          const { genericErrors } = response.data || {};

          if (genericErrors) {
            this.errors.common = (genericErrors || []).pop() || '';
          }
        });
      });
  };

  @action createNewPassword = ({ token, password, confirmationPassword }: PasswordRecoveryParams) => {
    this.isLoading = true;
    this.isPasswordReset = false;

    return this.api.auth.createNewPassword({ token, password, confirmationPassword })
      .then(() => {
        runInAction(() => {
          this.isLoading = false;
          this.isNewPasswordCreated = true;
        });
      })
      .catch(({ response }) => {
        const { fieldErrors, reason, genericErrors } = response.data || {};

        runInAction(() => {
          this.isLoading = false;

          if (fieldErrors) {
            this.errors.password = (fieldErrors.password || []).pop() || '';
            this.errors.confirmationPassword = (fieldErrors.password2 || []).pop() || '';
          } else if (reason) {
            this.errors.common = reason;
          }

          if (genericErrors) {
            this.errors.common = (genericErrors || []).pop() || '';
          }
        });
      });
  };

  @action resetErrors = () => {
    this.errors.email = '';
    this.errors.password = '';
    this.errors.confirmationPassword = '';
    this.errors.common = '';
  };

  @action logout = () => {
    this.email = '';
    this.token = null;
  };
}

export default new AuthStore({ api: apiAdapter });
