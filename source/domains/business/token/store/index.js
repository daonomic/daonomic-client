// @flow
import { observable, action, computed } from 'mobx';

import { type SaleStore } from '~/domains/business/sale/store';
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as TokenTypes from '~/domains/business/token/types';

type State = DataStateTypes.LoadableData<TokenTypes.Data>;

const initialState: State = { dataState: 'idle' };

export class TokenStore {
  @observable
  state: State = initialState;

  @observable
  sale: ?SaleStore = null;

  @observable
  contracts: TokenTypes.ContractProxies;

  @computed
  get symbol(): string {
    return this.state.dataState === 'loaded' ? this.state.data.symbol : '';
  }

  @action
  setState = (state: State) => {
    this.state = state;
  };

  @action
  setSale = (sale: SaleStore) => {
    this.sale = sale;
  };

  @action
  setContracts = (contracts: TokenTypes.ContractProxies) => {
    this.contracts = contracts;
  };

  @action
  reset = () => {
    this.state = initialState;
    this.sale = null;
  };
}

export const tokenStore = new TokenStore();
