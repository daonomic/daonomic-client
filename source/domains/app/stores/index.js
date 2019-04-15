// @flow
import { router } from '~/domains/app/router';
import { auth } from '~/domains/business/auth';
import { tokenStore } from '~/domains/business/token';
import { walletBalance } from '~/domains/business/wallet-balance';
import { walletGenerator } from '~/domains/business/wallet-generator';
import { immediatePurchase } from '~/domains/business/immediate-purchase';
import { userData } from '~/domains/business/user-data';
import { kyc } from '~/domains/business/kyc';
import { tokenPurchase } from '~/domains/business/token-purchase';
import { tokenExchangeCalculations } from '~/domains/business/token-exchange-calculations';
import { referralProgramStore } from '~/domains/business/referral-program';
import { transactionsStore } from '~/domains/business/transactions';

export const stores = {
  walletBalance,
  walletGenerator,
  router,
  auth,
  immediatePurchase,
  token: tokenStore,
  tokenExchangeCalculations,
  userData,
  tokenPurchase,
  kyc,
  referralProgramStore,
  transactionsStore,
};

if (process.env.NODE_ENV === 'development') {
  window.stores = stores;
}

export type RootStore = typeof stores;
