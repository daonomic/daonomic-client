// @flow
import { autorun } from 'mobx';
import { referralProgramStore } from '~/domains/business/referral-program/store';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { SaleStore } from '~/stores/sale';

export function init(auth: IAuth, kyc: KycStore, sale: SaleStore) {
  autorun(() => {
    if (
      auth.isAuthenticated &&
      sale.state.dataState === 'loaded' &&
      sale.state.features.includes('REFERRAL')
    ) {
      referralProgramStore.setSupport({ isSupported: true });
    }
  });

  autorun(() => {
    if (!auth.isAuthenticated) {
      referralProgramStore.reset();
    }
  });

  autorun(async () => {
    if (
      auth.isAuthenticated &&
      referralProgramStore.isSupportedBySale &&
      kyc.isAllowed
    ) {
      referralProgramStore.setAvailability({ isAvailable: true });
      referralProgramStore.setUserData({ dataState: 'loading' });

      try {
        const data = await referralProgramApi.loadUserData();

        referralProgramStore.setUserData({ dataState: 'loaded', data });
      } catch (error) {
        referralProgramStore.setUserData({ dataState: 'failed' });
      }
    }
  });
}
