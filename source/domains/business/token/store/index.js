// @flow
import { observable, action, computed } from 'mobx';

import type { SaleStore } from '~/domains/business/sale/store';
import * as DataStateTypes from '~/domains/data/data-state/types';
import * as TokenTypes from '~/domains/business/token/types';

type State = DataStateTypes.LoadableData<TokenTypes.Token>;

const initialState: State = { dataState: 'idle' };

// @todo interface typings

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

  @computed
  get saleAddress(): ?string {
    if (this.sale) {
      return this.sale.address;
    }

    return null;
  }

  @computed
  get saleId(): ?string {
    if (this.sale) {
      return this.sale.data.id;
    }

    return null;
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
