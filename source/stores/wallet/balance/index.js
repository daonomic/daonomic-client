// @flow
import { observable, computed, action, runInAction } from 'mobx';
import { createViewModel } from 'mobx-utils';
import type { IApi } from '~/api/types';
import type { IWalletBalanceState } from './types';

class WalletBalanceState implements IWalletBalanceState {
  @observable balanceState = 'initial';
  @observable balance = 0;
}

export class WalletBalanceStore {
  api: IApi;

  state = createViewModel(new WalletBalanceState());

  @computed
  get isLoading(): boolean {
    return this.state.balanceState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.balanceState === 'loaded';
  }

  constructor(options: { api: IApi }) {
    this.api = options.api;
  }

  @action
  loadBalance = () => {
    this.state.balanceState = 'loading';

    this.api
      .getBalance()
      .then(({ data }) => {
        runInAction(() => {
          this.state.balanceState = 'loaded';
          this.state.balance = data.balance;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.state.balanceState = 'failed';
        });
      });
  };
}

export function walletBalanceProvider(api: IApi): WalletBalanceStore {
  return new WalletBalanceStore({ api });
}
