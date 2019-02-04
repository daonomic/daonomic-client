// @flow
import { autorun } from 'mobx';

import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { WalletBalanceStore } from '~/stores/wallet/balance';

export function balanceUpdatingService(
  auth: IAuth,
  kyc: KycStore,
  walletBalance: WalletBalanceStore,
) {
  let balanceUpdateIntervalId = null;

  autorun(() => {
    if (balanceUpdateIntervalId) {
      clearInterval(balanceUpdateIntervalId);
    }

    if (kyc.isAllowed) {
      walletBalance.loadBalance();
      balanceUpdateIntervalId = setInterval(() => {
        walletBalance.loadBalance();
      }, 3000);
    }
  });

  autorun(() => {
    if (!auth.isAuthenticated) {
      walletBalance.state.reset();
    }
  });
}
