// @flow
import { inject, observer } from 'mobx-react';
import BalanceView from './view';

import type { SaleStore } from '~/domains/business/sale/store';
import type { WalletBalanceStore } from '~/domains/business/wallet-balance/store';
import type { Props } from './view';

export const Balance = inject(
  ({
    walletBalance,
    sale,
  }: {
    walletBalance: WalletBalanceStore,
    sale: SaleStore,
  }): Props => ({
    balance: walletBalance.state.balance,
    tokenSymbol: sale.state.tokenSymbol,
  }),
)(observer(BalanceView));
