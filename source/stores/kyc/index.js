// @flow
import { observable, computed, action, runInAction } from 'mobx';
import { fromPairs } from 'ramda';
import createViewModel from '~/utils/create-view-model';
import getDefaultFieldValue from '~/stores/kyc/utils/get-default-field-value';

import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/api/types';
import type { IWeb3 } from '~/types/web3';
import type { KycFormFieldName, KycFormFieldValue } from '~/types/kyc';
import type { IKycState } from './types';

class KycStoreState implements IKycState {
  @observable dataState = 'initial';
  @observable kycServerUrl = '';
  @observable status = 'NOT_SET';
  @observable denialReason = '';
  @observable prospectiveUserWalletAddress = '';
  @observable userWalletAddress = '';
  @observable formSchema = [];
  @observable formData: Map<KycFormFieldName, KycFormFieldValue> = new Map();
}

export class KycStore {
  api: IApi;
  auth: IAuth;
  getWeb3Instance: () => Promise<IWeb3>;

  state = createViewModel(new KycStoreState());

  @computed
  get isDenied(): boolean {
    return this.state.status === 'DENIED';
  }

  @computed
  get isAllowed(): boolean {
    return this.state.status === 'ALLOWED';
  }

  @computed
  get isOnReview(): boolean {
    return this.state.status === 'ON_REVIEW';
  }

  @computed
  get isExtended(): boolean {
    return this.state.formSchema.length > 0;
  }

  @computed
  get isLoading(): boolean {
    return this.state.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.dataState === 'loaded';
  }

  constructor(options: {
    api: IApi,
    auth: IAuth,
    getWeb3Instance: () => Promise<IWeb3>,
  }) {
    this.api = options.api;
    this.auth = options.auth;
    this.getWeb3Instance = options.getWeb3Instance;
  }

  @action
  loadKycInfo = async (): Promise<*> => {
    this.state.dataState = 'loading';

    try {
      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.formSchema.forEach((field) => {
          this.state.formData.set(field.name, getDefaultFieldValue(field));
        });
      });
    } catch (error) {
      runInAction(() => {
        this.state.dataState = 'failed';
      });
    }
  };

  @action
  loadUserData = async () => {
    this.state.dataState = 'loading';

    try {
      const [userDataResponse] = await this.api.kycData.getUserData({
        baseUrl: this.state.kycServerUrl,
        userId: this.auth.id,
      });
      const { data: userData } = userDataResponse;

      runInAction(() => {
        this.state.dataState = 'loaded';
        const hasUserData = Object.keys(userData).length > 0;

        if (hasUserData) {
          Object.keys(userData).forEach((fieldName) => {
            this.state.formData.set(fieldName, userData[fieldName]);
          });
        }
      });
    } catch (error) {
      runInAction(() => {
        this.state.dataState = 'failed';
      });
    }
  };

  @action
  saveData = async (
    updatedFormData: Map<KycFormFieldName, KycFormFieldValue>,
  ) => {
    this.state.formData = updatedFormData;
    const userData = fromPairs(Array.from(updatedFormData.entries()));

    let savingPromise = Promise.resolve();

    if (this.isExtended) {
      savingPromise = this.api.kycData.setUserData({
        data: userData,
        baseUrl: this.state.kycServerUrl,
        userId: this.auth.id,
      });
    }

    await savingPromise;
    await this.api.kycData.sendToReview();

    runInAction(() => {
      if (this.isExtended) {
        this.state.status = 'ON_REVIEW';
      } else {
        this.state.status = 'ALLOWED';
      }
    });
  };
}

export function kycProvider(
  api: IApi,
  auth: IAuth,
  getWeb3Instance: () => Promise<IWeb3>,
) {
  return new KycStore({ api, auth, getWeb3Instance });
}
