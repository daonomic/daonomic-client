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
        } = data;

        runInAction(() => {
          this.dataState = dataStates.loaded;
          this.startTimestamp = startDate;
          this.endTimestamp = endDate;
          this.tokensCount.sold = sold;
          this.tokensCount.total = total;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = dataStates.failed;
        });
      });
  };
}

export default new SaleStore({
  auth,
  sale,
  api,
});
