// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

type UnlockEvent = {|
  date: number,
  amount: number,
|};

export type Lock = {|
  address: string,
  balance: {|
    total: number,
    released: number,
    vested: number,
  |},
  nextUnlockEvent?: UnlockEvent,
|};

export type State = {|
  dataState: DataStateTypes.DataState,
  balance: number,
  locks: Lock[],
|};
