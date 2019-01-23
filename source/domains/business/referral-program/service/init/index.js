// @flow
import { autorun } from 'mobx';
import { referralProgramStore } from '~/domains/business/referral-program/store';
import { referralProgramApi } from '~/domains/business/referral-program/api';

import type { IAuth } from '~/stores/auth/types';

export function init(auth: IAuth) {
  autorun(async () => {
    if (auth.isAuthenticated) {
      referralProgramStore.setUserToken({ dataState: 'loading' });

      try {
        const token = await referralProgramApi.loadUserToken();

        referralProgramStore.setUserToken({ dataState: 'loaded', data: token });
      } catch (error) {
        referralProgramStore.setUserToken({ dataState: 'failed' });
      }
    } else {
      referralProgramStore.reset();
    }
  });
}
