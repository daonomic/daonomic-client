// @flow
import { autorun } from 'mobx';
import { kyc } from '~/modules/kyc/store';

import type { IAuth } from '~/domains/business/auth/types';

export function initKyc(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      kyc.reset();
    }
  });
}
