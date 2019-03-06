// @flow
import { autorun } from 'mobx';
import { referralProgramStore } from '~/domains/business/referral-program/store';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import type { IAuth } from '~/domains/business/auth/types';
import type { KycStore } from '~/domains/business/kyc/store';
import type { TokenStore } from '~/domains/business/token/store';

export function init(auth: IAuth, kyc: KycStore, token: TokenStore) {
  autorun(() => {
    if (
      auth.isAuthenticated &&
      token.state.dataState === 'loaded' &&
      token.sale &&
      (token.sale.data.features || []).includes('REFERRAL')
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
