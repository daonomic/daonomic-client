// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

export interface IWalletBalanceState {
  balanceState: DataStateTypes.DataState;
  balance: number;
}
