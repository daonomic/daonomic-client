// @flow
import { autorun } from 'mobx';
import { kyc } from '~/modules/kyc/store';

import type { IAuth } from '~/stores/auth/types';

export function initKyc(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      kyc.reset();
    }
  });
}
