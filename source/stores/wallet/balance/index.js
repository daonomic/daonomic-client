// @flow
import { observable, computed, action, runInAction } from 'mobx';
import createViewModel, { type ViewModel } from '~/utils/create-view-model';
import type { IApi } from '~/domains/app/api/types';
import type { IWalletBalanceState } from './types';

class WalletBalanceState implements IWalletBalanceState {
  @observable
  balanceState = 'initial';
  @observable
  balance = 0;
}

export class WalletBalanceStore {
  api: IApi;

  @observable
  state: ViewModel<WalletBalanceState> = createViewModel(
    new WalletBalanceState(),
  );

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
  loadBalance = async () => {
    this.state.balanceState = 'loading';

    try {
      const { data } = await this.api.getBalance();

      runInAction(() => {
        this.state.balanceState = 'loaded';
        this.state.balance = data.balance;
      });
    } catch (error) {
      runInAction(() => {
        this.state.balanceState = 'failed';
      });
    }
  };
}

export function walletBalanceProvider(api: IApi): WalletBalanceStore {
  return new WalletBalanceStore({ api });
}
