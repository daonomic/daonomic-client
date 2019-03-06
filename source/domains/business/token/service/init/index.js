// @flow
import { reaction } from 'mobx';
import { tokenStore } from '~/domains/business/token';
import { loadData } from '../load-data';

import type { IAuth } from '~/domains/business/auth/types';

export function init(auth: IAuth) {
  function handleAuthChange() {
    if (auth.isAuthenticated) {
      loadData();
    } else {
      tokenStore.reset();
    }
  }

  reaction(() => auth.isAuthenticated, handleAuthChange);
  handleAuthChange();
}
