// @flow

export type TokenExchangeState = {|
  amount: number,
  cost: number,
  isHydrating: boolean,
  hasError: boolean,
|};

export interface ITokenExchangeCalculations {
  state: TokenExchangeState;
  handleState: (
    nextState: (state: TokenExchangeState) => TokenExchangeState,
  ) => void;
}
