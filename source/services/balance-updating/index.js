// @flow
import { autorun } from 'mobx';
import { walletBalanceService } from '~/domains/business/wallet-balance';
import { config } from '~/domains/app/config';

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
      clearInterval(balanceUpdateIntervalId);

      if (kyc.isAllowed) {
        walletBalanceService.loadBalance({ apiClient });
        balanceUpdateIntervalId = setInterval(() => {
          walletBalanceService.loadBalance({ apiClient });
        }, config.defaultPollingInterval);
      }
    });

    autorun(() => {
      if (!auth.isAuthenticated) {
        clearInterval(balanceUpdateIntervalId);
        walletBalance.reset();
      }
    });
  },
};
