// @flow
import { autorun } from 'mobx';
import { referralProgramStore } from '~/domains/business/referral-program/store';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import type { IAuth } from '~/stores/auth/types';

export function init(auth: IAuth) {
  autorun(async () => {
    if (auth.isAuthenticated) {
      referralProgramStore.setUserData({ dataState: 'loading' });

      try {
        const data = await referralProgramApi.loadUserData();

        referralProgramStore.setUserData({ dataState: 'loaded', data });
      } catch (error) {
        referralProgramStore.setUserData({ dataState: 'failed' });
      }
    } else {
      referralProgramStore.reset();
    }
  });
}
