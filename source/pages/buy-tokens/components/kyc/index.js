// @flow
import { observer, inject } from 'mobx-react';
import KycView from './view';

import type { KycStore } from '~/stores/kyc';
import type { Props } from './view';

const ObservingKycView = observer(KycView);

export default inject(({ kyc }: { kyc: KycStore }): Props => ({
  isKycExtended: kyc.isExtended,
  isAllowed: kyc.isAllowed,
  isDenied: kyc.isDenied,
  isOnReview: kyc.isOnReview,
  denialReason: kyc.state.denialReason,
  userWalletAddress: kyc.state.userWalletAddress,
}))(ObservingKycView);
