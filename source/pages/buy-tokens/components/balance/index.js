// @flow
import { inject, observer } from 'mobx-react';
import { Balance as BalanceView } from './view';

import { TokenStore } from '~/domains/business/token/store';
import type { WalletBalanceStore } from '~/domains/business/wallet-balance/store';
import type { Props } from './view';

export const Balance = inject(
  ({
    walletBalance,
    token,
  }: {
    walletBalance: WalletBalanceStore,
    token: TokenStore,
  }): Props => ({
    balance: walletBalance.state.balance,
    tokenSymbol: token.symbol,
  }),
)(observer(BalanceView));
