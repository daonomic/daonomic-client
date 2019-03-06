// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

export type State = {|
  balanceState: DataStateTypes.DataState,
  balance: number,
|};
