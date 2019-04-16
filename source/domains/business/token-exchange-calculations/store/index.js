// @flow

import { observable, action } from 'mobx';
import { ITokenExchangeCalculations } from './types';

export class TokenExchangeCalculations implements ITokenExchangeCalculations {
  @observable
  state = {
    cost: 0,
    amount: 0,
    isHydrating: false,
    hasError: false,
  };

  @action
  handleState = (nextState) => {
    this.state = {
      ...this.state,
      ...nextState(this.state),
    };
  };
}

export const tokenExchangeCalculations = new TokenExchangeCalculations();
