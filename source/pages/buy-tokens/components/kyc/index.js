// @flow
import { observer, inject } from 'mobx-react';
import { loadAndSetKycState } from '~/modules/kyc/actions';
import KycView from './view';

import type { IAuth } from '~/stores/auth/types';
import type { KycStore } from '~/modules/kyc/store';
import type { UserDataStore } from '~/modules/user-data/store';
import type { Props } from './view';

export default inject(
  ({
    kyc,
    userData,
    auth,
  }: {
    kyc: KycStore,
    userData: UserDataStore,
    auth: IAuth,
  }): Props => ({
    kycState: kyc.model.state,
    userWalletAddress: userData.model.address,
    onSubmitUserData: () => {
      loadAndSetKycState({ userId: auth.id });
    },
  }),
)(observer(KycView));
