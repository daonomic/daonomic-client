// @flow
import * as React from 'react';
import { AppLayout } from '~/components/app-layout';
import { SignInPage } from '~/pages/sign-in';
import { SignUpPage } from '~/pages/sign-up';
import { ResetPasswordPage } from '~/pages/reset-password';
import { CreateNewPasswordPage } from '~/pages/create-new-password';
import { BuyTokensPage } from '~/pages/buy-tokens';
import { CreateWalletPage } from '~/pages/create-wallet';
import { ReferralPage } from '~/pages/referral';
import { FaqPage } from '~/pages/faq';

import type { Route } from '~/domains/app/router/types';

export type Props = {|
  currentRoute: ?Route,
|};

export class CurrentPage extends React.Component<Props> {
  render() {
    const { currentRoute } = this.props;

    if (!currentRoute) {
      return null;
    }

    const currentPageName = currentRoute.name;
    let appLayoutContent = null;

    switch (currentPageName) {
      case 'signIn': {
        return <SignInPage />;
      }

      case 'signUp': {
        return <SignUpPage />;
      }

      case 'resetPassword': {
        return <ResetPasswordPage />;
      }

      case 'createNewPassword': {
        return <CreateNewPasswordPage token={currentRoute.params.token} />;
      }

      case 'app': {
        break;
      }

      case 'buyTokens': {
        appLayoutContent = <BuyTokensPage />;
        break;
      }

      case 'createWallet': {
        appLayoutContent = <CreateWalletPage />;
        break;
      }

      case 'referral': {
        appLayoutContent = <ReferralPage />;
        break;
      }

      case 'faq': {
        appLayoutContent = <FaqPage />;
        break;
      }

      default: {
        (currentPageName: empty);
      }
    }

    return <AppLayout>{appLayoutContent}</AppLayout>;
  }
}
