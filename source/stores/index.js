import auth from './auth';
import walletBalance from './wallet/balance';
import kyc from './kyc';
import payment from './payment';
import sale from './sale';
import walletGenerator from './wallet-generator';

window.kyc = kyc;
export default {
  auth,
  walletBalance,
  kyc,
  payment,
  sale,
  walletGenerator,
};
