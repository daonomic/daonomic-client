// @flow
import authInstance from './auth';
import walletBalanceInstance from './wallet/balance';
import kycInstance from './kyc';
import paymentInstance from './payment';
import saleInstance from './sale';
import walletGeneratorInstance from './wallet-generator';

type RootStoreOptions = {|
  auth: typeof authInstance,
  walletBalance: typeof walletBalanceInstance,
  kyc: typeof kycInstance,
  payment: typeof paymentInstance,
  sale: typeof saleInstance,
  walletGenerator: typeof walletGeneratorInstance,
|};

class RootStore {
  auth: typeof authInstance;
  walletBalance: typeof walletBalanceInstance;
  kyc: typeof kycInstance;
  payment: typeof paymentInstance;
  sale: typeof saleInstance;
  walletGenerator: typeof walletGeneratorInstance;

  constructor(options: RootStoreOptions) {
    this.auth = options.auth;
    this.walletBalance = options.walletBalance;
    this.kyc = options.kyc;
    this.payment = options.payment;
    this.sale = options.sale;
    this.walletGenerator = options.walletGenerator;
  }
}

const rootStore = new RootStore({
  auth: authInstance,
  walletBalance: walletBalanceInstance,
  kyc: kycInstance,
  payment: paymentInstance,
  sale: saleInstance,
  walletGenerator: walletGeneratorInstance,
});

if (process.env.NODE_ENV === 'development') {
  window.rootStore = rootStore;
}

export default rootStore;
