// @flow
import { observable, action } from 'mobx';

import * as TransactionsTypes from '~/domains/business/transactions/types';
import * as DataStateTypes from '~/domains/data/data-state/types';

type State = DataStateTypes.LoadableData<TransactionsTypes.Transaction[]>;

export class TransactionsStore {
  @observable
  state: State = {
    dataState: 'idle',
  };

  @action
  setState = (state: State) => {
    this.state = state;
  };
}

export const transactionsStore = new TransactionsStore();
