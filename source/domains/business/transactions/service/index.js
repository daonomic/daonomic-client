// @flow
import { init } from './init';
import { loadTransactions } from './load-transactions';
import { observeTransactions } from './observe-transactions';
import { send } from './send';
import { wait } from './wait';

export const transactionsService = {
  init,
  loadTransactions,
  observeTransactions,
  send,
  wait,
};
