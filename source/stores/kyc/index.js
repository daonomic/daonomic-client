// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import { createViewModel } from 'mobx-utils';
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
        this.loadKycInfo().then(this.loadData);
      } else {
        this.reset();
      }
    });
  }

  @action
  loadKycInfo = (): Promise<*> => {
    this.state.dataState = 'loading';

    return this.api
      .getIcoInfo()
      .then(({ data }) => {
        const { kyc = [], kycUrl } = data;

        runInAction(() => {
          this.state.dataState = 'loaded';
          this.state.formSchema = kyc.reduce((result, field) => {
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
          this.state.kycServerUrl = kycUrl;

          this.state.formSchema.forEach((field) => {
            let defaultValue = '';

            if (field.type === 'FILE') {
              defaultValue = [];
            } else if (field.type === 'BOOLEAN') {
              defaultValue = false;
            }

            this.state.formData.set(field.name, defaultValue);
          });
        });
      })
      .catch(() => {
        runInAction(() => {
          this.state.dataState = 'failed';
        });
      });
  };

  @action
  loadData = () => {
    this.state.dataState = 'loading';

    Promise.all([
      this.api.kycData.getUserData({
        baseUrl: this.state.kycServerUrl,
        userId: this.auth.id,
      }),
      this.api.kycData.getAddressAndStatus(),
    ])
      .then(([userDataResponse, statusResponse]) => {
        const { data: userData } = userDataResponse;
        const { address, status, denialReason } = statusResponse.data;

        runInAction(() => {
          this.state.dataState = 'loaded';
          this.state.denialReason = denialReason || '';
          const hasUserData = Object.keys(userData).length > 0;

          switch (status) {
            case 'NO_KYC':
            case 'COMPLETED': {
              this.state.status = 'ALLOWED';
              break;
            }

            case 'DENIED': {
              this.state.status = 'DENIED';
              break;
            }

            default: {
              if (hasUserData) {
                this.state.status = 'ON_REVIEW';
              }
            }
          }

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
      })
      .catch(() => {
        runInAction(() => {
          this.state.dataState = 'failed';
        });
      });
  };

  @action
  saveData = () => {
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

    savingPromise
      .then(() => this.api.kycData.setAddress({ address: userData.address }))
      .then(() => {
        runInAction(() => {
          this.state.savingState = 'loaded';

          if (this.isExtended) {
            this.state.status = 'ON_REVIEW';
          } else {
            this.state.status = 'ALLOWED';
          }
        });
      })
      .catch((error: KycValidationErrorResponse) => {
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
      });
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
