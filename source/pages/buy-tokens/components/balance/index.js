// @flow
import { inject } from 'mobx-react';
import { Balance as BalanceView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const Balance = inject(
  ({ token }: RootStore): Props => {
    return {
      tokenSymbol: token.symbol,
    };
  },
)(BalanceView);
