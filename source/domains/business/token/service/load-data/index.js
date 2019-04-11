// @flow
import { when } from 'mobx';
import { apiClient } from '~/domains/app/api-client';
import { tokenStore } from '~/domains/business/token';
import { createSaleStore } from '~/domains/business/sale';

export async function loadData(): Promise<void> {
  if (tokenStore.state.dataState === 'loading') {
    return when(
      () =>
        tokenStore.state.dataState === 'loaded' ||
        tokenStore.state.dataState === 'failed',
    );
  }

  tokenStore.setState({ dataState: 'loading' });

  try {
    const { token, sale, contracts } = await apiClient
      .get('/config')
      .then((response) => response.data);

    if (sale) {
      tokenStore.setSale(createSaleStore(sale));
    }

    tokenStore.setContracts(contracts);
    tokenStore.setState({ dataState: 'loaded', data: token });
  } catch (error) {
    tokenStore.setState({ dataState: 'failed' });
  }
}
