// @flow
import { reaction } from 'mobx';
import { auth } from '~/domains/business/auth';
import { walletBalance } from '~/domains/business/wallet-balance';

export function init() {
  reaction(
    () => auth.isAuthenticated,
    () => {
      if (!auth.isAuthenticated) {
        walletBalance.reset();
      }
    },
  );
}
