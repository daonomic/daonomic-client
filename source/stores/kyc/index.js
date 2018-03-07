// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import axios from 'axios';
import { fromPairs } from 'ramda';
import api from '~/api/api';
import type { DataState } from '~/types/common';
import auth from '~/stores/auth';
import type {
  UserStatus,
  BaseKycFormField,
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
  KycValidationErrorResponse,
} from '~/types/kyc';
import { validateKycForm } from './validation';

export class KycStore {
  api: typeof api;
  auth: typeof auth;

  @observable dataState: DataState = 'initial';
  @observable savingState: DataState = 'initial';

  @observable kycFilesUrl = '';

  @observable status: UserStatus = 'NOT_SET';
  @observable denialReason: string = '';

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

  @observable formSchema: BaseKycFormField[] = [];
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
    return this.formSchema.length > 1;
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

  constructor(options: { api: typeof api, auth: typeof auth }) {
    this.api = options.api;
    this.auth = options.auth;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadKycInfo().then(this.loadData);
      } else {
        this.resetData();
      }
    });
  }

  @action
  loadKycInfo = (): Promise<*> => {
    this.dataState = 'loading';

    return this.api
      .getIcoInfo()
      .then(({ data }) => {
        const { kyc = [], kycUrl } = data;

        runInAction(() => {
          this.dataState = 'loaded';
          this.formSchema = kyc;
          this.kycFilesUrl = kycUrl;

          kyc.forEach((field) => {
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
      this.api.kycData.getUserData(),
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
          } else if (!this.isExtended) {
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
      savingPromise = this.api.kycData.setUserData(userData);
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
  resetData = () => {
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

    return axios.post(`${this.kycFilesUrl}/files`, formData, {
      onUploadProgress,
    });
  };

  getFileUrlById = (id: string): string => `${this.kycFilesUrl}/files/${id}`;
}

export default new KycStore({ api, auth });
