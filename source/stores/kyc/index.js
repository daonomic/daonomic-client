// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import axios from 'axios';
import { fromPairs } from 'ramda';
import { validateKycForm } from './validation';
import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/api/types';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
  KycValidationErrorResponse,
} from '~/types/kyc';
import type { IKyc } from './types';

export class KycStore implements IKyc {
  api: IApi;
  auth: IAuth;

  @observable dataState = 'initial';
  @observable savingState = 'initial';

  @observable kycServerUrl = '';

  @observable status = 'NOT_SET';
  @observable denialReason = '';

  @computed
  get isDenied(): boolean {
    return this.status === 'DENIED';
  }

  @computed
  get isAllowed(): boolean {
    return this.status === 'ALLOWED';
  }

  @computed
  get isOnReview(): boolean {
    return this.status === 'ON_REVIEW';
  }

  @observable formSchema = [];
  @observable formData: Map<KycFormFieldName, KycFormFieldValue> = new Map();
  @observable formErrors: Map<KycFormFieldName, string> = new Map();

  @computed
  get form(): KycFormField[] {
    // $FlowFixMe
    return this.formSchema.map((field) => ({
      ...field,
      value: this.formData.get(field.name),
      error: this.formErrors.get(field.name),
    }));
  }

  @computed
  get isExtended(): boolean {
    return (
      this.formSchema.filter(
        (field) => !['address', 'addressConfirmation'].includes(field.name),
      ).length > 0
    );
  }

  @computed
  get isSaving(): boolean {
    return this.savingState === 'loading';
  }

  @computed
  get isSaved(): boolean {
    return this.savingState === 'loaded';
  }

  @computed
  get isLoading(): boolean {
    return this.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.dataState === 'loaded';
  }

  constructor(options: { api: IApi, auth: IAuth }) {
    this.api = options.api;
    this.auth = options.auth;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadKycInfo().then(this.loadData);
      } else {
        this.reset();
      }
    });
  }

  @action
  loadKycInfo = () => {
    this.dataState = 'loading';

    return this.api
      .getIcoInfo()
      .then(({ data }) => {
        const { kyc = [], kycUrl } = data;

        runInAction(() => {
          this.dataState = 'loaded';
          this.formSchema = kyc.reduce((result, field) => {
            result.push(field);

            if (field.name === 'address') {
              result.push({
                type: 'STRING',
                name: 'addressConfirmation',
                label: `${field.label} confirmation`,
                required: true,
              });
            }

            return result;
          }, []);
          this.kycServerUrl = kycUrl;

          this.formSchema.forEach((field) => {
            let defaultValue = '';

            if (field.type === 'FILE') {
              defaultValue = [];
            } else if (field.type === 'BOOLEAN') {
              defaultValue = false;
            }

            this.formData.set(field.name, defaultValue);
          });
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = 'failed';
        });
      });
  };

  @action
  loadData = () => {
    this.dataState = 'loading';

    Promise.all([
      this.api.kycData.getUserData({
        baseUrl: this.kycServerUrl,
        userId: this.auth.id,
      }),
      this.api.kycData.getAddressAndStatus(),
    ])
      .then(([userDataResponse, statusResponse]) => {
        const { data: userData } = userDataResponse;
        const { address, status, denialReason } = statusResponse.data;

        runInAction(() => {
          this.dataState = 'loaded';
          this.denialReason = denialReason || '';
          const hasUserData = Object.keys(userData).length > 0;

          switch (status) {
            case 'NO_KYC':
            case 'COMPLETED': {
              this.status = 'ALLOWED';
              break;
            }

            case 'DENIED': {
              this.status = 'DENIED';
              break;
            }

            default: {
              if (hasUserData) {
                this.status = 'ON_REVIEW';
              }
            }
          }

          if (hasUserData) {
            this.savingState = 'loaded';
            Object.keys(userData).forEach((fieldName) => {
              this.formData.set(fieldName, userData[fieldName]);
            });
          } else if (!this.isExtended && address) {
            this.savingState = 'loaded';
          }

          this.formData.set('address', address);
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = 'failed';
        });
      });
  };

  @action
  saveData = () => {
    this.validateForm();

    if (this.formErrors.size > 0) {
      return;
    }

    const userData = fromPairs(Array.from(this.formData.entries()));

    this.formErrors.clear();
    this.savingState = 'loading';
    let savingPromise = Promise.resolve();

    if (this.isExtended) {
      savingPromise = this.api.kycData.setUserData({
        data: userData,
        baseUrl: this.kycServerUrl,
        userId: this.auth.id,
      });
    }

    savingPromise
      .then(() => this.api.kycData.setAddress({ address: userData.address }))
      .then(() => {
        runInAction(() => {
          this.savingState = 'loaded';

          if (this.isExtended) {
            this.status = 'ON_REVIEW';
          } else {
            this.status = 'ALLOWED';
          }
        });
      })
      .catch((error: KycValidationErrorResponse) => {
        const { fieldErrors } = error.response.data;

        runInAction(() => {
          this.savingState = 'failed';

          if (fieldErrors) {
            Object.keys(fieldErrors).forEach((fieldName) => {
              const [fieldError] = fieldErrors[fieldName];

              this.formErrors.set(fieldName, fieldError);
            });
          }
        });
      });
  };

  @action
  validateForm = () => {
    this.formErrors.clear();

    const validationErrors = validateKycForm(this.form);

    validationErrors.forEach(({ name, error }) => {
      this.formErrors.set(name, error);
    });
  };

  @action
  updateFormField = (name: KycFormFieldName, value: KycFormFieldValue) => {
    this.savingState = 'initial';
    this.formData.set(name, value);
    this.formErrors.delete(name);
  };

  @action
  reset = () => {
    this.dataState = 'initial';
    this.savingState = 'initial';
    this.kycServerUrl = '';
    this.status = 'NOT_SET';
    this.formSchema = [];
    this.formData = new Map();
    this.formErrors = new Map();
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

    return axios.post(`${this.kycServerUrl}/files`, formData, {
      onUploadProgress,
    });
  };

  getFileUrlById = (id: string): string => `${this.kycServerUrl}/files/${id}`;
}

export function kycProvider(api: IApi, auth: IAuth) {
  return new KycStore({ api, auth });
}
