// @flow
import { observable, computed, action } from 'mobx';

import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

const initialState: WalletBalanceTypes.State = {
  dataState: 'idle',
  balance: 0,
  locks: [],
};

export class WalletBalanceStore {
  @observable
  state: WalletBalanceTypes.State = initialState;

  @computed
  get isLoading(): boolean {
    return this.state.dataState === 'loading';
  }

  @computed
  get isLoaded(): boolean {
    return this.state.dataState === 'loaded';
  }

  @action
  setState = (state: $Shape<WalletBalanceTypes.State>) => {
    this.state = {
      ...this.state,
      ...state,
    };
  };

  @action
  reset = () => {
    this.state = initialState;
  };
}

export const walletBalance = new WalletBalanceStore();
