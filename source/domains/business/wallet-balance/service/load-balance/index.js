// @flow
import { walletBalance } from '~/domains/business/wallet-balance';

import { type IApiClient } from '~/domains/app/api-client/types';

export async function loadBalance({ apiClient }: {| apiClient: IApiClient |}) {
  walletBalance.setState({
    balanceState: 'loading',
  });

  try {
    const { balance } = await apiClient
      .get('/balance')
      .then((response) => response.data);

    walletBalance.setState({
      balanceState: 'loaded',
      balance,
    });
  } catch (error) {
    walletBalance.setState({
      balanceState: 'failed',
    });
  }
}
