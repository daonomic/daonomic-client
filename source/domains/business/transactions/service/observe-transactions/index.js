// @flow
import { createAsyncObserver } from '~/utils/create-async-observer';
import { transactionsApi } from '~/domains/business/transactions/api';
import { transactionsStore } from '~/domains/business/transactions/store';

export const observeTransactions = createAsyncObserver(async () => {
  try {
    const data = await transactionsApi.loadTransactions();

    transactionsStore.setState({
      dataState: 'loaded',
      data,
    });
  } catch (error) {
    // eslint-disable-next-line
    console.error(error);
  }
});
