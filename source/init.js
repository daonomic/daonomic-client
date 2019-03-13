// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import { auth } from '~/domains/business/auth';
import { tokenStore, tokenService } from '~/domains/business/token';
import { userDataService } from '~/domains/business/user-data';
import { kyc, kycService } from '~/domains/business/kyc';
import { referralProgramService } from '~/domains/business/referral-program';
import { walletBalanceService } from '~/domains/business/wallet-balance';
import { Root } from '~/root';
import { stores } from '~/domains/app/stores';
import { actualizeRealmId } from '~/domains/app/config';

export function init() {
  actualizeRealmId();
  kycService.init(auth);
  userDataService.init(auth);
  referralProgramService.init(auth, kyc, tokenStore);
  tokenService.init(auth);
  walletBalanceService.init();

  const renderTarget = document.getElementById('app');

  if (renderTarget) {
    ReactDOM.render(<Root stores={stores} />, renderTarget);
  }
}
