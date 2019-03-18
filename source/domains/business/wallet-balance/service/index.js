// @flow
import { init } from './init';
import { loadBalance } from './load-balance';
import { observeBalance } from './observe-balance';
import { makeWithdraw } from './make-withdraw';

export const walletBalanceService = {
  init,
  loadBalance,
  observeBalance,
  makeWithdraw,
};
