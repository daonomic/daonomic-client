// @flow
import { loadBalance } from './load-balance';
import { createWithdrawTransaction } from './create-withdraw-transaction';

export const walletBalanceApi = {
  loadBalance,
  createWithdrawTransaction,
};
