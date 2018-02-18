// @flow
import {
  observable,
  computed,
  action,
  autorun,
  runInAction,
} from 'mobx';
import api from '~/api/api';
import type { DataState } from '~/types/common';
import auth from '~/stores/auth';
import type {
  KycFormField,
  KycFormFieldName,
  KycFormFieldValue,
  SetKycDataResponseError,
} from '~/types/kyc';

export class KycStore {
  api: typeof api;
  auth: typeof auth;

  @observable dataState: DataState = 'initial';
  @observable savingState: DataState = 'initial';

  @observable isAllowed = false;

  @observable formSchema: KycFormField[] = [];
  @observable formData: Map<KycFormFieldName, KycFormFieldValue> = new Map();
  @observable formErrors: Map<KycFormFieldName, string> = new Map();

  @computed get form(): Array<KycFormField & { value: KycFormFieldValue, error: string }> {
    return this.formSchema.map((field) => ({
      ...field,
      value: this.formData.get(field.name),
      error: this.formErrors.get(field.name),
    }));
  }

  @computed get isEnabled(): boolean {
    return this.formSchema.length > 1;
  }

  @computed get isSaving(): boolean {
    return this.savingState === 'loading';
  }

  @computed get isSaved(): boolean {
    return this.savingState === 'loaded';
  }

  @computed get isLoading(): boolean {
    return this.dataState === 'loading';
  }

  @computed get isLoaded(): boolean {
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

  @action loadKycInfo = (): Promise<*> => {
    this.dataState = 'loading';

    return this.api.getIcoInfo()
      .then(({ data }) => {
        const { kyc = [] } = data;

        runInAction(() => {
          this.dataState = 'loaded';
          this.formSchema = kyc;

          kyc.forEach((field: KycFormField) => {
            let defaultValue = '';

            if (field.values) {
              [defaultValue] = field.values;
            } else if (field.type === 'FILE') {
              defaultValue = '';
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

  @action loadData = () => {
    this.dataState = 'loading';

    this.api.kycData.get()
      .then((response) => {
        this.dataState = 'loaded';

        const { allowed, data } = response.data;

        runInAction(() => {
          this.isAllowed = allowed;

          if (data) {
            Object.keys(data).forEach((fieldName) => {
              this.formData.set(fieldName, data[fieldName]);
            });
          }

          if (data && allowed) {
            this.savingState = 'loaded';
          }
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = 'failed';
        });
      });
  };

  @action saveData = () => {
    this.savingState = 'loading';
    this.formErrors = new Map();
    const formData: [KycFormFieldName, KycFormFieldValue][] = Array.from(this.formData.entries());
    const data = formData.reduce((result, [key, value]) => ({
      ...result,
      [key]: value,
    }), {});

    this.api.kycData.set(data)
      .then(() => {
        runInAction(() => {
          this.savingState = 'loaded';
        });
      })
      .catch((error: SetKycDataResponseError) => {
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

  @action updateFormField = (name: KycFormFieldName, value: KycFormFieldValue) => {
    this.savingState = 'initial';
    this.formData.set(name, value);
    this.formErrors.delete(name);
  };

  @action resetData = () => {
    this.formData = new Map();
    this.formErrors = new Map();
  };
}

export default new KycStore({ api, auth });
