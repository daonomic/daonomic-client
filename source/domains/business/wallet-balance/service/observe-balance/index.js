// @flow
import { walletBalance } from '~/domains/business/wallet-balance';
import { walletBalanceApi } from '~/domains/business/wallet-balance/api';
import { createAsyncObserver } from '~/utils/create-async-observer';

export const observeBalance = createAsyncObserver(async () => {
  try {
    const {
      balance,
      totalReceived,
      locks = [],
    } = await walletBalanceApi.loadBalance();

    walletBalance.setState({
      dataState: 'loaded',
      balance,
      locks,
      totalReceived,
    });
  } catch (error) {
    console.error(error);
  }
});
