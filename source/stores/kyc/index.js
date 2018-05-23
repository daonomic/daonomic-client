// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import axios from 'axios';
import { fromPairs } from 'ramda';
import createViewModel from '~/utils/create-view-model';
import { validateKycForm } from '~/stores/kyc/validation';
import kycFieldsToFormSchema from '~/stores/kyc/utils/kyc-fields-to-form-schema';
import getDefaultFieldValue from '~/stores/kyc/utils/get-default-field-value';
import getUserStatus from '~/stores/kyc/utils/get-user-status';

import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/api/types';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
} from '~/types/kyc';
import type { IKycState } from './types';

class KycStoreState implements IKycState {
  @observable dataState = 'initial';
  @observable savingState = 'initial';
  @observable kycServerUrl = '';
  @observable status = 'NOT_SET';
  @observable denialReason = '';
  @observable formSchema = [];
  @observable formData: Map<KycFormFieldName, KycFormFieldValue> = new Map();
  @observable formErrors: Map<KycFormFieldName, string> = new Map();
}

export class KycStore {
  api: IApi;
  auth: IAuth;

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
  get form(): KycFormField[] {
    // $FlowFixMe
    return this.state.formSchema.map((field) => ({
      ...field,
      value: this.state.formData.get(field.name),
      error: this.state.formErrors.get(field.name),
    }));
  }

  @computed
  get isExtended(): boolean {
    return (
      this.state.formSchema.filter(
        (field) => !['address', 'addressConfirmation'].includes(field.name),
      ).length > 0
    );
  }

  @computed
  get isSaving(): boolean {
    return this.state.savingState === 'loading';
  }

  @computed
  get isSaved(): boolean {
    return this.state.savingState === 'loaded';
  }

  @computed
  get isLoading(): boolean {
    return this.state.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.dataState === 'loaded';
  }

  constructor(options: { api: IApi, auth: IAuth }) {
    this.api = options.api;
    this.auth = options.auth;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadKycInfo().then(this.loadUserData);
      } else {
        this.reset();
      }
    });
  }

  @action
  loadKycInfo = async (): Promise<*> => {
    this.state.dataState = 'loading';

    try {
      const { data } = await this.api.getIcoInfo();
      const { kyc = [], kycUrl } = data;

      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.kycServerUrl = kycUrl;
        this.state.formSchema = kycFieldsToFormSchema(kyc);
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

        if (hasUserData) {
          this.state.savingState = 'loaded';
          Object.keys(userData).forEach((fieldName) => {
            this.state.formData.set(fieldName, userData[fieldName]);
          });
        } else if (!this.isExtended && address) {
          this.state.savingState = 'loaded';
        }

        this.state.formData.set('address', address);
      });
    } catch (error) {
      runInAction(() => {
        this.state.dataState = 'failed';
      });
    }
  };

  @action
  saveData = async () => {
    this.validateForm();

    if (this.state.formErrors.size > 0) {
      return;
    }

    const userData = fromPairs(Array.from(this.state.formData.entries()));

    this.state.formErrors.clear();
    this.state.savingState = 'loading';
    let savingPromise = Promise.resolve();

    if (this.isExtended) {
      savingPromise = this.api.kycData.setUserData({
        data: userData,
        baseUrl: this.state.kycServerUrl,
        userId: this.auth.id,
      });
    }

    try {
      await savingPromise;
      await this.api.kycData.setAddress({ address: userData.address });

      runInAction(() => {
        this.state.savingState = 'loaded';

        if (this.isExtended) {
          this.state.status = 'ON_REVIEW';
        } else {
          this.state.status = 'ALLOWED';
        }
      });
    } catch (error) {
      const { fieldErrors } = error.response.data;

      runInAction(() => {
        this.state.savingState = 'failed';

        if (fieldErrors) {
          Object.keys(fieldErrors).forEach((fieldName) => {
            const [fieldError] = fieldErrors[fieldName];

            this.state.formErrors.set(fieldName, fieldError);
          });
        }
      });
    }
  };

  @action
  validateForm = () => {
    this.state.formErrors.clear();

    const validationErrors = validateKycForm(this.form);

    validationErrors.forEach(({ name, error }) => {
      this.state.formErrors.set(name, error);
    });
  };

  @action
  updateFormField = (name: KycFormFieldName, value: KycFormFieldValue) => {
    this.state.savingState = 'initial';
    this.state.formData.set(name, value);
    this.state.formErrors.delete(name);
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

export function kycProvider(api: IApi, auth: IAuth) {
  return new KycStore({ api, auth });
}
