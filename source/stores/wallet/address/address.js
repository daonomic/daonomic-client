import { observable, computed, action, runInAction, autorun } from 'mobx';
import dataStates from '~/utils/data-states';
import apiAdapter from '~/api/api';
import authStore from '~/stores/auth';

export class WalletAddressStore {
  @observable dataState = dataStates.initial;
  @observable address = '';
  @observable error = '';

  @computed get isSaving() {
    return this.dataState === dataStates.loading;
  }

  @computed get isSaved() {
    return this.isLoaded && this.address !== '';
  }

  @computed get isLoading() {
    return this.dataState === dataStates.loading;
  }

  @computed get isLoaded() {
    return this.dataState === dataStates.loaded;
  }

  constructor({ auth, api }) {
    this.auth = auth;
    this.api = api;

    autorun(() => {
      if (auth.isAuthenticated) {
        this.loadSavedAddress();
      } else {
        this.setAddress('');
      }
    });
  }

  @action loadSavedAddress = () => {
    this.dataState = dataStates.loading;
    this.api.address
      .get()
      .then(({ data }) => {
        const { address } = data;

        runInAction(() => {
          this.dataState = dataStates.loaded;
          this.address = address || '';
        });
      })
      .catch(({ response }) => {
        const notAuthorized = response.status === 403;

        runInAction(() => {
          this.dataState = notAuthorized ? dataStates.initial : dataStates.loaded;
          this.address = '';
        });

        if (notAuthorized) {
          this.auth.logout();
        }
      });
  };

  @action setAddress = (address) => {
    this.dataState = dataStates.initial;
    this.address = address;
  };

  @action saveAddress = () => {
    this.dataState = dataStates.loading;
    this.error = '';

    return this.api.address
      .set({ address: this.address })
      .then(() => {
        runInAction(() => {
          this.dataState = dataStates.loaded;
        });
      })
      .catch(({ response }) => {
        runInAction(() => {
          this.dataState = dataStates.failed;
          this.error = (response.data.fieldErrors.address || []).pop();
        });
      });
  };
}

export default new WalletAddressStore({ auth: authStore, api: apiAdapter });
