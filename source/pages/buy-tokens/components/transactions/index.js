// @flow
import * as React from 'react';
import { inject } from 'mobx-react';
import { Transactions as TransactionsView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const Transactions: React.ComponentType<{||}> = inject(
  ({ transactionsStore }: RootStore): Props => ({
    transactionsState: transactionsStore.state.dataState,
    transactions:
      transactionsStore.state.dataState === 'loaded'
        ? transactionsStore.state.data
        : [],
  }),
)(TransactionsView);
