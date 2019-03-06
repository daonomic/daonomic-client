// @flow
import { autorun } from 'mobx';
import { walletBalanceService } from '~/domains/business/wallet-balance';

import type { IAuth } from '~/domains/business/auth/types';
import type { KycStore } from '~/domains/business/kyc/store';
import type { WalletBalanceStore } from '~/domains/business/wallet-balance/store';
import type { IApiClient } from '~/domains/app/api-client/types';

export const balanceUpdatingService = {
  init: (
    auth: IAuth,
    kyc: KycStore,
    walletBalance: WalletBalanceStore,
    apiClient: IApiClient,
  ) => {
    let balanceUpdateIntervalId = null;

    autorun(() => {
      if (balanceUpdateIntervalId) {
        clearInterval(balanceUpdateIntervalId);
      }

      if (kyc.isAllowed) {
        walletBalanceService.loadBalance({ apiClient });
        balanceUpdateIntervalId = setInterval(() => {
          walletBalanceService.loadBalance({ apiClient });
        }, 3000);
      }
    });

    autorun(() => {
      if (!auth.isAuthenticated) {
        walletBalance.reset();
      }
    });
  },
};
