// @flow
import { observable, computed, action, autorun, runInAction } from 'mobx';
import createViewModel, { type ViewModel } from '~/utils/create-view-model';
import { config } from '~/domains/app/config';
import type { IAuth } from '~/stores/auth/types';
import type { IApi } from '~/domains/app/api/types';
import type { ISaleStoreState } from './types';

const getInitialTokensCount = () => ({
  sold: 0,
  total: 0,

  get notLimited(): boolean {
    return this.total === 0;
  },
});

class SaleStoreState implements ISaleStoreState {
  @observable
  dataState = 'idle';
  @observable
  address = '';
  @observable
  tokenSymbol = '';
  @observable
  startTimestamp = null;
  @observable
  endTimestamp = null;
  @observable
  tokensCount = getInitialTokensCount();
  @observable features = [];
}

export class SaleStore {
  auth: IAuth;
  api: IApi;
  sale: typeof config.saleId;

  state: ViewModel<SaleStoreState> = createViewModel(new SaleStoreState());

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
    if (this.state.startTimestamp) {
      return this.state.startTimestamp <= Date.now();
    } else {
      return true;
    }
  }

  @computed
  get isFinished(): boolean {
    if (this.state.endTimestamp) {
      return this.state.endTimestamp <= Date.now();
    } else {
      return false;
    }
  }

  constructor(options: { auth: IAuth, api: IApi, sale: typeof config.saleId }) {
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
  loadInfo = async () => {
    this.state.dataState = 'loading';

    try {
      const { data } = await this.api.getSaleInfo();
      const {
        current: sold = 0,
        total = 0,
        startDate = 0,
        endDate = 0,
        token,
        address,
        features,
      } = data;

      runInAction(() => {
        this.state.dataState = 'loaded';
        this.state.address = address;
        this.state.tokenSymbol = token.symbol;
        this.state.tokensCount.sold = sold;
        this.state.tokensCount.total = total;
        this.state.features = features || [];

        if (startDate) {
          this.state.startTimestamp = startDate;
        }

        if (endDate) {
          this.state.endTimestamp = endDate;
        }
      });
    } catch (error) {
      runInAction(() => {
        this.state.dataState = 'failed';
      });
    }
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
