// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import startup from '@slonoed/startup';
import Root from '~/root';
import config from '~/config';
import { routerProvider } from '~/router';
import { authTokenProvider } from '~/stores/auth/token';
import { apiProvider } from '~/api';
import { authProvider } from '~/stores/auth';
import { paymentProvider } from '~/stores/payment';
import { saleProvider } from '~/stores/sale';
import { walletBalanceProvider } from '~/stores/wallet/balance';
import { walletGeneratorProvider } from '~/stores/wallet-generator';
import { immediatePurchaseProvider } from '~/stores/immediate-purchase';
import { balanceUpdatingService } from '~/services/balance-updating';
import { getWeb3Instance } from '~/services/web3/provider';
import { userData } from '~/modules/user-data/store';
import { kyc } from '~/modules/kyc/store';
import { initKyc } from '~/modules/kyc/services';
import { initUserData } from '~/modules/user-data/services';
import { referralProgramService } from '~/modules/referral-program/service';
import { initReferralProgramTokenService } from '~/services/referral-program-token';

export function init() {
  return startup(
    [authTokenProvider],
    [apiProvider],
    [walletGeneratorProvider],
    [authProvider, apiProvider, authTokenProvider],
    [routerProvider, authProvider],
    [paymentProvider, apiProvider, authProvider, config.saleId, kyc],
    [saleProvider, apiProvider, authProvider, config.saleId],
    [walletBalanceProvider, apiProvider],
    [immediatePurchaseProvider, apiProvider, getWeb3Instance],
    [balanceUpdatingService, authProvider, kyc, walletBalanceProvider],
    [initKyc, authProvider],
    [initUserData, authProvider],
    [initReferralProgramTokenService, authProvider, referralProgramService],
  ).then((system) => {
    const stores = {
      router: system(routerProvider),
      auth: system(authProvider),
      sale: system(saleProvider),
      payment: system(paymentProvider),
      walletBalance: system(walletBalanceProvider),
      walletGenerator: system(walletGeneratorProvider),
      immediatePurchase: system(immediatePurchaseProvider),
      userData,
      kyc,
      referralProgramService,
    };

    if (process.env.NODE_ENV === 'development') {
      window.stores = stores;
    }

    const renderTarget = document.getElementById('app');

    if (renderTarget) {
      ReactDOM.render(<Root stores={stores} />, renderTarget);
    }

    return system;
  });
}
