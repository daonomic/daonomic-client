// @flow
import { inject, observer } from 'mobx-react';
import BalanceView from './view';

import type { SaleStore } from '~/stores/sale';
import type { WalletBalanceStore } from '~/stores/wallet/balance';
import type { Props } from './view';

const ObservingBalanceView = observer(BalanceView);

export default inject(
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
)(ObservingBalanceView);
