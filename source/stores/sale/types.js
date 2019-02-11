// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

export interface ISaleStoreState {
  dataState: DataStateTypes.DataState;
  tokenSymbol: string;
  startTimestamp: ?number;
  endTimestamp: ?number;
  tokensCount: {
    sold: number,
    total: number,
    notLimited: boolean,
  };
  address: string;
  features: string[];
}
