// @flow
import { observable, computed, action } from 'mobx';

import * as WalletBalanceTypes from '~/domains/business/wallet-balance/types';

const initialState: WalletBalanceTypes.State = {
  dataState: 'idle',
  balance: 0,
  totalReceived: 0,
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

  @computed
  get locksTotal(): number {
    return this.state.locks.reduce((total, lock) => {
      return total + lock.balance.total;
    }, 0);
  }

  @computed
  get locksReleased(): number {
    return this.state.locks.reduce((released, lock) => {
      return released + lock.balance.released;
    }, 0);
  }

  @computed
  get lockedBalance(): number {
    return this.locksTotal - this.locksReleased;
  }

  @computed
  get locksAvailable(): number {
    return this.state.locks.reduce((available, lock) => {
      return available + (lock.balance.vested - lock.balance.released);
    }, 0);
  }

  @computed
  get unlockEvents(): WalletBalanceTypes.UnlockEvent[] {
    const currentDate: number = Date.now();

    return this.state.locks
      .reduce((result, lock) => {
        return [...result, ...lock.unlockEvents];
      }, [])
      .filter((lock) => currentDate < lock.date);
  }

  @computed
  get nextUnlockEvent(): ?WalletBalanceTypes.UnlockEvent {
    const [unlockEvent] = this.unlockEvents.sort((a, b) => a.date - b.date);

    return unlockEvent;
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
