// @flow
import * as DataStateTypes from '~/domains/data/data-state/types';

export type UnlockEvent = {|
  date: number,
  amount: number,
|};

export type LockBalance = {|
  total: number,
  released: number,
  vested: number,
|};

export type Lock = {|
  address: string,
  balance: LockBalance,
  unlockEvents: UnlockEvent[],
|};

export type State = {|
  dataState: DataStateTypes.DataState,
  balance: number,
  totalReceived: number,
  locks: Lock[],
|};
