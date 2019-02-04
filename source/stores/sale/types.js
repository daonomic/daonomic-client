// @flow
import type { DataState } from '~/types/common';

export interface ISaleStoreState {
  dataState: DataState;
  tokenSymbol: string;
  startTimestamp: ?number;
  endTimestamp: ?number;
  tokensCount: {
    sold: number,
    total: number,
    notLimited: boolean,
  };
  address: string;
  payWithErc20: boolean;
  features: string[];
}
