// @flow
import { observer, inject } from 'mobx-react';
import UserWalletAddressFormView from './view';

import type { KycStore } from '~/stores/kyc';
import type { Props } from './view';

const ObservingUserWalletAddressFormView = observer(UserWalletAddressFormView);

export default inject(({ kyc }: { kyc: KycStore }): Props => ({
  initialAddress: kyc.state.userWalletAddress,
  onSubmit: kyc.saveUserWalletAddress,
}))(ObservingUserWalletAddressFormView);
