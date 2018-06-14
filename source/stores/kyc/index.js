// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import axios from 'axios';
import { fromPairs } from 'ramda';
import createViewModel from '~/utils/create-view-model';
import getDefaultFieldValue from '~/stores/kyc/utils/get-default-field-value';
import getUserStatus from '~/stores/kyc/utils/get-user-status';

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

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadKycInfo().then(this.loadUserData);
      } else {
        this.reset();
      }
    });
  }

  prefillUserWalletAddress = async () => {
    try {
      const web3 = await this.getWeb3Instance();

      runInAction(() => {
        this.state.prospectiveUserWalletAddress = web3.eth.defaultAccount || '';
      });
    } catch (error) {
      return;
    }
  };

  @action
  loadKycInfo = async (): Promise<*> => {
    this.state.dataState = 'loading';

    try {
      const { data } = await this.api.getSaleInfo();
      const { kyc = [], kycUrl } = data;

      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.kycServerUrl = kycUrl;
        this.state.formSchema = kyc;
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
      await this.prefillUserWalletAddress();
      const [userDataResponse, statusResponse] = await Promise.all([
        this.api.kycData.getUserData({
          baseUrl: this.state.kycServerUrl,
          userId: this.auth.id,
        }),
        this.api.kycData.getAddressAndStatus(),
      ]);
      const { data: userData } = userDataResponse;
      const { address, status, denialReason } = statusResponse.data;

      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.denialReason = denialReason || '';
        const hasUserData = Object.keys(userData).length > 0;

        this.state.status = getUserStatus({ kycStatus: status, hasUserData });

        if (address) {
          this.state.userWalletAddress = address;
        }

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
  saveUserWalletAddress = async ({ address }: { address: string }) => {
    const {
      data: { status, denialReason },
    } = await this.api.kycData.setAddress({ address });

    runInAction(() => {
      this.state.userWalletAddress = address;
      this.state.status = getUserStatus({
        kycStatus: status,
        hasUserData: !this.isExtended,
      });

      if (denialReason) {
        this.state.denialReason = denialReason;
      }
    });
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

  reset = () => {
    this.state.reset();
  };

  uploadFiles = ({
    files,
    onUploadProgress,
  }: {
    files: File[],
    onUploadProgress: (event: ProgressEvent) => void,
  }) => {
    const formData = new FormData();

    files.forEach((file) => {
      formData.append('file[]', file);
    });

    return axios.post(`${this.state.kycServerUrl}/files`, formData, {
      onUploadProgress,
    });
  };

  getFileUrlById = (id: string): string =>
    `${this.state.kycServerUrl}/files/${id}`;
}

export function kycProvider(
  api: IApi,
  auth: IAuth,
  getWeb3Instance: () => Promise<IWeb3>,
) {
  return new KycStore({ api, auth, getWeb3Instance });
}
