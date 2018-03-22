// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import { createViewModel } from 'mobx-utils';
import { sale } from '~/config';
import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/api/types';
import type { ISaleStoreState } from './types';

const getInitialTokensCount = () => ({
  sold: 0,
  total: 0,

  get notLimited(): boolean {
    return this.total === 0;
  },
});

class SaleStoreState implements ISaleStoreState {
  @observable dataState = 'initial';
  @observable startTimestamp = 0;
  @observable endTimestamp = 0;
  @observable tokensCount = getInitialTokensCount();
}

export class SaleStore {
  auth: IAuth;
  api: IApi;
  sale: typeof sale;

  state = createViewModel(new SaleStoreState());

  @computed
  get isFailed(): boolean {
    return this.state.dataState === 'failed';
  }

  @computed
  get isLoading(): boolean {
    return this.state.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.dataState === 'loaded';
  }

  @computed
  get isStarted(): boolean {
    return Date.now() >= this.state.startTimestamp;
  }

  @computed
  get isFinished(): boolean {
    return Date.now() >= this.state.endTimestamp;
  }

  constructor(options: { auth: IAuth, api: IApi, sale: typeof sale }) {
    this.auth = options.auth;
    this.api = options.api;
    this.sale = options.sale;
    this.initState();

    autorun(() => {
      if (this.auth.isAuthenticated) {
        this.loadInfo();
      } else {
        this.reset();
      }
    });
  }

  @action
  loadInfo = () => {
    this.state.dataState = 'loading';

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
          this.state.dataState = 'loaded';
          this.state.startTimestamp = startDate;
          this.state.endTimestamp = endDate;
          this.state.tokensCount.sold = sold;
          this.state.tokensCount.total = total;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.state.dataState = 'failed';
        });
      });
  };

  initState = () => {
    this.state.reset();
    this.state.tokensCount = getInitialTokensCount();
  };

  reset = () => {
    this.initState();
  };
}

export function saleProvider(api: IApi, auth: IAuth, saleId: string) {
  return new SaleStore({
    api,
    auth,
    sale: saleId,
  });
}
