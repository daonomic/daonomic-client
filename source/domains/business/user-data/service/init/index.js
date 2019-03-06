// @flow
import { autorun } from 'mobx';
import { userData } from '~/domains/business/user-data';

import type { IAuth } from '~/domains/business/auth/types';

export function init(auth: IAuth) {
  autorun(() => {
    if (!auth.isAuthenticated) {
      userData.reset();
    }
  });
}
