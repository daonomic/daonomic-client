// @flow
import React from 'react';
import ReactDOM from 'react-dom';
import startup from '@slonoed/startup';
import Root from '~/root';
import { sale } from '~/config';
import { routerProvider } from '~/router/store';
import { authTokenProvider } from '~/stores/auth/token';
import { apiProvider } from '~/api';
import { authProvider } from '~/stores/auth';
import { kycProvider } from '~/stores/kyc';
import { paymentProvider } from '~/stores/payment';
import { saleProvider } from '~/stores/sale';
import { walletBalanceProvider } from '~/stores/wallet/balance';
import { walletGeneratorProvider } from '~/stores/wallet-generator';
import { balanceUpdatingService } from '~/services/balance-updating';
import { initLocationObserver } from '~/router/location-observer';

export function init() {
  return startup(
    [routerProvider],
    [authTokenProvider],
    [apiProvider, authTokenProvider],
    [authProvider, apiProvider, authTokenProvider],
    [kycProvider, apiProvider, authProvider],
    [paymentProvider, apiProvider, authProvider, sale, kycProvider],
    [saleProvider, apiProvider, authProvider, sale],
    [walletBalanceProvider, apiProvider],
    [walletGeneratorProvider],
    [balanceUpdatingService, authProvider, kycProvider, walletBalanceProvider],
    [initLocationObserver, routerProvider, authProvider],
  ).then((system) => {
    const stores = {
      router: system(routerProvider),
      auth: system(authProvider),
      sale: system(saleProvider),
      payment: system(paymentProvider),
      kyc: system(kycProvider),
      walletBalance: system(walletBalanceProvider),
      walletGenerator: system(walletGeneratorProvider),
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
