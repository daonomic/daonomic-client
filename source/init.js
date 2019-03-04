// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import startup from '@slonoed/startup';
import Root from '~/root';
import { config } from '~/domains/app/config';
import { routerProvider } from '~/domains/app/router';
import { authTokenProvider } from '~/domains/business/auth/store/token';
import { apiProvider } from '~/domains/app/api';
import { authProvider } from '~/domains/business/auth/store';
import { paymentProvider } from '~/domains/business/payment';
import { saleProvider } from '~/domains/business/sale';
import { walletBalanceProvider } from '~/domains/business/wallet-balance';
import { walletGeneratorProvider } from '~/domains/business/wallet-generator';
import { immediatePurchaseProvider } from '~/domains/business/immediate-purchase';
import { balanceUpdatingService } from '~/services/balance-updating';
import { userData } from '~/modules/user-data/store';
import { kyc } from '~/modules/kyc/store';
import { initKyc } from '~/modules/kyc/services';
import { initUserData } from '~/modules/user-data/services';
import {
  referralProgramStore,
  referralProgramService,
} from '~/domains/business/referral-program';

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
    [immediatePurchaseProvider, apiProvider],
    [balanceUpdatingService, authProvider, kyc, walletBalanceProvider],
    [initKyc, authProvider],
    [initUserData, authProvider],
    [
      referralProgramService.init.bind(referralProgramService),
      authProvider,
      kyc,
      saleProvider,
    ],
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
      referralProgramStore,
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
