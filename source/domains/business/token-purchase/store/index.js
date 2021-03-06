// @flow

import { observable, action, computed } from 'mobx';
import { ITokenPurchase } from '~/domains/business/token-purchase/types';

export class TokenPurchase implements ITokenPurchase {
  @observable
  transactionStatus = {
    state: 'idle',
  };

  @observable
  error = null;

  @observable
  isProcessing = false;

  @observable
  selectedPaymentMethod = null;

  @observable
  lastTransaction = null;

  @observable
  isAgreeWithKyberTerms = false;

  @observable
  isDone = false;

  @computed
  get mayUserPerformTransaction() {
    return !this.isProcessing;
  }

  @computed
  get isKyber() {
    const method = this.selectedPaymentMethod;

    return !!method && method.category === 'KYBER_NETWORK';
  }

  @action
  setLastTransaction = (lastTransaction) => {
    this.lastTransaction = lastTransaction;
  };

  @action
  selectPaymentMethod = (nextPaymentMethod) => {
    this.selectedPaymentMethod = nextPaymentMethod;
  };

  @action
  purchasingStart = (nextTransactionState) => {
    this.isProcessing = true;
    this.transactionStatus = nextTransactionState;
  };

  @action
  updateTransactionStatus = (nextTransactionState) => {
    this.transactionStatus = nextTransactionState;
  };

  @action
  purchasingAbort = (error) => {
    this.error = {
      error,
      failedState: this.transactionStatus.state,
    };
  };

  @action
  resetState = (lastTransaction) => {
    this.transactionStatus = {
      state: 'idle',
    };
    this.error = null;
    this.isProcessing = false;
    this.lastTransaction = lastTransaction;
    this.isDone = false;
  };

  @action
  closeLastTransaction = () => {
    this.lastTransaction = null;
    this.isDone = false;
  };

  @action
  handleIsAgreeWithKyberTerms = (isAgreeWithKyberTerms) => {
    this.isAgreeWithKyberTerms = isAgreeWithKyberTerms;
  };

  @action
  purchasingDone = () => {
    this.isDone = true;
  };
}

export const tokenPurchase = new TokenPurchase();
