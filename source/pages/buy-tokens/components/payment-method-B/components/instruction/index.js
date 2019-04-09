// @flow
import { observer, inject } from 'mobx-react';
import { PaymentInstruction as PaymentInstructionView } from './view';

import type { UserDataStore } from '~/domains/business/user-data/store';
import type { Props } from './view';

export const PaymentInstruction = inject(
  ({ userData }: { userData: UserDataStore }): Props => ({
    userWalletAddress: userData.model.address,
  }),
)(observer(PaymentInstructionView));
