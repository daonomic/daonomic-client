// @flow
import { config } from '~/domains/app/config';
import { transactionsApi } from '~/domains/business/transactions/api';
import { transactionsStore } from '~/domains/business/transactions/store';

let timerId = null;
let isUnsubscribed = false;

export function observeTransactions() {
  isUnsubscribed = false;

  const unsubscribe = () => {
    clearTimeout(timerId);
    isUnsubscribed = true;
    timerId = null;
  };

  if (timerId) {
    return unsubscribe;
  }

  const load = async () => {
    try {
      const data = await transactionsApi.loadTransactions();

      transactionsStore.setState({
        dataState: 'loaded',
        data,
      });
    } catch (error) {
      // ...
    }

    if (!isUnsubscribed) {
      timerId = setTimeout(load, config.defaultPollingInterval);
    }
  };

  timerId = setTimeout(load, config.defaultPollingInterval);
  return unsubscribe;
}
