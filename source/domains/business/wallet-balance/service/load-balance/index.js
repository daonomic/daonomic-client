// @flow
import { walletBalance } from '~/domains/business/wallet-balance';
import { walletBalanceApi } from '~/domains/business/wallet-balance/api';

export async function loadBalance() {
  walletBalance.setState({
    dataState: 'loading',
  });

  try {
    const { balance, locks = [] } = await walletBalanceApi.loadBalance();

    walletBalance.setState({
      dataState: 'loaded',
      balance,
      locks,
    });
  } catch (error) {
    walletBalance.setState({
      dataState: 'failed',
    });
  }
}
