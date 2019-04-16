// @flow
import { observer, inject } from 'mobx-react';
import { compose } from 'ramda';
import { PaymentInstruction as PaymentInstructionView } from './view';

import type { UserDataStore } from '~/domains/business/user-data/store';
import type { Props } from './view';

const enhance = compose(
  inject(
    ({ userData }: { userData: UserDataStore }): Props => ({
      userWalletAddress: userData.model.address,
    }),
  ),
  observer,
);

export const PaymentInstruction = enhance(PaymentInstructionView);
