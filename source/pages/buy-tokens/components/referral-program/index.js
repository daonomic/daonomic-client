// @flow
import { inject, observer } from 'mobx-react';
import { ReferralProgram as ReferralProgramView } from './view';

import type { ReferralProgramStore } from '~/domains/business/referral-program/store';
import type { Props } from './view';

export const ReferralProgram = inject(
  ({
    referralProgramStore,
  }: {|
    referralProgramStore: ReferralProgramStore,
  |}): Props => ({
    isReferralAvailable: referralProgramStore.isAvailable,
    userData: referralProgramStore.userData,
  }),
)(observer(ReferralProgramView));
