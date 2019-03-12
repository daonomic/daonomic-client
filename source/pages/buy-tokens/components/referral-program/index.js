// @flow
import { inject, observer } from 'mobx-react';
import { ReferralProgram as ReferralProgramView } from './view';

import type { RootStore } from '~/domains/app/stores';
import type { Props } from './view';

export const ReferralProgram = inject(
  ({ referralProgramStore }: RootStore): Props => ({
    isReferralAvailable: referralProgramStore.isAvailable,
    userData: referralProgramStore.userData,
  }),
)(observer(ReferralProgramView));
