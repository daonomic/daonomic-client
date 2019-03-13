// @flow
import { init } from './init';
import { loadBalance } from './load-balance';
import { observeBalance } from './observe-balance';

export const walletBalanceService = {
  init,
  loadBalance,
  observeBalance,
};
