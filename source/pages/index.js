import SignIn from '~/pages/sign-in';
import SignUp from '~/pages/sign-up';
import ResetPassword from '~/pages/reset-password';
import CreateNewPassword from '~/pages/create-new-password';
import BuyTokens from '~/pages/buy-tokens';
import CreateWallet from '~/pages/create-wallet';
import Faq from '~/pages/faq';
import AppLayout from '~/components/app-layout';

const appPrefix = '/app';

export default {
  signin: {
    getPath: () => '/sign/in',
    component: SignIn,
  },

  signup: {
    getPath: () => '/sign/up',
    component: SignUp,
  },

  sendResetInstructions: {
    getPath: () => '/sign/reset-password',
    component: ResetPassword,
  },

  createNewPassword: {
    getPath: (token) => `/sign/create-new-password/${token}`,
    component: CreateNewPassword,
  },

  app: {
    getPath: () => appPrefix,
    component: AppLayout,

    buyTokens: {
      getPath: () => `${appPrefix}/buy`,
      title: 'Buy Tokens',
      component: BuyTokens,
    },

    createWallet: {
      getPath: () => `${appPrefix}/create-wallet`,
      title: 'Create Wallet',
      component: CreateWallet,
    },

    faq: {
      getPath: () => `${appPrefix}/faq`,
      title: 'For Investors',
      component: Faq,
    },
  },
};
