// @flow
import { observer, inject } from 'mobx-react';
import { kycService } from '~/domains/business/kyc';
import { KycView } from './view';

import type { KycStore } from '~/domains/business/kyc/store';
import type { UserDataStore } from '~/domains/business/user-data/store';
import type { Props } from './view';

export const Kyc = inject(
  ({ kyc, userData }: { kyc: KycStore, userData: UserDataStore }): Props => ({
    kycState: kyc.state,
    userWalletAddress: userData.model.address,
    onSubmitUserData: () => kycService.loadKycState(),
  }),
)(observer(KycView));
