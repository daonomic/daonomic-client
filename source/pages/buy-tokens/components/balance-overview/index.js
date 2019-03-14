// @flow

import { inject } from 'mobx-react';
import { BalanceOverview as BalanceOverviewView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const BalanceOverview = inject(
  ({ token }: RootStore): Props => {
    return {
      tokenSymbol: token.symbol,
    };
  },
)(BalanceOverviewView);
