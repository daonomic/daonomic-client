// @flow
import { init } from './init';
import { loadTransactions } from './load-transactions';
import { observeTransactions } from './observe-transactions';

export const transactionsService = {
  init,
  loadTransactions,
  observeTransactions,
};
