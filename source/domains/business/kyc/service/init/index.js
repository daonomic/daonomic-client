// @flow
import { autorun } from 'mobx';
import { kyc } from '~/domains/business/kyc';

import type { IAuth } from '~/domains/business/auth/types';

export function init(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      kyc.reset();
    }
  });
}
