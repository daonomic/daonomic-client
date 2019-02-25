// @flow
import * as React from 'react';
import AppLayout from '~/components/app-layout';
import SignIn from '~/pages/sign-in';
import SignUp from '~/pages/sign-up';
import ResetPassword from '~/pages/reset-password';
import CreateNewPassword from '~/pages/create-new-password';
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
        return <SignIn />;
      }

      case 'signUp': {
        return <SignUp />;
      }

      case 'resetPassword': {
        return <ResetPassword />;
      }

      case 'createNewPassword': {
        return <CreateNewPassword token={currentRoute.params.token} />;
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
