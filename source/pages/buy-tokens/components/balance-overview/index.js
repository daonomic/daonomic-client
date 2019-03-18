// @flow

import { inject } from 'mobx-react';
import { BalanceOverview as BalanceOverviewView } from './view';
import { walletBalanceService } from '~/domains/business/wallet-balance';

import type { Props } from './view';
import type { RootStore } from '~/domains/app/stores';

export const BalanceOverview = inject(
  ({ token, walletBalance }: RootStore): Props => {
    return {
      tokenSymbol: token.symbol,
      onWithdraw: () => {
        const isSure = confirm('Are you sure?');

        if (!isSure) return;

        return walletBalanceService.makeWithdraw({
          locks: walletBalance.withdrawableLocks,
        });
      },
    };
  },
)(BalanceOverviewView);
