// @flow
import { observer, inject } from 'mobx-react';
import { loadAndSetKycState } from '~/modules/kyc/actions';
import KycView from './view';

import type { KycStore } from '~/modules/kyc/store';
import type { UserDataStore } from '~/modules/user-data/store';
import type { Props } from './view';

export default inject(
  ({ kyc, userData }: { kyc: KycStore, userData: UserDataStore }): Props => ({
    kycState: kyc.state,
    userWalletAddress: userData.model.address,
    onSubmitUserData: () => {
      loadAndSetKycState();
    },
  }),
)(observer(KycView));
