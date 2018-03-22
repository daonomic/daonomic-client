// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import { sale } from '~/config';
import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/api/types';
import type { DataState } from '~/types/common';

type SaleStoreOptions = {
  auth: IAuth,
  api: IApi,
  sale: typeof sale,
};

export class SaleStore {
  auth: IAuth;
  api: IApi;
  sale: typeof sale;

  @observable dataState: DataState = 'initial';

  @computed
  get isFailed(): boolean {
    return this.dataState === 'failed';
  }

  @computed
  get isLoading(): boolean {
    return this.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.dataState === 'loaded';
  }

  @observable startTimestamp = 0;
  @observable endTimestamp = 0;

  @computed
  get isStarted(): boolean {
    return Date.now() >= this.startTimestamp;
  }

  @computed
  get isFinished(): boolean {
    return Date.now() >= this.endTimestamp;
  }

  @observable
  tokensCount = {
    sold: 0,
    total: 0,

    get notLimited(): boolean {
      return this.total === 0;
    },
  };

  constructor(options: SaleStoreOptions) {
    this.auth = options.auth;
    this.api = options.api;
    this.sale = options.sale;

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      }
    });
  }

  @action
  loadInfo = () => {
    this.dataState = 'loading';

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
          this.dataState = 'loaded';
          this.startTimestamp = startDate;
          this.endTimestamp = endDate;
          this.tokensCount.sold = sold;
          this.tokensCount.total = total;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.dataState = 'failed';
        });
      });
  };
}

export function saleProvider(api: IApi, auth: IAuth, saleId: string) {
  return new SaleStore({
    api,
    auth,
    sale: saleId,
  });
}
