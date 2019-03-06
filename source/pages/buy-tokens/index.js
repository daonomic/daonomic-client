// @flow
import { inject, observer } from 'mobx-react';
import { kycService } from '~/domains/business/kyc';
import { userDataService } from '~/domains/business/user-data';
import { BuyTokensPageView } from './view';

import { TokenStore } from '~/domains/business/token/store';
import type { UserDataStore } from '~/domains/business/user-data/store';
import type { KycStore } from '~/domains/business/kyc/store';
import type { Props } from './view';

export const BuyTokensPage = inject(
  ({
    token,
    kyc,
    userData,
  }: {
    token: TokenStore,
    kyc: KycStore,
    userData: UserDataStore,
  }): Props => ({
    token,
    isLoaded: [kyc.state.dataState, userData.model.dataState].every(
      (dataState) => dataState === 'loaded',
    ),
    isAllowedToPay: kyc.isAllowed,
    onMount: () => {
      userDataService.loadUserData();
      kycService.loadKycState();
    },
  }),
)(observer(BuyTokensPageView));
