// @flow
import { transactionsApi } from '~/domains/business/transactions/api';
import { transactionsStore } from '~/domains/business/transactions/store';

export async function loadTransactions() {
  transactionsStore.setState({ dataState: 'loading' });

  try {
    const data = await transactionsApi.loadTransactions();

    transactionsStore.setState({
      dataState: 'loaded',
      data,
    });
  } catch (error) {
    transactionsStore.setState({ dataState: 'failed' });
  }
}
