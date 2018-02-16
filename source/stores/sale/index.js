import { observable, computed, action, autorun, runInAction } from 'mobx';
import api from '~/api/api';
import dataStates from '~/utils/data-states';
import { sale } from '~/config/common';
import auth from '~/stores/auth';

export class SaleStore {
  @observable dataState = dataStates.initial;

  @computed get isFailed() {
    return this.dataState === dataStates.failed;
  }

  @computed get isLoading() {
    return this.dataState === dataStates.loading;
  }

  @computed get isLoaded() {
    return this.dataState === dataStates.loaded;
  }

  @observable startTimestamp = 0;
  @observable endTimestamp = 0;

  @computed get isStarted() {
    return Date.now() >= this.startTimestamp;
  }

  @computed get isFinished() {
    return Date.now() >= this.endTimestamp;
  }

  @observable tokensCount = {
    sold: 0,
    total: 0,

    get notLimited() {
      return this.total === 0;
    },
  };

  @observable kycFormSchema = [];
  @observable kycFormData = new Map();

  @computed get kycForm() {
    return this.kycFormSchema.map((field) => ({
      ...field,
      value: this.kycFormData.get(field.name),
    }));
  }

  @computed get isKycEnabled() {
    return this.kycFormSchema.length > 0;
  }

  constructor(options) {
    this.auth = options.auth;
    this.api = options.api;
    this.sale = options.sale;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      }
    });
  }

  @action loadInfo = () => {
    this.dataState = dataStates.loading;

    this.api
      .getIcoInfo()
      .then(({ data }) => data)
      .then((data) => {
        const {
          current: sold = 0,
          total = 0,
          startDate = 0,
          endDate = 0,
          kyc = [],
        } = data;

        runInAction(() => {
          this.dataState = dataStates.loaded;
          this.startTimestamp = startDate;
          this.endTimestamp = endDate;
          this.tokensCount.sold = sold;
          this.tokensCount.total = total;
          this.kycFormSchema = kyc;

          kyc.forEach((field) => {
            let defaultValue = '';

            if (field.values) {
              [defaultValue] = field.values;
            } else if (field.type === 'FILE') {
              defaultValue = [];
            } else if (field.type === 'BOOLEAN') {
              defaultValue = false;
            }

            this.kycFormData.set(field.name, defaultValue);
          });
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = dataStates.failed;
        });
      });
  };

  @action updateKycFormField = (name, value) => {
    this.kycFormData.set(name, value);
  };
}

export default new SaleStore({
  auth,
  sale,
  api,
});
