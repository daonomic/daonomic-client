// @flow
import { autorun } from 'mobx';
import { userData } from '~/modules/user-data/store';

import type { IAuth } from '~/domains/business/auth/types';

export function initUserData(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      userData.reset();
    }
  });
}
