import { observable, action, computed, reaction, runInAction } from 'mobx';
import apiAdapter from '~/api/api';
import localStorage from '~/utils/local-storage';

export class AuthStore {
  @observable token = localStorage.getItem('token');
  @observable email = localStorage.getItem('email');
  @observable isRegistered = false;
  @observable isPasswordReset = false;
  @observable isNewPasswordCreated = false;
  @observable isLoading = false;
  @observable errors = {
    email: '',
    password: '',
    confirmedPassword: '',
    common: '',
  };

  constructor({ api }) {
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

  @computed get isAuthenticated() {
    return this.token !== null;
  }

  @action setToken = (token) => {
    this.token = token;
  };

  @action setEmail = (email) => {
    this.email = email;
  };

  @action login = ({ email, password }) => {
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

  @action register = ({ email }) => {
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

  @action resetPassword = ({ email }) => {
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

  @action createNewPassword = ({ token, password, confirmedPassword }) => {
    this.isLoading = true;
    this.isPasswordReset = false;

    return this.api.auth.createNewPassword({ token, password, confirmedPassword })
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
            this.errors.confirmedPassword = (fieldErrors.password2 || []).pop() || '';
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
    this.errors.confirmedPassword = '';
    this.errors.common = '';
  };

  @action logout = () => {
    this.email = '';
    this.token = null;
  };
}

export default new AuthStore({ api: apiAdapter });
