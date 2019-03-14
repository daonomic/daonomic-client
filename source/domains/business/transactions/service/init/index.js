// @flow
import { reaction } from 'mobx';
import { transactionsStore } from '~/domains/business/transactions/store';
import { auth } from '~/domains/business/auth';

export function init() {
  reaction(
    () => auth.isAuthenticated,
    () => {
      if (!auth.isAuthenticated) {
        transactionsStore.reset();
      }
    },
  );
}
