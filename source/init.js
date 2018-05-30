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
import { kycProvider } from '~/stores/kyc';
import { paymentProvider } from '~/stores/payment';
import { saleProvider } from '~/stores/sale';
import { walletBalanceProvider } from '~/stores/wallet/balance';
import { walletGeneratorProvider } from '~/stores/wallet-generator';
import { immediatePurchaseProvider } from '~/stores/immediate-purchase';
import { balanceUpdatingService } from '~/services/balance-updating';
import { getWeb3Instance } from '~/services/web3/provider';

export function init() {
  return startup(
    [authTokenProvider],
    [apiProvider],
    [walletGeneratorProvider],
    [authProvider, apiProvider, authTokenProvider],
    [routerProvider, authProvider],
    [kycProvider, apiProvider, authProvider, getWeb3Instance],
    [paymentProvider, apiProvider, authProvider, config.saleId, kycProvider],
    [saleProvider, apiProvider, authProvider, config.saleId],
    [walletBalanceProvider, apiProvider],
    [immediatePurchaseProvider, apiProvider, kycProvider, getWeb3Instance],
    [balanceUpdatingService, authProvider, kycProvider, walletBalanceProvider],
  ).then((system) => {
    const stores = {
      router: system(routerProvider),
      auth: system(authProvider),
      sale: system(saleProvider),
      payment: system(paymentProvider),
      kyc: system(kycProvider),
      walletBalance: system(walletBalanceProvider),
      walletGenerator: system(walletGeneratorProvider),
      immediatePurchase: system(immediatePurchaseProvider),
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
