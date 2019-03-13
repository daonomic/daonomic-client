// @flow
import * as React from 'react';
import { inject } from 'mobx-react';
import { LocksBalance as LocksBalanceView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const LocksBalance: React.ComponentType<{||}> = inject(
  ({ walletBalance }: RootStore): Props => ({
    locksDataState: walletBalance.state.dataState,
    locksData:
      walletBalance.state.dataState === 'loaded'
        ? walletBalance.state.locks
        : [],
  }),
)(LocksBalanceView);
