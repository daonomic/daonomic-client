// @flow
import type { DataState } from '~/types/common';

export interface ISaleStoreState {
  dataState: DataState;
  startTimestamp: ?number;
  endTimestamp: ?number;
  tokensCount: {
    sold: number,
    total: number,
    notLimited: boolean,
  };
}
