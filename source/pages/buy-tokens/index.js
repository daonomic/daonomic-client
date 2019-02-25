// @flow
import { inject, observer } from 'mobx-react';
import { BuyTokensPageView } from './view';
import { loadAndSetKycState } from '~/modules/kyc/actions';
import { loadAndSetUserData } from '~/modules/user-data/actions';

import type { SaleStore } from '~/stores/sale';
import type { UserDataStore } from '~/modules/user-data/store';
import type { KycStore } from '~/modules/kyc/store';
import type { Props } from './view';

export const BuyTokensPage = inject(
  ({
    sale,
    kyc,
    userData,
  }: {
    sale: SaleStore,
    kyc: KycStore,
    userData: UserDataStore,
  }): Props => ({
    sale: {
      isStarted: sale.isStarted,
      isFinished: sale.isFinished,
      startTimestamp: sale.state.startTimestamp,
      endTimestamp: sale.state.endTimestamp,
    },
    isLoaded: [
      sale.state.dataState,
      kyc.state.dataState,
      userData.model.dataState,
    ].every((dataState) => dataState === 'loaded'),
    isAllowedToPay: kyc.isAllowed,
    onMount: () => {
      loadAndSetUserData();
      loadAndSetKycState();
    },
  }),
)(observer(BuyTokensPageView));
