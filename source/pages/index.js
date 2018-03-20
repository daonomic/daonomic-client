import SignIn from '~/pages/sign-in';
import SignUp from '~/pages/sign-up';
import ResetPassword from '~/pages/reset-password';
import CreateNewPassword from '~/pages/create-new-password';
import BuyTokens from '~/pages/buy-tokens';
import CreateWallet from '~/pages/create-wallet';
import Faq from '~/pages/faq';
import AppLayout from '~/components/app-layout';
import {
  getSignInPagePath,
  getSignUpPagePath,
  getPasswordResetPagePath,
  getNewPasswordCreationPagePath,
  getAppPath,
  getBuyTokensPagePath,
  getWalletCreationPagePath,
  getFaqPagePath,
} from './paths';

export default {
  signin: {
    getPath: getSignInPagePath,
    component: SignIn,
  },

  signup: {
    getPath: getSignUpPagePath,
    component: SignUp,
  },

  sendResetInstructions: {
    getPath: getPasswordResetPagePath,
    component: ResetPassword,
  },

  createNewPassword: {
    getPath: getNewPasswordCreationPagePath,
    component: CreateNewPassword,
  },

  app: {
    getPath: getAppPath,
    component: AppLayout,

    buyTokens: {
      getPath: getBuyTokensPagePath,
      title: 'Buy Tokens',
      component: BuyTokens,
    },

    createWallet: {
      getPath: getWalletCreationPagePath,
      title: 'Create Wallet',
      component: CreateWallet,
    },

    faq: {
      getPath: getFaqPagePath,
      title: 'For Investors',
      component: Faq,
    },
  },
};
