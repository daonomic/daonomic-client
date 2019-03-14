// @flow
import { observable, action } from 'mobx';

import * as TransactionsTypes from '~/domains/business/transactions/types';
import * as DataStateTypes from '~/domains/data/data-state/types';

type State = DataStateTypes.LoadableData<TransactionsTypes.Transaction[]>;

const initialState: State = {
  dataState: 'idle',
};

export class TransactionsStore {
  @observable
  state: State = initialState;

  @action
  setState = (state: State) => {
    this.state = state;
  };

  @action
  reset = () => {
    this.state = initialState;
  };
}

export const transactionsStore = new TransactionsStore();
