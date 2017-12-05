import { observable, computed, action, autorun, runInAction } from 'mobx';
import dataStates from '~/utils/data-states';
import apiAdapter from '~/api/api';
import walletAddress from '~/stores/wallet/address';

export class WalletBalanceStore {
  static balanceUpdateInterval = 3000;

  @observable balanceState = dataStates.initial;
  @observable balance = 0;

  @computed get isLoading() {
    return this.balanceState === dataStates.loading;
  }

  @computed get isLoaded() {
    return this.balanceState === dataStates.loaded;
  }

  constructor(options) {
    this.api = options.api;
    this.walletAddress = options.walletAddress;

    let balanceUpdateIntervalId = null;

    autorun(() => {
      clearInterval(balanceUpdateIntervalId);

      if (this.walletAddress.isSaved) {
        this.loadBalance();
        balanceUpdateIntervalId = setInterval(() => this.loadBalance(), WalletBalanceStore.balanceUpdateInterval);
      } else {
        this.resetBalance();
      }
    });
  }

  @action loadBalance = () => {
    this.balanceState = dataStates.loading;

    this.api
      .getBalance()
      .then(({ data }) => {
        runInAction(() => {
          this.balanceState = dataStates.loaded;
          this.balance = data.balance;
        });
      })
      .catch(() => {
        runInAction(() => {
          this.balanceState = dataStates.failed;
        });
      });
  };

  @action resetBalance = () => {
    this.balanceState = dataStates.initial;
    this.balance = 0;
  };
}

export default new WalletBalanceStore({ api: apiAdapter, walletAddress });
