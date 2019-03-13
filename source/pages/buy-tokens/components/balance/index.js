// @flow
import { inject } from 'mobx-react';
import { Balance as BalanceView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const Balance = inject(
  ({ walletBalance, token, kyc }: RootStore): Props => ({
    balanceDataState: walletBalance.state.dataState,
    balance: walletBalance.state.balance,
    isKycAllowed: kyc.isAllowed,
    tokenSymbol: token.symbol,
  }),
)(BalanceView);
